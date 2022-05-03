import MyService from "./services/my.service";
import { Client, Request } from "@pepperi-addons/debug-server";
import Tester from "./tester";
import { AddonData } from "@pepperi-addons/papi-sdk";
import ScriptService, {
  scriptObjectsUUID,
  Script,
} from "./services/scripts.service";
import ClientActionsService, {
  ClientAction,
} from "./services/clientActions.service";
import NotificationService from "./services/notifications.service";

export async function getInstalledAddons(client: Client, request: Request) {
  const service = new MyService(client);
  const res = await service.getAddons();
  return res;
}
//==============================cpi-node======================================
/** Load function test endpoint */
export async function InitiateLoad(client: Client, request: Request) {
  const service = new MyService(client);
  const isLocal = false;
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  const { describe, it, expect, run } = Tester("My test");

  if (isLocal) {
    accessToken = "c8cff29a-56f6-4489-a21a-79534785fb85"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }
  //run in case sync is running before tests
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  //set test flag to On
  const flagOn1 = await service.setTestFlag({
    TestRunCounter: 0,
    TestActive: true,
  }); // activates test
  await service.sleep(5000);
  const firstSync = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  const flagOn2 = await service.setTestFlag({
    TestRunCounter: 1,
    TestActive: true,
  }); // activates second iteration
  await service.sleep(5000);
  const secondSync = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  //set test flag to Off
  const flagOff = await service.setTestFlag({
    TestRunCounter: 0,
    TestActive: false,
  }); // deactivates test
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(10000);
  //need to add mocha and UDT get
  const udtData = await service.getUDTValues("LoadUDT", 2, "DESC");
  // remove UDT lines after test
  for (const line of udtData) {
    try {
      const res = await service.updateUDTValues(
        line.MapDataExternalID,
        line.MainKey,
        line.SecondaryKey,
        true
      );
      console.log(
        `LoadTester::Updated UDTLineID ${line.InternalID},with the following hidden status: ${res.Hidden} `
      );
    } catch (err) {
      console.log(`LoadTester::UDT Removal error: ${err}`);
    }
  }

  //mocha test
  describe("Load function automation test", async () => {
    it("Parsed test results", async () => {
      expect(
        udtData,
        "There was an issue,only one record returned from the Load UDT"
      )
        .to.be.an("array")
        .that.has.lengthOf(2);

      expect(
        udtData[0].SecondaryKey,
        "UDT brought back the wrong value for the first Load write"
      )
        .to.be.a("string")
        .and.to.be.equal("1").and.that.is.not.null.and.that.is.not.undefined;

      expect(
        udtData[1].SecondaryKey,
        "UDT brought back the wrong value for the second Load write"
      ).to.be.equal("0").and.that.is.not.null.and.that.is.not.undefined;

      expect(
        udtData[0].MainKey,
        "Both UDT values were indentical,there is an issue with the Load/Sync"
      )
        .to.be.a("string")
        .and.not.to.be.equal(udtData[1].MainKey);
    });
  });
  const testResults = await run();
  return testResults;
}
/** AddonAPI & versions testing endpoint */
export async function AddonAPITester(client: Client, request: Request) {
  const service = new MyService(client);
  const isLocal = false;
  const varSecretKey = request.body.varKey;
  // object to hold addon uuid and phased status -> for versions output
  const addonsKVP = [
    { uuid: "bb6ee826-1c6b-4a11-9758-40a46acb69c5", phased: false }, // cpi-node
    { uuid: "00000000-0000-0000-0000-0000003eba91", phased: true }, // cpas
    { uuid: "00000000-0000-0000-0000-000000000a91", phased: true }, // papi
    { uuid: "00000000-0000-0000-0000-000000abcdef", phased: true }, // cpapi
    { uuid: "00000000-0000-0000-0000-00000000ada1", phased: true }, // adal
    { uuid: "00000000-0000-0000-0000-000000040fa9", phased: true }, // pns
  ];
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  if (isLocal) {
    accessToken = "a8d5082f-daa6-4c54-a91d-77b1b2882f5e"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }

  const gottenVersions: {
    addonName: string | undefined;
    latestVersion: any;
    installedVersion: string | undefined;
  }[] = [];

  addonsKVP.forEach(async (value) => {
    const addonData = await service.checkAddonVersion(
      varSecretKey,
      value.uuid,
      value.phased
    );
    gottenVersions.push(addonData);
  });

  const routerTester = await service.routerTester(webAPIBaseURL, accessToken);

  describe("AddonAPI and version automation test", async () => {
    gottenVersions.forEach(async (addonData) => {
      // need to refactor to regular for
      const addonName = addonData.addonName;
      const installedVersion = addonData.installedVersion;
      const latestVersion = addonData.latestVersion;

      it(`${addonName} | Version: ${installedVersion} | Latest Version: ${latestVersion}`, async () => {
        expect(
          installedVersion,
          `Failed on current version input being empty or not as expected for ${addonName}`
        )
          .to.be.a("string")
          .that.lengthOf.above(0).is.not.undefined.and.is.not.empty;
        expect(
          latestVersion,
          `Failed on latest version input being empty or not as expected for ${addonName}`
        )
          .to.be.a("string")
          .that.lengthOf.above(0).is.not.undefined.and.is.not.empty;
        expect(
          gottenVersions.length,
          "failed due to having missing addon versions from API"
        )
          .to.be.a("number")
          .that.is.equal(6);
      });
    });

    it("AddonAPI Parsed test results", async () => {
      expect(
        routerTester,
        "There was an issue with the route test,the response did not include an object as expected"
      ).to.be.an("Object").that.is.not.null.and.is.not.undefined.and.is.not
        .empty;

      expect(routerTester.GET.result, "Failure on GET endpoint")
        .to.be.a("string")
        .that.is.equal("success"),
        expect(routerTester.GET.param, "Failure on GET queryParams")
          .to.be.a("string")
          .that.is.equal("queryParam");

      expect(routerTester.POST.result, "Failure on POST endpoint")
        .to.be.a("string")
        .that.is.equal("success"),
        expect(routerTester.POST.param, "Failure on POST bodyParams")
          .to.be.a("string")
          .that.is.equal("bodyParam");

      expect(routerTester.USE.result, "Failure on USE endpoint")
        .to.be.a("string")
        .that.is.equal("success"),
        expect(routerTester.USE.param, "Failure on USE params")
          .to.be.a("string")
          .that.is.equal("param");
    });
  });

  const testResults = await run();
  return testResults;
}
/** Interceptors test */
export async function InterceptorTester(client: Client, request: Request) {
  const service = new MyService(client);
  const atdID = 305697; //can be solved with getActivities.ATDID
  const { describe, it, expect, run } = Tester("My test");
  const isLocal = false;
  await service.setTestFlag({ InterceptorsTestActive: true });
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  if (isLocal) {
    accessToken = "54a7e16a-bb93-49d0-af7c-d49bd777b92d"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }
  const pepperiClientAPI = await service.getPepperiClientAPI(
    webAPIBaseURL,
    accessToken
  );
  const transactionUUID = await service.createTransaction(
    webAPIBaseURL,
    accessToken,
    pepperiClientAPI,
    atdID
  );
  const initSync1 = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(7500);
  const triggerSet = await service.triggerEvent(
    accessToken,
    transactionUUID,
    webAPIBaseURL,
    "SetFieldValue",
    "TSAInterceptorTrigger",
    "Inserted"
  );
  const triggerIncrement = await service.triggerEvent(
    accessToken,
    transactionUUID,
    webAPIBaseURL,
    "IncrementValue"
  );
  const triggerDeccrement = await service.triggerEvent(
    accessToken,
    transactionUUID,
    webAPIBaseURL,
    "DecrementValue"
  );
  const triggerRecalculate = await service.triggerEvent(
    accessToken,
    transactionUUID,
    webAPIBaseURL,
    "Recalculate"
  );
  await service.setTestFlag({ InterceptorsTestActive: false });
  const initSync2 = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(10000);
  const udtData = await service.getUDTValues("InterceptorsUDT", 1, "DESC");

  //remove UDT lines after test
  for (const line of udtData) {
    try {
      const res = await service.updateUDTValues(
        line.MapDataExternalID,
        line.MainKey,
        line.SecondaryKey,
        true
      );
      console.log(
        `InterceptorTester::Updated UDTLineID ${line.InternalID},with the following hidden status: ${res.Hidden} `
      );
    } catch (err) {
      console.log(`InterceptorTester:: UDT removal error: ${err}`);
    }
  }
  //MOCHA
  describe("Interceptors automation test", async () => {
    it("Parsed test results", async () => {
      expect(
        udtData,
        "UDT Logging Data returned undefined,please run the test again/check for sync issues"
      )
        .to.be.an("array")
        .that.has.lengthOf(1).and.is.not.null;
      expect(
        udtData[0].Values,
        "The sequence of the interceptors was not correct,please debug it"
      )
        .to.be.an("array")
        .that.is.eql([
          "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31",
        ]).and.is.not.null;
    });
  });

  const testResults = await run();
  return testResults;
}
/** runs CPISide tests */
export async function runCPISideTests(client: Client, request: Request) {
  const service = new MyService(client);
  let testName = request.body.testName;
  const tests = ["UI1", "UI2", "Data", "Negative", "ClientAPI/ADAL"];
  if (!tests.includes(testName)) {
    testName = "error";
  }
  if (testName === "error") {
    const error =
      "Test Name is invalid,please try: UI1/UI2/Data/Negative or ClientAPI/ADAL";
    throw new Error(error);
  }
  const isLocal = false;
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);

  if (isLocal) {
    accessToken = "c8cff29a-56f6-4489-a21a-79534785fb85"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }

  const testResults = await service.runCPISideTest(
    accessToken,
    webAPIBaseURL,
    testName
  );

  return testResults;
}
/**method to cleanse UDT lines in case one of the test goes wrong */
export async function cleanseUDTLines(client: Client, request: Request) {
  const service = new MyService(client);
  const udtName = request.body.tableName;
  const numOfRecords = request.body.numRecords;
  if (
    udtName === "" ||
    typeof udtName === "undefined" ||
    udtName === null ||
    numOfRecords === null ||
    typeof numOfRecords === "undefined"
  ) {
    const error =
      "Could not find the specified UDT / Sent the wrong records number";
    throw new Error(error);
  }
  const removeLines = await service.getUDTValues(udtName, numOfRecords, "DESC");
  console.log(removeLines);

  removeLines.forEach(async (line) => {
    if (line.InternalID! && typeof line.InternalID === "number") {
      try {
        await service.removeUDTValues(line.InternalID);
      } catch (err) {
        console.log(`There was an error during the UDT lines removal: ${err}`);
      }
    }
  });
}
/**method to run Performence test*/
export async function PerformenceTester(client: Client, request: Request) {
  const service = new MyService(client);
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  const cpasAddon = await service.papiClient.addons.installedAddons
    .addonUUID("00000000-0000-0000-0000-0000003eba91")
    .get();
  const cpiNodeAddon = await service.papiClient.addons.installedAddons
    .addonUUID("bb6ee826-1c6b-4a11-9758-40a46acb69c5")
    .get();

  const testData = await service.PerformenceTester(webAPIBaseURL, accessToken); //start CPISide function
  console.log(`PerformenceTester::Test Results: ${testData}`);
  const currentRes: number = parseFloat(testData.currentResults);
  const adalObject = await service.getFromADAL("Load_Test", "testKey3");
  console.log(`PerformenceTester::ADAL Object: ${adalObject}`);
  const bestDuration = parseFloat(adalObject[0].bestRun.Duration);
  const lastRun = parseFloat(adalObject[0].lastRun.Duration);
  const cpiNodeBestVersion: string = adalObject[0].bestRun.nodeVersion;
  const cpasBestVersion: string = adalObject[0].bestRun.cpasVersion;
  const bestRunFlag: boolean = currentRes < bestDuration ? true : false;
  //need to refactor name
  //** Testing data via TS code (to verify which data should go where) */
  const body: AddonData = {
    Key: "testKey3",
    Name: "PerformenceTest",
    Duration: currentRes,
    bestRun: {
      cpasVersion: bestRunFlag ? cpasAddon.Version : cpasBestVersion,
      nodeVersion: bestRunFlag ? cpiNodeAddon.Version : cpiNodeBestVersion,
      Duration: bestRunFlag ? currentRes : bestDuration,
    },
    lastRun: {
      cpasVersion: cpasAddon.Version,
      nodeVersion: cpiNodeAddon.Version,
      Duration: currentRes,
    },
  };
  const gottenAllObjects: boolean =
    typeof testData !== "undefined" &&
    testData &&
    typeof currentRes !== "undefined" &&
    currentRes
      ? true
      : false;

  if (gottenAllObjects) {
    try {
      await service.upsertToADAL("Load_Test", body);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`PerformenceTester:: ${err}`);
      }
    }
  }
  //** Testing data via mocha code (to verify which is correct and parse test results) */
  describe("Performence automation test", async () => {
    it("Parsed test results", async () => {
      expect(
        gottenAllObjects,
        "Failed to bring all test objects from test run/ADAL"
      ).to.be.a("boolean").that.is.true;

      expect(
        currentRes,
        "Test timespan took longer then the best run + average margin and version"
      )
        .to.be.a("number")
        .that.is.below(bestDuration * 1.2);

      expect(
        currentRes,
        "Test timespan took longer then the last run + average margin"
      )
        .to.be.a("number")
        .that.is.below(lastRun * 1.1);
    });
  });

  const testResults = await run();
  return testResults;
}
/**method to run TransactionScope test*/
export async function TransactionScopeTester(client: Client, request: Request) {
  const service = new MyService(client);
  const isLocal = false;
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);

  if (isLocal) {
    accessToken = "c8cff29a-56f6-4489-a21a-79534785fb85"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }
  //run in case sync is running before tests
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  //activate test flag on Load function
  await service.setTestFlag({ TrnScopeTestActive: true });
  //sync again to trigger the test interceptors
  const initSync1 = await service.initSync(accessToken, webAPIBaseURL);
  //wait till sync is over
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  //run and get mocha tests results from cpiSide
  const testResults = await service.runCPISideTest(
    accessToken,
    webAPIBaseURL,
    "TransactionScope"
  );
  //deactive adal tesk trigger
  await service.setTestFlag({ TrnScopeTestActive: false });
  const initSync2 = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  //return test results
  return testResults;
}
/**UIObject.Create test*/
export async function UIObjectCreate(client: Client, request: Request) {
  const service = new MyService(client);
  const isLocal = false;
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);

  if (isLocal) {
    accessToken = "c8cff29a-56f6-4489-a21a-79534785fb85"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }
  //run in case sync is running before tests
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(2000);
  //run and get mocha tests results from cpiSide
  const testResults = await service.runCPISideTest(
    accessToken,
    webAPIBaseURL,
    "UIObjectCreate"
  );
  //deactive adal tesk trigger
  const initSync2 = await service.initSync(accessToken, webAPIBaseURL);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(2000);
  //return test results
  return testResults;
}
/**method to run JWTTesterPositive test - positive */
export async function JWTTesterPositive(client: Client, request: Request) {
  const service = new MyService(client);
  const isLocal = false;
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  if (isLocal) {
    accessToken = "a8d5082f-daa6-4c54-a91d-77b1b2882f5e"; //fill in from CPINode debugger
    webAPIBaseURL = "http://localhost:8093";
  }

  const JWT = await service.getJWTFromCPISide(webAPIBaseURL, accessToken);
  if (JWT.JWT === "None") {
    console.log(`JWTTester:: There was an error during the test: ${JWT.err}`);
    return `JWTTester::There was an issue with the test,No JWT was returned from CPISide,Error: ${JWT.err}`;
  }

  const validAccountDataForTest = await service.getAccountViaAPI(JWT.JWT);

  const Body: AddonData = {
    Key: "JWTKey1",
    Name: "JWTExpiryTest",
    Token: JWT.JWT,
  };
  await service.upsertToADAL("Load_Test", Body);

  describe("JWT automation test - Positive", async () => {
    it("Parsed test results for a valid Token", async () => {
      expect(validAccountDataForTest[0], "Failed on gotten object from PAPI")
        .to.be.an("object")
        .that.is.not.empty.and.is.not.null.and.is.not.undefined.and.is.not.eql({
          fault: {
            faultstring: "Authorization request denied.",
            detail: {
              errorcode: "Unauthorized",
            },
          },
        });
      expect(
        validAccountDataForTest[0].InternalID,
        "Brought back the wrong object from PAPI"
      ).to.be.a("number").that.is.not.null.and.is.not.undefined,
        expect(
          validAccountDataForTest[0].UUID,
          "Brought back the wrong object from PAPI"
        )
          .to.be.a("string")
          .that.has.lengthOf(36).and.is.not.null.and.is.not.undefined,
        expect(
          validAccountDataForTest[0].Hidden,
          "Brought back the wrong object from PAPI"
        ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
          .undefined;
    });
  });

  const testResults = await run();
  return testResults;
}
/**method to run JWTTesterNegative test - negative */
export async function JWTTesterNegative(client: Client, request: Request) {
  const service = new MyService(client);
  const { describe, it, expect, run } = Tester("My test");

  const JWTFromAdal = await service.getFromADAL("Load_Test", "JWTKey1");
  const JWT = JWTFromAdal[0].Token;
  const invalidAccountDataForTest = await service.getAccountViaAPI(JWT);
  console.log(invalidAccountDataForTest);
  //test invalid get -> need to finish mocha
  describe("JWT automation test - Negative", async () => {
    it("Parsed test results for an invalid Token", async () => {
      expect(
        invalidAccountDataForTest,
        "The token expiry did not work,GET request from API succeeded,meaning the JWT did not expire"
      )
        .to.be.an("object")
        .that.is.eql({
          fault: {
            faultstring: "Authorization request denied.",
            detail: {
              errorcode: "Unauthorized",
            },
          },
        });
    });
  });

  const testResults = await run();
  return testResults;
}
//========================Scripts============================================
export async function scriptsListTester(client: Client, request: Request) {
  const scriptsService = new ScriptService(client);
  const service = new MyService(client);
  // let webAPIBaseURL = await service.getWebAPIBaseURL();
  // let accessToken = await service.getAccessToken(webAPIBaseURL);
  // const test = await service.getCrap();
  // console.log(test);
  let FindOptions = {
    //     where?: string;
    //     order_by?: string;
    //     page?: number;
    //     page_size?: number;
    //     include_nested?: boolean;
    //     full_mode?: boolean;
    //     include_deleted?: boolean;
    //     is_distinct?: boolean;
    page: 2,
    page_size: 4,
    include_deleted: true,
  }; // need to figure what we're going to use,just for tests
  const response: Script[] = await scriptsService.getScriptsWithFindOptions(
    FindOptions
  );

  return response;
}

export async function scriptClientAPITester(client: Client, request: Request) {
  console.log("scriptClientAPITester::Test started");
  const scriptsService = new ScriptService(client);
  const service = new MyService(client);
  const { describe, it, expect, run } = Tester("My test");
  console.log("scriptClientAPITester::before getting scripts list");
  const clientAPIScriptList: Script[] = await scriptsService.getAllScripts();
  console.log("scriptClientAPITester::after getting scripts list");
  const map = new Map<string, [string, string]>();
  //when this endpoint will allow filtering by name -> will be refactored
  for (const script of clientAPIScriptList) {
    if (script.Name.includes("ClientAPI")) {
      const Description = script.Description;
      switch (Description) {
        case "item get":
          map.set(script.Key, [scriptObjectsUUID.itemUUID, script.Name]);
          break;
        case "activity get":
          map.set(script.Key, [scriptObjectsUUID.activityUUID, script.Name]);
          break;
        case "line add":
          map.set(script.Key, [scriptObjectsUUID.transactionUUID, script.Name]);
          break;
        case "transaction get":
          map.set(script.Key, [scriptObjectsUUID.transactionUUID, script.Name]);
          break;
        case "account get":
          map.set(script.Key, [scriptObjectsUUID.accountUUID, script.Name]);
          break;
        case "account add":
          map.set(script.Key, [scriptObjectsUUID.accountExID, script.Name]);
          break;
        case "transaction add":
          map.set(script.Key, [scriptObjectsUUID.accountUUID, script.Name]);
          break;
        case "activity add":
          map.set(script.Key, [scriptObjectsUUID.accountUUID, script.Name]);
          break;
      }
    }
  }
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  await service.sleep(5000);
  const connectAccount = await scriptsService.connectAccount(
    webAPIBaseURL,
    accessToken,
    scriptObjectsUUID.accountUUID
  );

  describe("Scripts clientAPI automation test", async () => {
    for (const [key, value] of map) {
      let response;
      it(`Initializing ${value[1]} script data `, async () => {
        const Data = {
          Data: { UUID: value[0] },
        };
        console.log(
          `scriptClientAPITester::currently running ${value[1]} script`
        );
        response = await scriptsService.runScript(
          webAPIBaseURL,
          accessToken,
          key,
          Data
        );
      });
      it(`Parsed test results for ${value[1]} script `, async () => {
        expect(
          response.Result,
          "Failed on ClientAPI returning empty object"
        ).to.be.an("object").that.is.not.null.and.undefined;
        expect(
          response.Result.success,
          "Failed on ClientAPI returning"
        ).to.be.a("boolean").that.is.true;
        if (
          typeof response.Result.result === "object" &&
          response.Result.result.length === undefined
        ) {
          expect(
            response.Result.result,
            "Failed on result returning with the wrong type"
          ).to.be.an("object").that.is.not.null.and.undefined;
          if (response.Result.result.UUID) {
            expect(
              response.Result.result.UUID,
              "Failed on result returning without UUID"
            ).to.be.a("string").that.is.not.null.and.undefined;
          }
        } else if (typeof response.Result.object === "object") {
          expect(
            response.Result.object,
            "Failed on result returning with the wrong type"
          ).to.be.an("object").that.is.not.null.and.undefined;
          if (response.Result.object.UUID) {
            expect(
              response.Result.object.UUID,
              "Failed on result returning without UUID"
            ).to.be.a("string").that.is.not.null.and.undefined;
          }
        } else if (
          response.Result.result !== undefined &&
          response.Result.result.length === 1
        ) {
          expect(
            response.Result.result[0],
            "Failed on result returning with the wrong type"
          ).to.be.an("object").that.is.not.null.and.undefined;
          if (response.Result.result[0].UUID) {
            expect(
              response.Result.result[0].UUID,
              "Failed on result returning without UUID"
            ).to.be.a("string").that.is.not.null.and.undefined;
          }
        }
      });
    }
  });

  const testResults = await run();
  return testResults;
}

export async function scriptsNegativeTester(client: Client, request: Request) {
  console.log("scriptsNegativeTester::Test started");
  const scriptsService = new ScriptService(client);
  const service = new MyService(client);
  const { describe, it, expect, run } = Tester("My test");
  console.log("scriptsNegativeTester::before getting scripts list");
  const scripstList: Script[] = await scriptsService.getAllScripts();
  console.log("scriptsNegativeTester::after getting scripts list");
  const map = new Map<string, string>();
  //when this endpoint will allow filtering by name -> will be refactored
  for (const script of scripstList) {
    if (
      script.Description.includes("Security") ||
      script.Description.includes("Negative")
    ) {
      const Description = script.Description;
      //need to change according to negative logic and requests
      switch (Description) {
        case "Security":
          map.set(script.Key, script.Name);
          break;
        case "Negative":
          map.set(script.Key, script.Name);
          break;
        default:
          break;
      }
    }
  }

  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  await service.sleep(2000);

  const randNumber = Math.floor((Math.random() + 1) * 1000);

  describe("Scripts Negative automation test", async () => {
    for (const [key, value] of map) {
      let response;
      let Data;
      //currently dialog does not return ac exception
      it(`Initializing ${value} script data `, async () => {
        console.log(key);
        console.log(value);
        if (value.includes("Sleep") || value.includes("process.exit(1)")) {
          Data = {
            Data: { ms: randNumber },
          };
        } else if (value.includes("missingParameters")) {
          Data = {
            Data: { var1: Math.random() },
          };
        } else if (value.includes("NegativeWithParameters")) {
          Data = {
            Data: { number: "string", string: 9, boolean: 3, object: "{}" },
          };
        } else {
          Data = {
            Data: {
              xxxx: randNumber,
              y: randNumber * 2,
              myText: "start",
              myText2: "end",
            },
          };
        }
        console.log(`scriptsNegativeTester::currently running ${value} script`);
        response = await scriptsService.runScript(
          webAPIBaseURL,
          accessToken,
          key,
          Data
        );
        console.log(response);
        console.log(`scriptsNegativeTester::finished running ${value} script`);
      });
      it(`Parsed test results for ${value} script `, async () => {
        switch (value) {
          case "Sleep":
            expect(
              response,
              "failed on sleep script returning the wrong response"
            ).to.be.an("object").that.is.not.null.and.undefined;
            expect(
              response.Result,
              "Failed on sleep script returning wrong response value"
            )
              .to.be.a("string")
              .that.is.equal(`waited ${randNumber / 1000} secs`);
            break;

          case "process.exit(1)":
            expect(
              response,
              "Failed on process.exit(1) script returning the wrong output"
            ).to.be.an("object").that.is.not.null.and.undefined;
            expect(
              response.Error,
              "script returning wrong error for process.exit(1)"
            )
              .to.be.a("string")
              .that.is.equal("process.exit is not a function");
            break;

          case "Dialog":
            expect(
              response,
              "Failed on Dialog script returning the wrong output"
            ).to.be.an("object").that.is.not.null.and.undefined;
            expect(response.Error, "script returning wrong error for Dialog")
              .to.be.an("string")
              .that.is.equal("client is not defined").and.is.not.null.and
              .undefined;

            break;

          case "missingParameters":
            expect(
              response,
              "failed on missingParameters script returning the wrong response"
            ).to.be.an("object").that.is.not.null.and.undefined;
            expect(
              response.Result,
              "Failed on missingParameters script returning wrong response value"
            )
              .to.be.a("number")
              .that.is.above(0)
              .and.below(1);
            break;

          case "NegativeWithParameters":
            expect(
              response,
              "Failed on NegativeWithParameters script returning the wrong output"
            ).to.be.an("object").that.is.not.null.and.undefined;
            expect(
              response.Error,
              "Failed on NegativeWithParameters script returning the wrong output"
            )
              .to.be.a("string")
              .that.is.equal("invalid parameter value");
            break;

          default:
            break;
        }
      });
    }
  });

  const testResults = await run();
  return testResults;
}

export async function scriptsPositiveTester(client: Client, request: Request) {

  console.log("scriptsPositiveTester::Test started");
  const scriptsService = new ScriptService(client);
  const service = new MyService(client);
  const { describe, it, expect, run } = Tester("My test");
  console.log("scriptsPositiveTester::before getting scripts list");
  const scripstList: Script[] = await scriptsService.getAllScripts();
  console.log("scriptsPositiveTester::after getting scripts list");
  const map = new Map<string, string>();
  //when this endpoint will allow filtering by name -> will be refactored
  for (const script of scripstList) {
    if (script.Description.includes("Positive")) {
      const Description = script.Description;
      //need to change according to negative logic and requests
      switch (Description) {
        case "Positive":
          map.set(script.Key, script.Name);
          break;

        default:
          break;
      }
    }
  }

  const testValuesObject = {
    number: { number: 10, string: "strung", boolean: false, object: undefined },
    string: { number: 9, string: "string", boolean: false, object: undefined },
    boolean: { number: 9, string: "strung", boolean: true, object: undefined },
    object: { number: 9, string: "strung", boolean: false, object: undefined },
    undefined: { number: 9, string: "strung", boolean: false, object: {} },
    negative: {},
  };
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  await service.sleep(2000);
  describe("Scripts Positive automation test", async () => {
    for (const [key, value] of map) {
      switch (value) {
        case "WithParameters":
          for (const [testKey, testValue] of Object.entries(testValuesObject)) {
            let Data;
            let response;

            Data = {
              Data: testValue,
            };

            it(`Initializing ${value} - ${testKey} script data `, async () => {
              console.log(
                `scriptsNegativeTester::currently running ${value} - ${testKey} script`
              );
              response = await scriptsService.runScript(
                webAPIBaseURL,
                accessToken,
                key,
                Data
              );
            });
            it(`Parsed test results for ${value} - ${testKey} script data `, async () => {
              const responseType = typeof response.Result;
              if (response.Error) {
                expect(
                  response,
                  "Response error object returned with wrong type"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  response.Error,
                  "Failed on WithParameters script returning value although not parameters were sent"
                )
                  .to.be.a("string")
                  .that.is.equal("invalid parameter value");
              }
              switch (responseType) {
                case "string":
                  expect(
                    response.Result,
                    "Failed on string type not returning the correct type"
                  )
                    .to.be.a("string")
                    .that.is.equal("string");
                  break;
                case "boolean":
                  expect(
                    response.Result,
                    "Failed on boolean type not returning the correct type"
                  )
                    .to.be.a("boolean")
                    .that.is.equal(true);
                  break;
                case "number":
                  expect(
                    response.Result,
                    "Failed on number type not returning the correct type"
                  )
                    .to.be.a("number")
                    .that.is.equal(10);
                  break;
                case "object":
                  expect(
                    response.Result,
                    "Failed on object type not returning the correct type"
                  )
                    .to.be.a("object")
                    .that.is.deep.equal({
                      string: "strung",
                      number: 9,
                      boolean: false,
                    });
                  break;
                case "undefined":
                  expect(
                    response.Result,
                    "Failed on undefined type not returning the correct type"
                  )
                    .to.be.a("undefined")
                    .that.is.equal(undefined);
                  break;
                default:
                  break;
              }
            });
          }
          break;
        default:
          break;
      }
    }
  });
  const testResults = await run();
  return testResults;
}
//=======================client actions=======================================
//https://pepperi-addons.github.io/client-actions-docs/
export async function clientActionsTester(client: Client, request: Request) {
  console.log("clientActionsTester::Test started");
  //services setup and perconditions setup
  const service = new MyService(client);
  const clientActionsService = new ClientActionsService(client);
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  //run in case sync is running before tests
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  //activate test flag on Load function
  await service.setTestFlag({ clientActionsTestActive: true });
  //sync again to trigger the test interceptors
  const initSync1 = await service.initSync(accessToken, webAPIBaseURL);
  //wait till sync is over
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  const interceptorsNamesArr = [
    "TSAAlert",
    "TSACaptureGeo",
    "TSAScanBarcode",
    "TSAHUD",
    "TSANavigateToCustomPage",
    "TSANavigateToHome",
    "TSANavigateToCustomModal",
    "TSANavigateBack",
  ];
  //setting up global map for client actions test data
  global["map"] = new Map<string, any>();
  console.log(
    "clientActionsTester::Triggering buttonPressed event to get client actions"
  );
  //looping on each field to trigger cpi-side related events -> these will trigger the corresponding client actions
  for (const button of interceptorsNamesArr) {
    console.log(`clientActionsTester::Started triggering ${button}`);
    const options = {
      EventKey: "TSAButtonPressed",
      EventData: JSON.stringify({
        FieldID: button,
      }),
    };
    //calling recursive function - event loop to run all client actions in existant for the current interceptor
    const clientAction = await clientActionsService.EmitClientEvent(
      webAPIBaseURL,
      accessToken,
      options
    );
    console.log(`clientActionsTester::Finished triggering ${button}`);
  }
  await service.setTestFlag({ clientActionsTestActive: false });
  const initSync2 = await service.initSync(accessToken, webAPIBaseURL);
  await service.sleep(2000);
  //await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(1000);
  //getting actions back from global map after client actions responses (event loop finished)
  const actions = global["map"] as Map<string, any>; //key - client action UUID,value - data
  const arrActions: any[] = [];
  for (const action of actions) {
    arrActions.push(action);
  }
  console.log(actions);
  describe("Client Actions Automation positive test", async () => {
    for (const [key, value] of actions) {
      const Object = JSON.parse(value);
      const parsedActionData: ClientAction = JSON.parse(Object.Value);
      const Type = parsedActionData.Type;
      let Title = ""; //used to enter the accuracy/title into the test title - ok if not populated,some actions do not have Titles
      //arrActions.push(parsedActionData);
      //filter test action according to type
      switch (Type) {
        //dialog client actions functions test
        case "Dialog":
          Title = parsedActionData.Data.Title; //getting filter to test according to Title
          it(`Client Actions Automation - ${Type} - ${Title}`, async () => {
            //general tests for all action types
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on Dialog client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("Dialog");
            expect(
              parsedActionData.Data.IsHtml,
              "Failed on isHtml returning wrong value/type"
            ).to.be.a("boolean").that.is.false;
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            //filter actions tests accodring to subtype as listed below
            switch (Title) {
              //alert test
              case "alert":
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("alert");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("putin is douchebag");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(1);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Ok");
                break;
              //confirm test
              case "confirm":
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("confirm");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("putin is a huylo");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(2);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Ok");
                expect(
                  parsedActionData.Data.Actions[1],
                  "Failed on Actions[1] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[1].Key,
                  "Failed on Actions[1].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[1].Title,
                  "Failed on Actions[1].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Cancel");
                break;
              //showDialog test
              case "showDialog":
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("showDialog");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("putin pashul nahuy dibilnaya tvar");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(3);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("not cool putin");
                expect(
                  parsedActionData.Data.Actions[1],
                  "Failed on Actions[1] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[1].Key,
                  "Failed on Actions[1].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[1].Title,
                  "Failed on Actions[1].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("really not cool putin");
                expect(
                  parsedActionData.Data.Actions[2],
                  "Failed on Actions[2] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[2].Key,
                  "Failed on Actions[2].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[2].Title,
                  "Failed on Actions[2].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("putin is a boomer");
                break;
              default:
                break;
            }
          });
          break;
        case "HUD":
          Title = parsedActionData.Data.State; //getting filter to test according to state
          const HUDKey = global["HUDKey"].toUpperCase() as string;
          it(`Client Actions Automation - ${Type} - ${Title}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on HUD client action type returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("HUD");
            expect(
              parsedActionData.Callback,
              "Failed on HUD client action callback returning the wrong type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            switch (Title) {
              case "Show":
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("Show");
                expect(
                  parsedActionData.Data.Message,
                  "Failed on returning the wrong message on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("Waiting....");
                expect(
                  parsedActionData.Data.CloseMessage,
                  "Failed on returning the wrong CloseMessage on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("Press to close");
                expect(
                  parsedActionData.Data.CancelEventKey,
                  "Failed on cancel event key returning wrong value"
                )
                  .to.be.a("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Interval,
                  "Failed on wrong interval returning"
                )
                  .to.be.a("number")
                  .that.is.equal(0.5);
                break;
              case "Poll":
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD Poll"
                )
                  .to.be.a("string")
                  .that.is.equal("Poll");
                expect(
                  parsedActionData.Data.Interval,
                  "Failed on wrong interval returning"
                )
                  .to.be.a("number")
                  .that.is.equal(0.5);
                expect(
                  parsedActionData.Data.HUDKey,
                  "Failed on hud returning wrong HUDKey"
                )
                  .to.be.a("string")
                  .that.is.equal(HUDKey);
                expect(
                  parsedActionData.Data.Message,
                  "Failed on poll returning wrong message"
                )
                  .to.be.a("string")
                  .that.is.equal("Waiting....");
                break;
              case "Hide":
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD hide"
                )
                  .to.be.a("string")
                  .that.is.equal("Hide");
                expect(
                  parsedActionData.Data.HUDKey,
                  "Failed on hud returning wrong HUDKey"
                )
                  .to.be.a("string")
                  .that.is.equal(HUDKey);
                break;
              default:
                break;
            }
          });
          break;
        case "Barcode":
          it(`Client Actions Automation - ${Type}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on Barcode client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("Barcode");
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
          });
          break;
        case "GeoLocation":
          Title = parsedActionData.Data.Accuracy; //getting filter to test according to Accuracy
          it(`Client Actions Automation - ${Type} - ${Title}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on CaptureGeo client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("GeoLocation");
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            switch (Title) {
              case "Low":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("Low");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(400);
                break;
              case "Medium":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("Medium");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(200);
                break;
              case "High":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("High");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(300);
                break;
            }
          });
          break;
        case "Navigation":
          const history = parsedActionData.Data.History;
          const url = parsedActionData.Data.URL;
          const presentationStyle = parsedActionData.Data.PresentationStyle;
          it(`Client Actions Automation - ${Type} - ${url} `, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on Navigate client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("Navigation");
            switch (url) {
              case "/customblankpage":
                history === "ClearTo"
                  ? expect(history, "Failed on history returning wrong value")
                      .to.be.a("string")
                      .that.is.equal("ClearTo")
                  : expect(history, "Failed on history returning wrong value")
                      .to.be.a("string")
                      .that.is.equal("None");
                presentationStyle === "FullScreen"
                  ? expect(
                      presentationStyle,
                      "presentatioStyle returned wrong value"
                    )
                      .to.be.a("string")
                      .that.is.equal("FullScreen")
                  : expect(
                      presentationStyle,
                      "presentatioStyle returned wrong value"
                    )
                      .to.be.a("string")
                      .that.is.equal("Modal");
                break;
              case "/homepage":
                expect(history, "Failed on history returning wrong value")
                  .to.be.a("string")
                  .that.is.equal("None");
                expect(
                  presentationStyle,
                  "presentatioStyle returned wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("FullScreen");
                break;
              case "back":
                expect(history, "Failed on history returning wrong value")
                  .to.be.a("string")
                  .that.is.equal("None");
                expect(
                  presentationStyle,
                  "presentatioStyle returned wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("FullScreen");
                break;
            }
          });
          break;

        default:
          break;
      }
    }
    it(`Client Actions Automation - Testing No actions were made after Navigate`, async () => {
      const action = JSON.parse(arrActions[arrActions.length - 1][1]);
      const parsedAction = JSON.parse(action.Value);
      console.log(parsedAction);
      expect(
        parsedAction,
        "failed on last action data returning wrong type"
      ).to.be.an("object").that.is.not.undefined.and.empty;
      expect(
        parsedAction.Type,
        "Failed on wrong type returning for last action"
      )
        .to.be.a("string")
        .that.is.equal("Navigation");
      expect(
        parsedAction.Data.History,
        "Failed on history returning wrong value on last action"
      )
        .to.be.a("string")
        .that.is.equal("None");
      expect(
        parsedAction.Data.PresentationStyle,
        "Failed on presentationStyle returning wrong value on last action"
      )
        .to.be.a("string")
        .that.is.equal("FullScreen");
      expect(
        parsedAction.Data.URL,
        "Failed on URL returning wrong value on last action"
      )
        .to.be.a("string")
        .that.is.equal("back");
    });
  });
  console.log("clientActionsTester::Test Finished");
  const testResults = await run();
  return testResults;
  // return {
  //   actions: arrActions,
  // };
}
//in the works
export async function negativeClientActionsTester(
  client: Client,
  request: Request
) {
  console.log("negativeClientActionsTester::Test started");
  //services setup and perconditions setup
  const service = new MyService(client);
  const clientActionsService = new ClientActionsService(client);
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  //run in case sync is running before tests
  // await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  // //activate test flag on Load function
  // await service.setTestFlag(false, false, 0, false, true);
  // //sync again to trigger the test interceptors
  // const initSync1 = await service.initSync(accessToken, webAPIBaseURL);
  // //wait till sync is over
  // await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  const interceptorsNamesArr = [
    "TSAAlert", //,
    // "TSACaptureGeo",
    // "TSAScanBarcode",
    // "TSAHUD",
  ];
  //setting up global map for client actions test data
  global["negative"] = new Map<string, any>();
  console.log(
    "negativeClientActionsTester::Triggering buttonPressed event to get client actions"
  );
  //looping on each field to trigger cpi-side related events -> these will trigger the corresponding client actions
  for (const button of interceptorsNamesArr) {
    console.log(`negativeClientActionsTester::Started triggering ${button}`);
    const options = {
      EventKey: "TSAButtonPressed",
      EventData: JSON.stringify({
        FieldID: button,
      }),
    };
    //calling recursive function - event loop to run all client actions in existant for the current interceptor
    const clientAction = await clientActionsService.EmitNegativeClientEvent(
      webAPIBaseURL,
      accessToken,
      options
    );
    console.log(`negativeClientActionsTester::Finished triggering ${button}`);
  }

  //getting actions back from global map after client actions responses (event loop finished)
  const actions = global["negative"] as Map<string, any>; //key - client action UUID,value - data
  //const arrActions: any[] = [];

  for (const [key, value] of actions) {
    const Object = JSON.parse(value);
    const parsedActionData: ClientAction = JSON.parse(Object.Value);
    const Type = parsedActionData.Type;
  }
}
//formalized
export async function withinHudClientActionsTester(
  client: Client,
  request: Request
) {
  console.log("withinHudClientActionsTester::Test started");
  //services setup and perconditions setup
  const service = new MyService(client);
  const clientActionsService = new ClientActionsService(client);
  const { describe, it, expect, run } = Tester("My test");
  let webAPIBaseURL = await service.getWebAPIBaseURL();
  let accessToken = await service.getAccessToken(webAPIBaseURL);
  //run in case sync is running before tests
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  //activate test flag on Load function
  await service.setTestFlag({ clientActionsWithinHudTestActive: true });
  //sync again to trigger the test interceptors
  const initSync1 = await service.initSync(accessToken, webAPIBaseURL);
  //wait till sync is over
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  const interceptorsNamesArr = [
    "TSAGeoLocationWithinHud",
    "TSABarcodeWithinHud",
    "TSAAlertWithinHud",
    "TSAWithinMixedHudFirst",
    "TSAWithinMixedHudSecond",
  ];
  //setting up global map for client actions test data
  global["map"] = new Map<string, any>();
  console.log(
    "withinHudClientActionsTester::Triggering buttonPressed event to get client actions"
  );
  //looping on each field to trigger cpi-side related events -> these will trigger the corresponding client actions
  for (const button of interceptorsNamesArr) {
    console.log(`withinHudClientActionsTester::Started triggering ${button}`);
    const options = {
      EventKey: "TSAButtonPressed",
      EventData: JSON.stringify({
        FieldID: button,
      }),
    };
    //calling recursive function - event loop to run all client actions in existant for the current interceptor
    const clientAction = await clientActionsService.EmitClientEvent(
      webAPIBaseURL,
      accessToken,
      options
    );
    console.log(`withinHudClientActionsTester::Finished triggering ${button}`);
  }
  await service.setTestFlag({ clientActionsWithinHudTestActive: false });
  const initSync2 = await service.initSync(accessToken, webAPIBaseURL);
  await service.sleep(2000);
  await service.getSyncStatus(accessToken, webAPIBaseURL, 10);
  await service.sleep(5000);
  //getting actions back from global map after client actions responses (event loop finished)
  const actions = global["map"] as Map<string, any>; //key - client action UUID,value - data
  //const arrActions: any[] = [];

  describe("Client Actions Automation withinHudClientActionsTester test", async () => {
    for (const [key, value] of actions) {
      const Object = JSON.parse(value);
      const parsedActionData: ClientAction = JSON.parse(Object.Value);
      const Type = parsedActionData.Type;
      let Title = ""; //used to enter the accuracy/title into the test title - ok if not populated,some actions do not have Titles
      //arrActions.push(parsedActionData);
      //filter test action according to type
      switch (Type) {
        //dialog client actions functions test
        case "Dialog":
          Title = parsedActionData.Data.Title; //getting filter to test according to Title
          it(`withinHudClientActionsTester - ${Type} - ${Title}`, async () => {
            //general tests for all action types
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on Dialog client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("Dialog");
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            //filter actions tests accodring to subtype as listed below
            switch (Title) {
              //alert test
              case "alertWithinHud":
                expect(
                  parsedActionData.Data.IsHtml,
                  "Failed on isHtml returning wrong value/type"
                ).to.be.a("boolean").that.is.true;
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("alertWithinHud");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("<p>Slava Ukraine<p>");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(1);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Ok");
                break;
              //confirm test
              case "confirmWithinHud":
                expect(
                  parsedActionData.Data.IsHtml,
                  "Failed on isHtml returning wrong value/type"
                ).to.be.a("boolean").that.is.false;
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("confirmWithinHud");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("putin is a huylo yayaya");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(2);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Ok");
                expect(
                  parsedActionData.Data.Actions[1],
                  "Failed on Actions[1] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[1].Key,
                  "Failed on Actions[1].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[1].Title,
                  "Failed on Actions[1].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("Cancel");
                break;
              //showDialog test
              case "showDialogWithinHud":
                expect(
                  parsedActionData.Data.IsHtml,
                  "Failed on isHtml returning wrong value/type"
                ).to.be.a("boolean").that.is.false;
                expect(
                  parsedActionData.Data.Title,
                  "Failed on title returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("showDialogWithinHud");
                expect(
                  parsedActionData.Data.Content,
                  "Failed on content returning wrong value/type"
                )
                  .to.be.a("string")
                  .that.is.equal("putin pashul nahuy dibilnaya tvar yaya");
                expect(
                  parsedActionData.Data.Actions,
                  "Failed on actions not returning as an array"
                )
                  .to.be.an("array")
                  .with.lengthOf(3);
                expect(
                  parsedActionData.Data.Actions[0],
                  "Failed on Actions[0] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[0].Key,
                  "Failed on Actions[0].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[0].Title,
                  "Failed on Actions[0].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("not cool putin yaya");
                expect(
                  parsedActionData.Data.Actions[1],
                  "Failed on Actions[1] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[1].Key,
                  "Failed on Actions[1].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[1].Title,
                  "Failed on Actions[1].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("really not cool putin yaya");
                expect(
                  parsedActionData.Data.Actions[2],
                  "Failed on Actions[2] not being an object"
                ).to.be.an("object").that.is.not.null.and.undefined;
                expect(
                  parsedActionData.Data.Actions[2].Key,
                  "Failed on Actions[2].key not being a string"
                )
                  .to.be.an("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Actions[2].Title,
                  "Failed on Actions[2].title having the wrong value/type"
                )
                  .to.be.an("string")
                  .that.is.equal("putin is a boomeryaya");
                break;

              default:
                break;
            }
          });
          break;
        //hud client actions functions test
        case "HUD":
          Title = parsedActionData.Data.State; //getting filter to test according to state
          const HUDKey = global["HUDKey"].toUpperCase() as string;
          it(`withinHudClientActionsTester - ${Type} - ${Title}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on HUD client action type returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("HUD");
            expect(
              parsedActionData.Callback,
              "Failed on HUD client action callback returning the wrong type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            switch (Title) {
              case "Show":
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("Show");
                expect(
                  parsedActionData.Data.Message,
                  "Failed on returning the wrong message on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("withinHudTest");
                expect(
                  parsedActionData.Data.CloseMessage,
                  "Failed on returning the wrong CloseMessage on HUD Show"
                )
                  .to.be.a("string")
                  .that.is.equal("HUD!!!");
                expect(
                  parsedActionData.Data.CancelEventKey,
                  "Failed on cancel event key returning wrong value"
                )
                  .to.be.a("string")
                  .that.has.lengthOf(36);
                expect(
                  parsedActionData.Data.Interval,
                  "Failed on wrong interval returning"
                )
                  .to.be.a("number")
                  .that.is.above(0);
                break;
              case "Poll":
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD Poll"
                )
                  .to.be.a("string")
                  .that.is.equal("Poll");
                expect(
                  parsedActionData.Data.Interval,
                  "Failed on wrong interval returning"
                )
                  .to.be.a("number")
                  .that.is.above(0);
                expect(
                  parsedActionData.Data.HUDKey,
                  "Failed on hud returning wrong HUDKey"
                )
                  .to.be.a("string")
                  .that.is.equal(HUDKey);
                expect(
                  parsedActionData.Data.Message,
                  "Failed on poll returning wrong message"
                )
                  .to.be.a("string")
                  .that.is.equal("withinHudTest");
                break;
              case "Hide":
                console.log(`withinHudTe$ter:: object for test:`);
                console.log(parsedActionData);
                expect(
                  parsedActionData.Data.State,
                  "Failed on returning the wrong state on HUD hide"
                )
                  .to.be.a("string")
                  .that.is.equal("Hide");
                expect(
                  parsedActionData.Data.HUDKey,
                  "Failed on hud returning wrong HUDKey"
                )
                  .to.be.a("string")
                  .that.is.equal(HUDKey);
                break;
              default:
                break;
            }
          });
          break;
        //barcode client actions functions test
        case "Barcode":
          it(`withinHudClientActionsTester - ${Type}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on Barcode client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("Barcode");
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
          });
          break;
        //hud client actions functions test
        case "GeoLocation":
          Title = parsedActionData.Data.Accuracy; //getting filter to test according to Accuracy
          it(`Client Actions Automation - ${Type} - ${Title}`, async () => {
            expect(
              parsedActionData,
              "Failed on actions data returning with the wrong type"
            ).to.be.an("object").that.is.not.undefined.and.null;
            expect(
              parsedActionData.Type,
              "Failed on CaptureGeo client action returning the wrong type"
            )
              .to.be.a("string")
              .that.is.equal("GeoLocation");
            expect(
              parsedActionData.Callback,
              "Failed on callback returning wrong value/type"
            )
              .to.be.a("string")
              .that.has.lengthOf(36);
            switch (Title) {
              case "Low":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("Low");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(1500);
                break;
              case "Medium":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("Medium");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(2000);
                break;
              case "High":
                expect(
                  parsedActionData.Data.Accuracy,
                  "Failed on Accuracy returning wrong value"
                )
                  .to.be.a("string")
                  .that.is.equal("High");
                expect(
                  parsedActionData.Data.MaxWaitTime,
                  "Failed on MaxWaitTime returning the wrong value"
                )
                  .to.be.a("number")
                  .that.is.equal(3000);
                break;
            }
          });
          break;
        default:
          break;
      }
    }
  });

  console.log("withinHudClientActionsTester::Test Finished");
  const testResults = await run();
  return testResults;
  // return {
  //   actions: arrActions,
  // };
}
//=====================Notifications==========================================
export async function notificationsPositive(client: Client, request: Request) {
  console.log(`notificationsPositive::Test Started`);
  const service = new MyService(client);
  const notificationService = new NotificationService(client);
  const { describe, it, expect, run } = Tester("My test");
  console.log(`notificationsPositive::Gotten services,initiating requests`);

  const notificationObj =
    await notificationService.generateRandomNotification();

  const notificationPost = await notificationService.postNotifications(
    notificationObj
  );
  //can test the post object against the original object;
  const notificationKey = notificationPost.Key as string;
  //get by key currently not working BLAT
  // const notificationGet = await notificationService.getNotificationByKey(
  //   notificationKey
  // );
  //temp function to implement the filte that is supposed to be done by Noam
  const notificationGet = await notificationService.getNotificationByKeyTemp(
    notificationKey
  );
  //Mark as read
  const markAsRead = await notificationService.markAsRead({
    Keys: [notificationKey],
  });

  const notificationGetAfterRead =
    await notificationService.getNotificationByKeyTemp(notificationKey);
  //some mocha to test if the Original + POSTED + Gotten objects are the same
  console.log(`notificationsPositive::Starting Mocha tests`);

  describe("Notifications Positive automation test", async () => {
    it("Post parsed test results", async () => {
      expect(
        notificationPost,
        "Failed on notification post returning wrong type"
      ).to.be.an("object").that.is.not.empty.and.undefined;
      expect(
        notificationPost.ModificationDateTime,
        "Failed on modificationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        notificationPost.CreationDateTime,
        "Failed on CreationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        notificationPost.Read,
        "Failed on Read returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        notificationPost.Title,
        "Failed on Title returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Title);
      expect(
        notificationPost.Body,
        "Failed on Body returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Body);
      expect(
        notificationPost.Hidden,
        "Failed on Hidden returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        notificationPost.CreatorUUID,
        "Failed on CreatorUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationPost.UserUUID,
        "Failed on UserUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationPost.Key,
        "Failed on Key returning the wrong value/type"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
    });

    it("Get parsed test results", async () => {
      expect(
        notificationGet,
        "Failed on notification get returning wrong type"
      ).to.be.an("object").that.is.not.empty.and.undefined;
      expect(
        notificationGet.ModificationDateTime,
        "Failed on modificationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        notificationGet.CreationDateTime,
        "Failed on CreationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        notificationGet.Read,
        "Failed on Read returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        notificationGet.Title,
        "Failed on Title returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Title);
      expect(
        notificationGet.Body,
        "Failed on Body returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Body);
      expect(
        notificationGet.Hidden,
        "Failed on Hidden returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        notificationGet.CreatorUUID,
        "Failed on CreatorUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationGet.UserUUID,
        "Failed on UserUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationGet.Key,
        "Failed on Key returning the wrong value/type"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
    });

    it("mark_as_read parsed test results", async () => {
      expect(markAsRead, "Failed on markAsRead get returning wrong type")
        .to.be.an("array")
        .that.is.not.empty.and.undefined.that.has.lengthOf.above(1);
      expect(
        markAsRead[0],
        "Failed on markAsRead get returning wrong type"
      ).to.be.an("object").that.is.not.empty.and.undefined;
      expect(
        markAsRead[0].ModificationDateTime,
        "Failed on modificationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        markAsRead[0].CreationDateTime,
        "Failed on CreationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        markAsRead[0].Read,
        "Failed on Read returning false instead of true"
      ).to.be.a("boolean").that.is.true;
      expect(
        markAsRead[0].Title,
        "Failed on Title returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Title);
      expect(
        markAsRead[0].Body,
        "Failed on Body returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Body);
      expect(
        markAsRead[0].Hidden,
        "Failed on Hidden returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        markAsRead[0].CreatorUUID,
        "Failed on CreatorUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        markAsRead[0].UserUUID,
        "Failed on UserUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(markAsRead[0].Key, "Failed on Key returning the wrong value/type")
        .to.be.a("string")
        .that.has.lengthOf(36);
    });

    it("Get after mark_as_read Parsed test results", async () => {
      expect(
        notificationGetAfterRead,
        "Failed on notificationGetAfterRead get returning wrong type"
      ).to.be.an("object").that.is.not.empty.and.undefined;
      expect(
        notificationGetAfterRead.ModificationDateTime,
        "Failed on modificationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24)
        .and.not.to.be.equal(notificationGet.ModificationDateTime);
      expect(
        notificationGetAfterRead.CreationDateTime,
        "Failed on CreationDateTime returning wrong type/value"
      )
        .to.be.a("string")
        .that.has.lengthOf(24);
      expect(
        notificationGetAfterRead.Read,
        "Failed on Read returning false instead of true"
      ).to.be.a("boolean").that.is.true;
      expect(
        notificationGetAfterRead.Title,
        "Failed on Title returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Title);
      expect(
        notificationGetAfterRead.Body,
        "Failed on Body returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.Body);
      expect(
        notificationGetAfterRead.Hidden,
        "Failed on Hidden returning true instead of false"
      ).to.be.a("boolean").that.is.false;
      expect(
        notificationGetAfterRead.CreatorUUID,
        "Failed on CreatorUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationGetAfterRead.UserUUID,
        "Failed on UserUUID returning the wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal(notificationObj.UserUUID);
      expect(
        notificationGetAfterRead.Key,
        "Failed on Key returning the wrong value/type"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
    });
  });
  console.log(`notificationsPositive::Test Ended`);
  // return {
  //   Base: notificationObj,
  //   Post: notificationPost,
  //   Get: notificationGet,
  //   mark_as_read: markAsRead,
  //   GetAfterRead: notificationGetAfterRead,
  // };

  const testResults = await run();
  return testResults;
}

export async function notificationsNegative(client: Client, request: Request) {
  console.log(`notificationsPositive::Test Started`);
  const service = new MyService(client);
  const notificationService = new NotificationService(client);
  const { describe, it, expect, run } = Tester("My test");
  console.log(`notificationsPositive::Gotten services,initiating requests`);
  //remarked sections are sections for bugs/future changes

  describe("Notifications Negative automation test", async () => {
    it("notifications Post negative tests", async () => {
      try {
        const notificationObj1 =
          await notificationService.generateNegativeNotification(
            "Title-number"
          );
        const notificationWithNumberTitle =
          await notificationService.postNotificationsNegative(notificationObj1);
        console.log(notificationWithNumberTitle);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on Title sent as number returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: Title is not of a type(s) string","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
      // try {
      //   const notificationObj2 =
      //     await notificationService.generateNegativeNotification("Body-removed");
      //   const notificationWithNoBody =
      //     await notificationService.postNotificationsNegative(notificationObj2);
      //   console.log(notificationWithNoBody);
      // } catch (e) {
      //   console.log(e);
      // }
      try {
        const notificationObj3 =
          await notificationService.generateNegativeNotification("Body-number");
        const notificationWithNumberBody =
          await notificationService.postNotificationsNegative(notificationObj3);
        console.log(notificationWithNumberBody);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on Body sent as number returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: Body is not of a type(s) string","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
      try {
        const notificationObj4 =
          await notificationService.generateNegativeNotification(
            "User-removed"
          );
        const notificationWithNoUser =
          await notificationService.postNotificationsNegative(notificationObj4);
        console.log(notificationWithNoUser);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on empty UserUUID sent returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: UserUUID is required","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
      try {
        const notificationObj5 =
          await notificationService.generateNegativeNotification("User-number");
        const notificationWithNumberUser =
          await notificationService.postNotificationsNegative(notificationObj5);
        console.log(notificationWithNumberUser);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on number UserUUID sent returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: UserUUID is not of a type(s) string","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
      // try {
      //   const notificationObj6 =
      //     await notificationService.generateNegativeNotification("Read-removed"); // known bug DI-19974
      //   const notificationWithReadRemoved =
      //     await notificationService.postNotificationsNegative(notificationObj6);
      //   console.log(notificationWithReadRemoved);
      // } catch (e) {
      //   console.log(e);
      // }
      try {
        const notificationObj7 =
          await notificationService.generateNegativeNotification("Read-number");
        const notificationWithReadNumber =
          await notificationService.postNotificationsNegative(notificationObj7);
        console.log(notificationWithReadNumber);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on number Read sent returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: Read is not of a type(s) boolean","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
      // try {
      //   const notificationObj8 =
      //     await notificationService.generateNegativeNotification("Read-string");
      //   const notificationWithReadString =
      //     await notificationService.postNotificationsNegative(notificationObj8);
      // } catch (e) {
      //   e instanceof Error ? expect(
      //     e.message,
      //     "Failed on string Read sent returning wrong exception"
      //   )
      //     .to.be.a("string")
      //     .that.is.equal(
      //       'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: Read is not of a type(s) boolean","detail":{"errorcode":"BadRequest"}}}'
      //     ) : null;
      // }
      try {
        const notificationObj9 =
          await notificationService.generateNegativeNotification("all-wrong");
        const notificationWithAllWrong =
          await notificationService.postNotificationsNegative(notificationObj9);
      } catch (e) {
        e instanceof Error
          ? expect(
              e.message,
              "Failed on all wrong parameters sent returning wrong exception"
            )
              .to.be.a("string")
              .that.is.equal(
                'https://papi.staging.pepperi.com/V1.0/notifications failed with status: 400 - Bad Request error: {"fault":{"faultstring":"Failed due to exception: Title is not of a type(s) string\\nBody is not of a type(s) string\\nUserUUID is not of a type(s) string\\nRead is not of a type(s) boolean","detail":{"errorcode":"BadRequest"}}}'
              )
          : null;
      }
    });
    it("mark_as_read negative tests", async () => {
      const markAsReadNoKey = await notificationService.markAsRead({
        Keys: ["value-that-does-not-exist"],
      });
      expect(
        markAsReadNoKey,
        "Failed on mark_as_read with no key returning wrong output"
      )
        .to.be.an("array")
        .with.lengthOf(0);

      const markAsReadWithNumber = await notificationService.markAsRead({
        Keys: [Math.random() * 100],
      });
      console.log(markAsReadWithNumber); // bug returns [] DI-19988

      const notificationForOtherUser =
        await notificationService.generateRandomNotification("Rep1");
      const postNotification = await notificationService.postNotifications(
        notificationForOtherUser
      );

      const markAsReadForOtherUser = await notificationService.markAsRead({
        Keys: [postNotification.Key],
      });
      console.log(markAsReadForOtherUser); // bug returns successful DI-19990
    });
  });

  //need to add test cases for mark_as_read
  const testResults = await run();
  return testResults;
}
