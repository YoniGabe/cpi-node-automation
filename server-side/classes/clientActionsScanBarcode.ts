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
}
