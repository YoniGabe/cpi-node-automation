import ClientActionBase, { actionsTestData } from "./clientActionsBase";

export default class ClientActionDialogTest extends ClientActionBase {

  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    // do stuff of test.....
    actionsTestData.set(data.Value.callback,data);
    return {
      success: Data.Success,
      resObject: {
        SelectedAction: Data.Value.callback,
      },
    };
  }
}
