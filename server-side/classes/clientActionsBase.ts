
export default class ClientActionBase {
  Data: string;
  Type: string;

  constructor(Data: string, Type: string) {
    this.Data = JSON.stringify(Data);
    this.Type = Type;
  }
  //implementation for base class - inherting classes won't get here;
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    return {
      success: data.Success,
      resObject: {
        SelectedAction: data.Value.callback,
      },
    };
  }

  async NegativeTest(data): Promise<{success: boolean,resObject:any}> {
    return {
      success: data.Success,
      resObject: {
        SelectedAction: data.Value.callback,
      },
    };
  }

}
