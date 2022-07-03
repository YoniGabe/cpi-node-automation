import ClientActionBase from "./clientActionsBase";
//response class for navigate client action:
//https://pepperi-addons.github.io/client-actions-docs/actions/navigation.html
export default class ClientActionDialogTest extends ClientActionBase {
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    const Value = JSON.parse(Data.Value);
    return {
      success: Data.Success,
      resObject: {
        
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