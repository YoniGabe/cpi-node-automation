import { PapiClient } from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import fetch from "node-fetch";
import ClientActionBase from "../classes/clientActionsBase";
import ClientActionDialogTest from "../classes/clientActionsDialog";

class ClientActionsService {
  papiClient: PapiClient;

  constructor(private client: Client) {
    this.papiClient = new PapiClient({
      baseURL: client.BaseURL,
      token: client.OAuthAccessToken,
      addonSecretKey: client.AddonSecretKey,
      addonUUID: client.AddonUUID,
    });
  }

  async EmitEvent(webAPIBaseURL: string, accessToken: string, options) {
    //webapi.sandbox.pepperi.com/16.80.3/webapi/Service1.svc/v1/
    const URL = `${webAPIBaseURL}/Service1.svc/v1/EmitEvent`;
    const EmitEvent = await (
      await fetch(URL, {
        method: "POST",
        body: JSON.stringify(options),
        headers: {
          PepperiSessionToken: accessToken,
          "Content-Type": "application/json",
        },
      })
    ).json();
    return EmitEvent;
  }
  
  async EmitClientEvent(webAPIBaseURL: string, accessToken: string, options) {
    let res = await this.EmitEvent(webAPIBaseURL, accessToken, options);
    console.log(res);
    //stop condition
    if (res.Value === {}) {
        return;
    }
    let action = (await this.generateClientAction(res)) as ClientActionBase;
    console.log(action); // returns undefined
    const resTest = await action.Test(action.Data);
    let result = resTest.resObject;
    const testedOPtions = {
      EventKey: res.Value.callback,
      EventData: result,
    };
    console.log(testedOPtions);
    await this.EmitClientEvent(webAPIBaseURL, accessToken, testedOPtions);
  }

  async generateClientAction(data: any): Promise<ClientActionBase> {
      debugger;
    const Data = JSON.parse(data);
    const actionType = Data.Value.Type;
    let action;
    switch (actionType) {
      case "Dialog":
        action = new ClientActionDialogTest(Data,actionType);
        break;

      default:
        break;
    }
    return action;
  }
}

export default ClientActionsService;
