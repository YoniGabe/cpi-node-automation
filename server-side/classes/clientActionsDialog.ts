import ClientActionBase from "./clientActionsBase";
//client actions class including responses for Dialog client actions
export default class ClientActionDialogTest extends ClientActionBase {
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    const Value = JSON.parse(Data.Value);
    //response below is according to dialog responses:
    //https://pepperi-addons.github.io/client-actions-docs/actions/dialog.html
    return {
      success: Data.Success,
      resObject: {
        SelectedAction: Value.Data.Actions[0].Key, // need to test
      },
    };
  }

  async NegativeTest(data: any): Promise<{ success: boolean; resObject: any }> {
    return {
      success: false,
      resObject: {
        SelectedAction: "rand-negative-string-for-test",
      },
    };
  }
}
