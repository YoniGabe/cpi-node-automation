import ClientActionBase from "./clientActionsBase";

export default class ClientActionHUDTest extends ClientActionBase {
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    const Value = JSON.parse(Data.Value);
    const state = Value.Data.State;
    let returnObj = { success: Data.Success, resObject: {} };

    switch (state) {
      case "Show":
        const HUDKey = (await global["HUDKey"].toUpperCase()) as string;
        returnObj = {
          success: Data.Success,
          resObject: { Success: Data.Success, HUDKey: HUDKey },
        };
        break;
      case "Poll":
        returnObj = {
          success: Data.Success,
          resObject: { Success: Data.Success },
        };
        break;
      case "Hide":
        returnObj = {
          success: Data.Success,
          resObject: { Success: Data.Success },
        };
        break;
      default:
        break;
    }

    return returnObj;
  }
}
