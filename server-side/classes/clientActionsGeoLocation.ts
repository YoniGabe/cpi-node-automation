import ClientActionBase from "./clientActionsBase";

/** account geo data for tests */
interface accountGeoData {
  City: string;
  Country: string;
  Street: string;
  Latitude?: number;
  Longtitude?: number;
}

const accountData1: accountGeoData = {
  City: "Havelberg",
  Country: "Germany",
  Street: "Pritzwalker Str.70",
  Latitude: 52.83634,
  Longtitude: 12.0816,
};

const accountData2: accountGeoData = {
  City: "Rostock",
  Country: "Germany",
  Street: "Seidenstraße 5",
  Latitude: 54.0902,
  Longtitude: 12.14491,
};

const accountData3: accountGeoData = {
  City: "Wedemark",
  Country: "Germany",
  Street: "Langer Acker 1",
  Latitude: 52.51669,
  Longtitude: 9.73096,
};

const accountData4: accountGeoData = {
  City: "Radeberg",
  Country: "Germany",
  Street: "Pulsnitzer Str. 33",
  Latitude: 51.12013,
  Longtitude: 13.92224,
};

const accounDataArr: accountGeoData[] = [
  accountData1,
  accountData2,
  accountData3,
  accountData4,
];

export default class ClientActionGeoLocationTest extends ClientActionBase {
  async Test(data): Promise<{ success: boolean; resObject: any }> {
    const Data = JSON.parse(data);
    const randIndex = Math.floor(Math.random() * 3) + 1;
    const randAccuracy = Math.floor(Math.random() * 100) + 1;
    return {
      success: Data.Success,
      resObject: {
        Success: Data.Success,
        Lontitude: accounDataArr[randIndex].Longtitude,
        Latitude: accounDataArr[randIndex].Latitude,
        Accuracy: randAccuracy,
      },
    };
  }

  async NegativeTest(data: any): Promise<{ success: boolean; resObject: any }> {
    return {
      success: false,
      resObject: {
        Success: false,
        Lontitude: 0,
        Latitude: 0,
        Accuracy: 0,
      },
    };
  }
}
