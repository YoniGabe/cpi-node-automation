import {
  PapiClient,
  InstalledAddon,
  AddonData,
} from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import fetch from "node-fetch";
import jwtDecode from "jwt-decode";
import ClientApi from "@pepperi-addons/client-api";

class MyService {
  papiClient: PapiClient;

  constructor(private client: Client) {
    this.papiClient = new PapiClient({
      baseURL: client.BaseURL,
      token: client.OAuthAccessToken,
      addonSecretKey: client.AddonSecretKey,
      addonUUID: client.AddonUUID,
    });
  }

  getAddons(): Promise<InstalledAddon[]> {
    return this.papiClient.addons.installedAddons.find({});
  }
  //NOT IN USE -- keep around in case something breaks
  async getWebAPIBaseURL_OLD() {
    let environment = jwtDecode(this.client.OAuthAccessToken)[
      "pepperi.datacenter"
    ];
    const webappAddon = await this.papiClient.addons.installedAddons
      .addonUUID("00000000-0000-0000-0000-0000003eba91")
      .get();
    environment = environment == "sandbox" ? "sandbox." : "";

    let baseURL = "";
    //if is not longer relevant since no one uses 16.55 anymore,will be removed during refactor
    if (webappAddon.Version?.indexOf("16.55") != -1) {
      const webappVersion = webappAddon.Version?.split(".");
      const versionMain = webappVersion ? webappVersion[0] : "";
      const versionMinor = webappVersion ? webappVersion[1] : "";
      const versionPatch = webappVersion ? webappVersion[2] : "";
      baseURL = `https://webapi.${environment}pepperi.com/V${versionMain}_${versionMinor}/WebApp_${versionPatch}`;
    } else {
      baseURL = `https://webapi.${environment}pepperi.com/${webappAddon.Version}/webapi`;
    }

    return baseURL;
  }
  //the below works according to https://pepperi.atlassian.net/browse/DI-18769
  // and https://apidesign.pepperi.com/not-in-use/webapi/get-region-webapi-baseurl
  async getWebAPIBaseURL() {
    let environment = jwtDecode(this.client.OAuthAccessToken)[
      "pepperi.datacenter"
    ];

    let apiRegion: string = await this.getAPIRegion();

    let URL = `https://${apiRegion}.pepperi.com/v1.0/webapi/base_url?Region='${environment}'`;
    const webAPIBaseURL = (
      await (
        await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.client.OAuthAccessToken}`,
            "Content-Type": "application/json",
          },
        })
      ).json()
    )["BaseURL"];

    return webAPIBaseURL;
  }

  async getAccessToken(webAPIBaseURL) {
    const URL = `${webAPIBaseURL}/Service1.svc/v1/CreateSession`;
    const Body = {
      accessToken: this.client.OAuthAccessToken,
      culture: "en-US",
    };
    let accessToken = (
      await (
        await fetch(URL, {
          method: "POST",
          body: JSON.stringify(Body),
          headers: { "Content-Type": "application/json" },
        })
      ).json()
    )["AccessToken"];

    while (accessToken == null) {
      accessToken = (
        await (
          await fetch(URL, {
            method: "POST",
            body: JSON.stringify(Body),
            headers: { "Content-Type": "application/json" },
          })
        ).json()
      )["AccessToken"];
    }

    return accessToken;
  }

  async getPepperiClientAPI(webAPIBaseURL: string, accessToken: string) {
    const pepperi = ClientApi(async (params) => {
      const url = `${webAPIBaseURL}/Service1.svc/v1/ClientApi/Execute`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ Request: JSON.stringify(params) }),
        headers: {
          "Content-Type": "application/json",
          PepperiSessionToken: accessToken,
        },
      });
      const result = await response.json();
      if (result.Success) {
        // maybe check also result.Value success
        const jsonResponse = JSON.parse(result.Value);
        if (!jsonResponse.success) {
          let error = jsonResponse.error.message.replace(
            "does not exist",
            "is not supported on open catalog"
          );
          throw new Error(error);
        }
        return jsonResponse;
      } else {
        throw new Error("Failed on client api");
      }
    });
    return pepperi;
  }

  async createTransaction(
    webAPIBaseURL: string,
    accessToken: string,
    pepperiClientAPI,
    atdID
  ) {
    const userUUID = jwtDecode(this.client.OAuthAccessToken)[
      "pepperi.useruuid"
    ];
    const account = await this.papiClient.get(
      "/accounts/ExternalID/" + userUUID
    );

    const accountURL = `${webAPIBaseURL}/Service1.svc/v1/Account/${account.UUID}`;
    const accountReload = await (
      await fetch(accountURL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();
    const transaction = await pepperiClientAPI.app.transactions.add({
      type: { InternalID: parseInt(atdID) },
      references: {
        account: { UUID: account.UUID },
        catalog: { Name: "Default Catalog" },
      },
    });
    return [transaction.id, account.UUID];
  }
  //** Creates transaction with papiClient -- NOT IN USE */
  async createTrans(atdID) {
    const account = await this.papiClient.accounts.upsert({
      ExternalID: "Account" + Math.random(),
      Name: "Test Acc" + Math.random(),
    });
    const accountInternalID = account.InternalID;
    const transaction = await this.papiClient.transactions.upsert({
      ActivityTypeID: parseInt(atdID),
      Catalog: { Data: { UUID: "755338E0-EAB3-409A-BDC2-7F0FDAA47C9D" } },
      Status: 1,
      Account: {
        Data: {
          InternalID: accountInternalID,
        },
      },
      ExternalID: "Order" + Math.random(),
    });
    return transaction.UUID;
  }
  //not in use
  async createTransactionLine(pepperiClientAPI, transactionUUID, ItemExID) {
    const line = await pepperiClientAPI.app.transactions.addLines({
      transaction: { UUID: transactionUUID },
      lines: [
        {
          item: { ExternalID: ItemExID },
          lineData: { UnitsQuantity: 2, lineNumber: 0 },
        },
      ],
    });
    if (line.success !== true) {
      return "failed to create Line";
    }
    return line.result[0].id;
  }
  //trigger event function
  async triggerEvent(
    accessToken: string,
    transactionUUID: any[],
    webAPIBaseURL: string,
    method: string,
    fieldName?: string,
    value?: string
  ) {
    const addonUUID = this.client.AddonUUID;
    let URL = `${webAPIBaseURL}/Service1.svc/v1/Transaction/${transactionUUID[0]}/Details/${method}`;

    let Body = {
      FieldApiName: fieldName,
      FieldValue: value,
    };
    let trigger;

    if (method === "DecrementValue" || method === "IncrementValue") {
      //Create transaction line for Increment/Decrement through Lihi's end and method
      const searchItemsURL = `${webAPIBaseURL}/Service1.svc/v1/OrderCenter/Transaction/${transactionUUID[0]}/Items/Search`;

      const countItemsBody = {
        Ascending: true,
        CatalogUID: transactionUUID[0],
        OrderBy: "",
        SearchText: "",
        SmartSearch: [],
        TabUID: '{"BrandFilter":0}',
        Top: 20,
        ViewType: "OrderCenterView3",
      };

      const relatedItemsData = await (
        await fetch(searchItemsURL, {
          method: "POST",
          body: JSON.stringify(countItemsBody),
          headers: {
            PepperiSessionToken: accessToken,
            "Content-Type": "application/json",
          },
        })
      ).json();

      const relatedItemsSearchCode = relatedItemsData.SearchCode;
      const transactionLineUUID = relatedItemsData.Rows[0].UID;

      const reqBody = {
        TransactionUID: transactionUUID[0],
        SearchCode: relatedItemsSearchCode,
        TransactionLineUID: transactionLineUUID,
        FieldApiName: "UnitsQuantity",
      };

      URL = `${webAPIBaseURL}/Service1.svc/v1/OrderCenter/Transaction/${transactionUUID[0]}/${method}`;

      trigger = await (
        await fetch(URL, {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            PepperiSessionToken: accessToken,
            "Content-Type": "application/json",
          },
        })
      ).json();
    }
    if (method === "Recalculate") {
      URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/${addonUUID}/addon-cpi/recalculate/${transactionUUID[1]}/trigger`;
      trigger = await (
        await fetch(URL, {
          method: "GET",
          headers: {
            PepperiSessionToken: accessToken,
            "Content-Type": "application/json",
          },
        })
      ).json();
    }

    if (method === "SetFieldValue") {
      trigger = await (
        await fetch(URL, {
          method: "POST",
          body: JSON.stringify(Body),
          headers: {
            PepperiSessionToken: accessToken,
            "Content-Type": "application/json",
          },
        })
      ).json();
    }

    return trigger;
  }

  async initSync(accessToken: string, webAPIBaseURL: string) {
    //webapi.sandbox.pepperi.com/16.60.82/webapi/Service1.svc/v1/HomePage
    const URL = `${webAPIBaseURL}/Service1.svc/v1/HomePage`;
    const navigateToHomescreen = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();
    return navigateToHomescreen;
  }
  //init routers test from server side -> CPI side
  async routerTester(webapiURL: string, accessToken: string) {
    //URL: https://webapi.sandbox.pepperi.com/16.60.62/webapi
    //{webapibaseurl}/v1/addon/api/{your-addon-uuid}/{your-file-name}/test:
    const params = {
      a: "bodyParam",
      v: "param",
      q: "queryParam",
    };
    const addonUUID = this.client.AddonUUID;
    const getURL = `${webapiURL}/Service1.svc/v1/Addon/Api/${addonUUID}/addon-cpi/addon-api/get?q=${params.q}`;
    const postURL = `${webapiURL}/Service1.svc/v1/Addon/Api/${addonUUID}/addon-cpi/addon-api/post`;
    const useURL = `${webapiURL}/Service1.svc/v1/Addon/Api/${addonUUID}/addon-cpi/addon-api/${params.v}/use`;

    const get = await (
      await fetch(getURL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
          "Sec-Fetch-Mode": "cors",
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
        },
      })
    ).json();

    const post = await (
      await fetch(postURL, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "text/plain", // DI-18306 CPI Service /Addon/API endpoint doesn't accept application/json
          "Sec-Fetch-Mode": "cors",
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
        },
      })
    ).json();

    const use = await (
      await fetch(useURL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
          "Sec-Fetch-Mode": "cors",
          Connection: "keep-alive",
        },
      })
    ).json();

    return {
      GET: { result: get.result, param: get.params },
      POST: { result: post.result, param: post.params },
      USE: { result: use.result, param: use.params },
    };
  }
  //checks UDT values that were inserted during the interceptors tests/load test
  async getUDTValues(tableName: string, pageSize: number, order_by: string) {
    const udtData = await this.papiClient.userDefinedTables.find({
      where: `MapDataExternalID='${tableName}'`,
      page_size: pageSize,
      order_by: `ModificationDateTime ${order_by}`,
    });
    return udtData;
  }

  async removeUDTValues(internalID: number) {
    const removeUDTLineRes = await this.papiClient.userDefinedTables.delete(
      internalID
    );
    return removeUDTLineRes;
  }

  async updateUDTValues(
    tableName: string,
    MainKey: string,
    SecondaryKey: string,
    Hidden? : boolean,
    Values? : string[]
  ) {
    const updateUDTLineRes = await this.papiClient.userDefinedTables.upsert({
      MapDataExternalID: tableName,
      MainKey: MainKey,
      SecondaryKey: SecondaryKey,
      Values: Values ? Values : ["removed"],
      Hidden: Hidden ? Hidden : true,
    });
    return updateUDTLineRes;
  }

  async setTestFlag(
    LoadFlag: boolean,
    interceptorsFlag: boolean,
    counter?: number
  ) {
    const body = {
      Key: "testKey1",
      Hidden: false,
      Name: "Load_Test",
      DateTime: new Date().toISOString(),
      object: {
        object: {},
        String: "String",
        Object: {},
        Array: [],
      },
      TestRunCounter: counter ? counter : 0,
      TestActive: LoadFlag,
      InterceptorsTestActive: interceptorsFlag,
    };

    const upsert = await this.upsertToADAL("Load_Test", body);

    return upsert;
  }

  async getSyncStatus(
    accessToken: string,
    webAPIBaseURL: string,
    loopsAmount = 30
  ) {
    let syncStatusReposnse;
    const url = `${webAPIBaseURL}/Service1.svc/v1/GetSyncStatus`;
    do {
      syncStatusReposnse = await fetch(url, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      });
      //This case is used when syncStatus was not created at all
      if (syncStatusReposnse === null) {
        await this.sleep(5000);
        console.log("Sync status not found, waiting...");
        loopsAmount--;
      }
      //This case will only retry the get call again as many times as the "loopsAmount"
      else if (syncStatusReposnse.Status == "Processing") {
        await this.sleep(5000);
        console.log(`UpToDate: Retry ${loopsAmount} Times.`);
        loopsAmount--;
      }
    } while (
      (syncStatusReposnse === null ||
        syncStatusReposnse.Status == "Processing") &&
      loopsAmount > 0
    );
    return syncStatusReposnse;
  }

  async sleep(ms: number) {
    console.debug(`%cSleep: ${ms} milliseconds`, "color: #f7df1e");
    await new Promise((f) => setTimeout(f, ms));
  }

  async runCPISideTest(
    accessToken: string,
    webAPIBaseURL: string,
    testName: string
  ) {
    //make request to the CPISide tests
    let URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/${this.client.AddonUUID}/addon-cpi/automation-tests/${testName}/tests`;
    if (testName === "ClientAPI/ADAL") {
      URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/${this.client.AddonUUID}/addon-cpi/${testName}`;
    }
    const testResults = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return testResults;
  }

  async PerformenceTester(webAPIBaseURL, accessToken) {
    let URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/${this.client.AddonUUID}/addon-cpi/PerformenceTest`;
    const testResults = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return testResults;
  }

  async upsertToADAL(tableName: string, body: AddonData) {
    const upsert = await this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table(tableName)
      .upsert(body);

    return upsert;
  }

  async getFromADAL(tableName: string, Key: string) {
    const get = await this.papiClient.addons.data
      .uuid(this.client.AddonUUID)
      .table(tableName)
      .find({ where: `Key=${Key}` });

    return get;
  }

  async getJWTFromCPISide(webAPIBaseURL: string, accessToken: string) {
    let URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/${this.client.AddonUUID}/addon-cpi/JWT`;
    const JWT = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return JWT;
  }

  async getAccountViaAPI(JWT: string) {
    let apiRegion: string = await this.getAPIRegion();

    const URL = `https://${apiRegion}.pepperi.com/V1.0/accounts?page_size=1&where=Hidden=false`;
    let getAcc;
    try {
      getAcc = await (
        await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JWT}`,
            "Content-Type": "application/json",
          },
        })
      ).json();
    } catch (err) {
      getAcc = err;
    }

    return getAcc;
  }

  async checkNodeVersion(varSecretKey: string) {
    const nodeAddonUUID = "bb6ee826-1c6b-4a11-9758-40a46acb69c5";

    let apiRegion: string = await this.getAPIRegion();

    const nodeAddon = await this.papiClient.addons.installedAddons
      .addonUUID(nodeAddonUUID)
      .get();

    const installedVersion = nodeAddon.Version;

    const URL = `https://${apiRegion}.pepperi.com/v1.0/var/addons/versions?where=AddonUUID='${nodeAddonUUID}'&order_by=CreationDateTime DESC&page_size=1`;
    //need to add another filter to the URL so it will bring back ONLY the latest version
    const latestVersion = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `${varSecretKey}`,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return {
      latestVersion: latestVersion[0].Version,
      installedVersion: installedVersion,
    };
  }

  async getAPIRegion(): Promise<string> {
    let environment = jwtDecode(this.client.OAuthAccessToken)[
      "pepperi.datacenter"
    ];

    let apiRegion: string = "";

    switch (environment) {
      case "sandbox": {
        apiRegion = "papi.staging";
        break;
      }
      case "eu": {
        apiRegion = "papi-eu";
        break;
      }
      case "prod": {
        apiRegion = "papi";
        break;
      }
    }

    return apiRegion;
  }
}

export default MyService;
