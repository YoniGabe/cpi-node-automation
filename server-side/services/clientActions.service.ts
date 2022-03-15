import { PapiClient } from "@pepperi-addons/papi-sdk";
import { Client } from "@pepperi-addons/debug-server";
import fetch from "node-fetch";
import ClientActionBase from "../classes/clientActionsBase";
import ClientActionDialogTest from "../classes/clientActionsDialog";
import ClientActionGeoLocationTest from "../classes/clientActionsGeoLocation";
import ClientActionBarcodeScanTest from "../classes/clientActionsScanBarcode";
import ClientActionHUDTest from "../classes/clientActionsHUD";

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
    const map = global["map"] as Map<string, any>;
    let res = await this.EmitEvent(webAPIBaseURL, accessToken, options);
    const parsedActions = JSON.parse(res.Value);
    console.log(parsedActions);
    const Type = parsedActions.Type;
    //stop condition -- if actions returns empty recurssion returns to the previous iteration
    if (Object.entries(parsedActions).length === 0) {
      return;
    } // note that the callback EmitEvent does not return any values;
    let action = (await this.generateClientAction(res)) as ClientActionBase;
    const parsedData = await this.parseActionDataForTest(action.Data);
    switch (Type) {
      case "Dialog":
        map.set(parsedData.Data.Actions[0].key, action.Data);
        break;
      case "GeoLocation":
        map.set(parsedActions.callback, action.Data);
        break;
      case "Barcode":
        map.set(parsedActions.callback, action.Data);
        break;
      case "HUD":
        map.set(parsedActions.callback, action.Data);
        const checkGlobal = global["HUDKey"];
        if (checkGlobal === undefined) {
          global["HUDKey"] = await this.GenerateGuid();
        }
        break;
      default:
        break;
    }
    const resTest = await action.Test(action.Data);
    let result = resTest.resObject;
    const testedOPtions = {
      EventKey: parsedActions.callback,
      EventData: JSON.stringify(result),
    };
    global["map"] = map;
    await this.EmitClientEvent(webAPIBaseURL, accessToken, testedOPtions);
  }

  async generateClientAction(data: any): Promise<ClientActionBase> {
    const Data = data;
    const value = JSON.parse(Data.Value);
    const actionType = value.Type;
    let action;
    switch (actionType) {
      case "Dialog":
        action = new ClientActionDialogTest(Data, actionType);
        break;
      case "Barcode":
        action = new ClientActionBarcodeScanTest(Data, actionType);
        break;
      case "GeoLocation":
        action = new ClientActionGeoLocationTest(Data, actionType);
        break;
      case "HUD":
        action = new ClientActionHUDTest(Data, actionType);
        break;
      default:
        break;
    }
    return action;
  }

  async parseActionDataForTest(Data: any) {
    const parsedData = JSON.parse(Data);
    const parsedValue = JSON.parse(parsedData.Value);
    return parsedValue;
  }

  //for generating a new UUID
  async GenerateGuid(): Promise<string> {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

export default ClientActionsService;
