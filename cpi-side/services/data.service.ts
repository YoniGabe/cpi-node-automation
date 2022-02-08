import generalService from "./general.service";

/** A list of events */
export enum OCEvents {
  Recalculate = "RecalculateUIObject",
  SetField = "SetFieldValue",
  Increment = "IncrementFieldValue",
  Decrement = "DecrementFieldValue",
  Button = "TSAButtonPressed",
  preLoad = "PreLoadTransactionScope",
  onLoad = "OnLoadTransactionScope",
}
/** A list of Order Center Data Views */
const OC_DATA_VIEWS: string[] = [
  "OrderCenterGrid", //gridview
  "OrderCenterView1", //cards
  "OrderCenterView2", //Small
  "OrderCenterView3", //Medium
  "OrderCenterItemFullPage",
  "OrderCenterVariant",
  "OrderCenterBarcodeGridline",
  "OrderCenterBarcodeLinesView",
  "OrderCenterItemDetails",
];
/** A list of Cart Data Views */
const CART_DATA_VIEWS: string[] = ["OrderCartGrid", "OrderCartView1"];
/** A list of GL/general UIObject Data Views */
export const GENERIC_DATA_VIEWS: dataType = {
  ListView: "ListView",
  UserHomePage: "UserHomePage",
};
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

export const accounDataArr: accountGeoData[] = [
  accountData1,
  accountData2,
  accountData3,
  accountData4,
];

interface dataType {
  [key: string]: string;
}

//FieldType KVP object
export const fieldTypeObj: dataType = {
  None: "None",
  TextBox: "TextBox",
  LimitedLengthTextBox: "LimitedLengthTextBox",
  TextArea: "TextArea",
  TextHeader: "TextHeader",
  Date: "Date",
  DateAndTime: "DateAndTime",
  NumberInteger: "NumberInteger",
  NumberReal: "NumberReal",
  Currency: "Currency",
  Boolean: "Boolean",
  ComboBox: "ComboBox",
  MultiTickBox: "MultiTickBox",
  Separator: "Separator",
  Address: "Address",
  Percentage: "Percentage",
  EmptyComboBox: "EmptyComboBox",
  InternalLink: "InternalLink",
  Email: "Email",
  LimitedDate: "LimitedDate",
  Image: "Image",
  MultiTickBoxToComboBox: "MultiTickBoxToComboBox",
  EmptyMultiTickBox: "EmptyMultiTickBox",
  Totals: "Totals",
  Attachment: "Attachment",
  Signature: "Signature",
  Link: "Link",
  ImageURL: "ImageURL",
  NumberIntegerQuantitySelector: "NumberIntegerQuantitySelector",
  NumberRealQuantitySelector: "NumberRealQuantitySelector",
  NumberIntegerForMatrix: "NumberIntegerForMatrix",
  NumberRealForMatrix: "NumberRealForMatrix",
  Images: "Images",
  Indicators: "Indicators",
  CalculatedReal: "CalculatedReal",
  CalculatedInt: "CalculatedInt",
  CalculatedString: "CalculatedString",
  CalculatedDate: "CalculatedDate",
  CalculatedBool: "CalculatedBool",
  MapDataDropDown: "MapDataDropDown",
  MapDataReal: "MapDataReal",
  MapDataString: "MapDataString",
  MapDataInt: "MapDataInt",
  Sum: "Sum",
  Phone: "Phone",
  UrlForApi: "UrlForApi",
  ManyToManyUrlForApi: "ManyToManyUrlForApi",
  ReferenceType: "ReferenceType",
  GuidReferenceType: "GuidReferenceType",
  Button: "Button",
  UIControlFieldType_InternalPage: "UIControlFieldType_InternalPage",
  Duration: "Duration",
  ListOfObjects: "ListOfObjects",
  Package: "Package",
  RelatedObjectsCards: "RelatedObjectsCards",
  BooleanText: "BooleanText",
};
/**ScreenSize object */
export const screenSize: dataType = {
  Tablet: "Tablet",
  Phablet: "Phablet",
  Landscape: "Landscape",
};

export const addonUUID = "2b39d63e-0982-4ada-8cbb-737b03b9ee58";

export const adalTableName = "Load_Test";

//service setup for test variables
const service = new generalService();
//**Test data variables - class and getters */
export default class DataService {
  constructor() {}
  //**Test data variables GETTERS*/
  async getAccountGeoIndex() {
    const accountGeoIndex = await service.randGenerator(0, 3);
    return accountGeoIndex;
  }

  async getRandZip() {
    const randZip = await service.randGenerator(1, 100000);
    return randZip;
  }

  async getRandDiscount() {
    const randDiscount = Math.random();
    return randDiscount;
  }

  async getRandPhone() {
    const randPhone = Math.floor(Math.random() * 1000000).toString();
    return randPhone;
  }

  async getQuantitiesTotal() {
    const quantitiesTotal = await service.randGenerator(1, 200);
    return quantitiesTotal;
  }

  async getEmail() {
    const userEmail =
      "Email" +
      Math.floor(Math.random() * 1000000).toString() +
      "@" +
      Math.floor(Math.random() * 1000000).toString() +
      ".com";
    return userEmail;
  }

  async getName() {
    const name = "Tony Stark";
    return name;
  }

  async getPhrase() {
    const phrase = "I am Iron Man ";
    return phrase;
  }

  async getRandBool() {
    const randBool = Math.random() < 0.5;
    return randBool;
  }

  async getExID() {
    const ExID =
      "CPINode testing " + Math.floor(Math.random() * 1000000).toString();
    return ExID;
  }

  async getRand30() {
    const rand30 = await service.randGenerator(1, 30);
    return rand30;
  }

  async getRand60() {
    const rand60 = await service.randGenerator(31, 60);
    return rand60;
  }

  async getRand90() {
    const rand90 = await service.randGenerator(61, 90);
    return rand90;
  }

  async getRandAbove() {
    const randAbove = await service.randGenerator(91, 1000);
    return randAbove;
  }

  async getDate() {
    const date = new Date().toISOString();
    return date;
  }

  async getDateTime(date, time?, removeChar?) {
    let dateTime: string;
    time
      ? (dateTime = await service.dateFormatter(date, time))
      : (dateTime = await service.dateFormatter(date));
    return dateTime;
  }

  async getDateOnly(date) {
    const dateOnly = await service.dateFormatter(date);
    return dateOnly;
  }

  async getLink() {
    const link = "https://amphibiaweb.org/species/7276";
    return link;
  }

  async getHTML() {
    const HTML =
      "<h1>This is an HTMLFormattedTextField</h1><hr/><p>and it works,<b>even for bold</b></p><hr/>";
    return HTML;
  }

  async getRandDays() {
    const randDays = await service.randGenerator(10, 100);
    return randDays;
  }
}
