import {
  PapiClient,
  InstalledAddon,
  FindOptions,
} from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import fetch from "node-fetch";
import jwtDecode from "jwt-decode";

class ScriptService {
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

  //POST {CPAS_BASE_URL}/addons/api/ADDONUUID/addon-cpi/:key/run
  //Body
  // {
  //     // the script params
  //     "Data": {}
  // }
  //results
  // {
  //     "Result": {}
  // }
  
  async runSimpleScript(
    webAPIBaseURL: string,
    accessToken: string,
    scriptKey: string,
    Data: Object
  ) {
    //need fetch that will be replaced by papi.post once the url's will stabilize
    let URL = `${webAPIBaseURL}/Service1.svc/v1/Addon/Api/9f3b727c-e88c-4311-8ec4-3857bc8621f3/addon-cpi/${scriptKey}/run`;

    const scriptResults = await (
      await fetch(URL, {
        method: "POST",
        body: JSON.stringify(Data),
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return scriptResults;
  }

  async runScriptByNewEvent() {}

  //get list of scripts https://papi.pepperi.com/v1.0/scripts NOT CURENTLY
  //USE https://{{server}}.pepperi.com/v1.0/addons/api/9f3b727c-e88c-4311-8ec4-3857bc8621f3/api/scripts
  // [
  //     {
  //         // Standard Resource fields
  //         // CreationDateTime, ModificationDateTime, Hidden

  //         // UUID - created if none is sent
  //         "Key": "26d490a7-7e37-448e-b744-6e18998b0409",

  //         // display name
  //         "Name": "",

  //         // optional
  //         "Description": "",

  //         // mandatory
  //         // A Typescript module text that is compiled an run by the
  //         // scripts addon
  //         "Code": ""
  //     }
  // ]
  async getAllScripts() {
    const res = await this.papiClient.get(
      `/addons/api/9f3b727c-e88c-4311-8ec4-3857bc8621f3/api/scripts`
    );
    return res;
  }

  async getScriptsWithFindOptions(findOptions: FindOptions) {
    let url = `/addons/api/9f3b727c-e88c-4311-8ec4-3857bc8621f3/api/scripts?`;
    const obj = findOptions;
    for (const [key, value] of Object.entries(obj)) {
      url.includes("=")
        ? (url = url + `&${key}=${value.toString()}`)
        : (url = url + `${key}=${value.toString()}`);
    }
    const res = await this.papiClient.get(url);
    return res;
  }

  async getScriptByKey(key: string) {
    //const res = this.papiClient.get()
    const res = await this.papiClient.get(
      `/addons/api/9f3b727c-e88c-4311-8ec4-3857bc8621f3/api/scripts?key=${key}`
    );
    return res;
  }
}

export default ScriptService;
