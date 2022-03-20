import ClientActionBase from "./clientActionsBase";

export default class ClientActionBarcodeScanTest extends ClientActionBase {
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    return {
      success: Data.Success,
      resObject: {
        Success: Data.Success,
        Barcode: 12345678,
        ErrorMessage: "",
      },
    };
  }

  async NegativeTest(data: any): Promise<{ success: boolean; resObject: any }> {
    return {
      success: false,
      resObject: {
        Success: false,
        Barcode: 910111213,
        ErrorMessage: "Failure for automation test",
      },
    };
  }
}
