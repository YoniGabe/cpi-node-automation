import "@pepperi-addons/cpi-node";
import Tester from "./tester";
import {
  Account,
  Transaction,
  UIDetailsPage,
  UIField,
  UIObject,
} from "@pepperi-addons/cpi-node/build/cpi-side/app/entities";
import { GeneralActivity, TransactionLine } from "@pepperi-addons/cpi-node";
import { stat } from "fs";

/** A list of events */
const EVENT_NAMES: string[] = [
  "RecalculateUIObject",
  "SetFieldValue",
  "IncrementFieldValue",
  "DecrementFieldValue",
  "TSAButtonPressed",
];
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
const GENERIC_DATA_VIEWS: dataType = {
  ListView: "ListView",
  UserHomePage: "UserHomePage",
};
//account geo data for tests
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

interface dataType {
  [key: string]: string;
}
//Interface for dataAndFieldTypeMapObj
interface dataAndFieldTypeMap {
  [key: string]: string[];
}
//Interface for getUIFields func  -- not in use
interface fieldKVPair {
  [key: string]: UIField | string;
}
//Data and Field type aggregator
const dataAndFieldTypeMapObj: dataAndFieldTypeMap = {
  None: ["None"],
  String: [
    "TextBox",
    "LimitedLengthTextBox",
    "TextArea",
    "TextHeader",
    "CalculatedString",
    "MapDataString",
    "Email",
    "Phone",
    "Link",
    "None",
  ],
  Bool: ["Boolean", "BooleanText", "CalculatedBool"],
  Date: ["Date", "LimitedDate", "CalculatedDate"],
  DateTime: ["DateAndTime"],
  Integer: [
    "NumberInteger",
    "NumberIntegerQuantitySelector",
    "NumberIntegerForMatrix",
    "Duration",
    "CalculatedInt",
    "MapDataInt",
  ],
  Double: [
    "NumberReal",
    "NumberRealQuantitySelector",
    "NumberRealForMatrix",
    "CalculatedReal",
    "MapDataReal",
    "Currency",
  ],
  MultipleStringValues: [
    "MultiTickBoxToComboBox",
    "EmptyMultiTickBox",
    "MapDataDropDown",
  ],
};
//DataType KVP object
const dataTypeObj: dataType = {
  None: "None",
  Date: "Date",
  Bool: "Bool",
  JsonBool: "JsonBool",
  Integer: "Integer",
  Double: "Double",
  String: "String",
  DateTime: "DateTime",
  MultipleStringValues: "MultipleStringValues",
  Guid: "Guid",
  SingleStringValue: "SingleStringValue",
  ObjectRef: "ObjectRef",
};
//FieldType KVP object
const fieldTypeObj: dataType = {
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
//ScreenSize object
const screenSize: dataType = {
  Tablet: "Tablet",
  Phablet: "Phablet",
  Landscape: "Landscape",
};

//Test data variables
let accountGeoIndex: number;
let randZip: number;
let randDiscount: number;
let randPhone: string;
let quantitiesTotal;
let userEmail: string;
let name: string;
let phrase: string;
let randBool: boolean;
let ExID: string;
let rand30: number;
let rand60: number;
let rand90: number;
let randAbove: number;
let date;
let dateTime;
let dateOnly;
let link: string;
let HTML: string;
let randDays: number;

//randGenerator for numeric fields
function randGenerator(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Data and field aggregator check -- not in use
async function dataFieldTypeAggregator(dataType: string, fieldType: string) {
  if (dataType && fieldType) {
    return dataAndFieldTypeMapObj[dataType].includes(fieldType);
  }
}
//getUIFields in bulk -- not in use
async function getUIFields(uiObject: UIObject) {
  let uiFieldsArr: UIField[] = uiObject.fields;
  let getArr = new Map<string, string>();
  uiFieldsArr.forEach(async (field) => {
    if (field.fieldID !== undefined) {
      const getUIField = await uiObject.getUIField(field.fieldID!);
      if (getUIField !== undefined) {
        getArr.set(
          field.fieldID,
          "type is:" +
            getUIField.type +
            " and formattedValue is:" +
            getUIField.formattedValue +
            " value:" +
            getUIField.value
        );
      }
    }
  });
  if (getArr!) {
    return getArr;
  }
  return undefined;
}
//initiates test data for all objects
async function initTestData(
  dataObject: Transaction | TransactionLine | Account | GeneralActivity,
  resource: string
): Promise<
  Transaction | TransactionLine | Account | GeneralActivity | undefined
> {
  switch (resource) {
    //init Transaction for automation test
    case "transactions": {
      //SET for TSA's
      await dataObject?.setFieldValue(
        "TSASingleLineText",
        phrase + randDiscount
      );

      await dataObject?.setFieldValue(
        "TSALimitedLineText",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSAParagraphText",
        phrase + randDiscount
      );

      await dataObject?.setFieldValue("TSADateField", dateOnly);
      await dataObject?.setFieldValue("TSADateTimeField", date);
      await dataObject?.setFieldValue(
        "TSADecimalField",
        randDiscount.toFixed(6)
      );
      await dataObject?.setFieldValue("TSANumberField", quantitiesTotal);
      await dataObject?.setFieldValue("TSACurrencyField", quantitiesTotal);
      await dataObject?.setFieldValue("TSACheckboxField", randBool);
      await dataObject?.setFieldValue("TSAEmailField", userEmail);
      await dataObject?.setFieldValue("TSAPhoneField", randPhone);
      await dataObject?.setFieldValue("TSALinkField", link);
      await dataObject?.setFieldValue("TSAHTMLField", HTML);
      //SET for system fields
      await dataObject?.setFieldValue("ExternalID", ExID);
      await dataObject?.setFieldValue("Remark", phrase);
      await dataObject?.setFieldValue("DiscountPercentage", randDiscount);
      await dataObject?.setFieldValue("BillToName", name);
      await dataObject?.setFieldValue(
        "BillToStreet",
        accounDataArr[accountGeoIndex].Street
      );
      await dataObject?.setFieldValue(
        "BillToCity",
        accounDataArr[accountGeoIndex].City
      );
      await dataObject?.setFieldValue("BillToZipCode", randZip);
      await dataObject?.setFieldValue("BillToPhone", randPhone);
      await dataObject?.setFieldValue("QuantitiesTotal", quantitiesTotal);
      await dataObject?.setFieldValue("DeliveryDate", dateOnly);
      await dataObject?.setFieldValue("Status", 2);
      await dataObject?.setFieldValue(
        "SubmissionGeoCodeLAT",
        accounDataArr[accountGeoIndex].Latitude
      );
      await dataObject?.setFieldValue(
        "SubmissionGeoCodeLNG",
        accounDataArr[accountGeoIndex].Longtitude
      );
      await dataObject?.setFieldValue("ShipToName", name);
      await dataObject?.setFieldValue(
        "ShipToStreet",
        accounDataArr[accountGeoIndex].Street
      );
      await dataObject?.setFieldValue(
        "ShipToCity",
        accounDataArr[accountGeoIndex].City
      );
      await dataObject?.setFieldValue("ShipToZipCode", randZip);
      await dataObject?.setFieldValue("SubTotal", randZip);
      await dataObject?.setFieldValue(
        "SubTotalAfterItemsDiscount",
        randZip * randDiscount
      );
      await dataObject?.setFieldValue(
        "GrandTotal",
        randZip * randDiscount * quantitiesTotal
      );
    }
    //init accounts for automation test
    case "accounts": {
      await dataObject?.setFieldValue("TSACheckboxAcc", randBool);
      await dataObject?.setFieldValue("TSACurrencyAcc", quantitiesTotal);
      await dataObject?.setFieldValue("TSANumberAcc", quantitiesTotal);
      await dataObject?.setFieldValue("TSADateAcc", dateOnly);
      await dataObject?.setFieldValue("TSADateTimeAcc", date);
      await dataObject?.setFieldValue("TSADecimalAcc", randDiscount.toFixed(6));
      await dataObject?.setFieldValue("TSAEmailAcc", userEmail);
      await dataObject?.setFieldValue("TSAHTMLAcc", HTML);
      await dataObject?.setFieldValue(
        "TSALimitedLineTextAcc",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSAParagraphTextAcc",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSASingleLineTextAcc",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue("TSALinkAcc", link);
      await dataObject?.setFieldValue("TSAPhoneAcc", randPhone);
      await dataObject?.setFieldValue("ExternalID", ExID);
      await dataObject?.setFieldValue(
        "City",
        accounDataArr[accountGeoIndex].City
      );
      await dataObject?.setFieldValue("Debts30", rand30);
      await dataObject?.setFieldValue("Debts60", rand60);
      await dataObject?.setFieldValue("Debts90", rand90);
      await dataObject?.setFieldValue("DebtsAbove90", randAbove);
      await dataObject?.setFieldValue("Discount", randDiscount);
      await dataObject?.setFieldValue("Fax", randPhone);
      await dataObject?.setFieldValue(
        "Latitude",
        accounDataArr[accountGeoIndex].Latitude
      );
      await dataObject?.setFieldValue(
        "Longitude",
        accounDataArr[accountGeoIndex].Longtitude
      );
      await dataObject?.setFieldValue("Mobile", randPhone);
      await dataObject?.setFieldValue("Phone", randPhone);
      await dataObject?.setFieldValue("Name", name);
      await dataObject?.setFieldValue("Note", phrase + randZip);
      await dataObject?.setFieldValue("ZipCode", randZip);
      await dataObject?.setFieldValue("Status", 2);
      await dataObject?.setFieldValue(
        "Street",
        accounDataArr[accountGeoIndex].Street
      );
    }
    //init activities for automation test
    case "activities": {
      await dataObject?.setFieldValue(
        "TSASingleLineTextACT",
        phrase + randDiscount
      );

      await dataObject?.setFieldValue(
        "TSALimitedLineTextACT",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSAParagraphTextACT",
        phrase + randDiscount
      );

      await dataObject?.setFieldValue("TSADateACT", dateOnly);
      await dataObject?.setFieldValue("TSADateTimeACT", date);
      await dataObject?.setFieldValue("TSADecimalACT", randDiscount.toFixed(6));
      await dataObject?.setFieldValue("TSANumberACT", quantitiesTotal);
      await dataObject?.setFieldValue("TSACurrencyACT", quantitiesTotal);
      await dataObject?.setFieldValue("TSACheckboxACT", randBool);
      await dataObject?.setFieldValue("TSAEmailACT", userEmail);
      await dataObject?.setFieldValue("TSAPhoneACT", randPhone);
      await dataObject?.setFieldValue("TSALinkACT", link);
      await dataObject?.setFieldValue("TSAHTMLACT", HTML);
      await dataObject?.setFieldValue("ExternalID", ExID);
      await dataObject?.setFieldValue("Status", 2);
      await dataObject?.setFieldValue("Title", phrase);
      await dataObject?.setFieldValue(
        "SubmissionGeoCodeLAT",
        accounDataArr[accountGeoIndex].Latitude
      );
      await dataObject?.setFieldValue(
        "SubmissionGeoCodeLNG",
        accounDataArr[accountGeoIndex].Longtitude
      );
      await dataObject?.setFieldValue("PlannedDuration", randDays);
    }
    //init transaction_lines for automation test
    case "transaction_lines": {
      await dataObject?.setFieldValue("UnitDiscountPercentage", randDiscount);
      await dataObject?.setFieldValue(
        "UnitPriceAfterDiscount",
        randZip * randDiscount
      );
      await dataObject?.setFieldValue(
        "TotalUnitsPriceAfterDiscount",
        randDiscount * randZip * quantitiesTotal
      );
      await dataObject?.setFieldValue("DeliveryDate", dateOnly);
      await dataObject?.setFieldValue("LineNumber", accountGeoIndex + 1);
      await dataObject?.setFieldValue("UnitsQuantity", quantitiesTotal);
      await dataObject?.setFieldValue("UnitPrice", randZip);
      //================================TSA's==================================
      await dataObject?.setFieldValue("TSACheckboxLines", randBool);
      await dataObject?.setFieldValue("TSACurrencyLines", quantitiesTotal);
      await dataObject?.setFieldValue("TSADateLines", dateOnly);
      await dataObject?.setFieldValue("TSADateTimeLines", dateTime + "Z");
      await dataObject?.setFieldValue(
        "TSADecimalNumberLines",
        randDiscount.toFixed(6)
      );
      await dataObject?.setFieldValue("TSANumberLines", quantitiesTotal);
      await dataObject?.setFieldValue(
        "TSALimitedLineTextLines",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSAParagraphTextLines",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue(
        "TSASingleLineTextLines",
        phrase + randDiscount
      );
      await dataObject?.setFieldValue("TSAEmailLines", userEmail);
      await dataObject?.setFieldValue("TSALinkLines", link);
      await dataObject?.setFieldValue("TSAHTMLLines", HTML);
    }
  }
  return dataObject;
}

async function initTestUIData(uiObject: UIObject, testResource: string) {} // need to see if its needed

//formats date to ISO
function dateFormatter(date: string, time?: boolean, removeChar?: boolean) {
  if (time) {
    let concatedDateTime = date.split(".");
    if (removeChar) {
      concatedDateTime = date.split("Z");
    }
    return concatedDateTime[0].toString();
  }
  const concatedDate = date.split("T");
  return concatedDate[0].toString();
}

export async function load(configuration: any) {
  console.log("cpi side works!");
  console.log("Setting up test variables");

  accountGeoIndex = randGenerator(0, 3);
  randZip = randGenerator(1, 100000);
  randDiscount = Math.random();
  randPhone = Math.floor(Math.random() * 1000000).toString();
  quantitiesTotal = randGenerator(1, 200);
  userEmail =
    "Email" +
    Math.floor(Math.random() * 1000000).toString() +
    "@" +
    Math.floor(Math.random() * 1000000).toString() +
    ".com";
  name = "Tony Stark";
  phrase = "I am Iron Man ";
  randBool = Math.random() < 0.5;
  ExID = "CPINode testing " + Math.floor(Math.random() * 1000000).toString();
  rand30 = randGenerator(1, 30);
  rand60 = randGenerator(31, 60);
  rand90 = randGenerator(61, 90);
  randAbove = randGenerator(91, 1000);
  date = new Date().toISOString();
  dateTime = dateFormatter(date, true);
  dateOnly = dateFormatter(date);
  link = "https://amphibiaweb.org/species/7276";
  HTML =
    "<h1>This is an HTMLFormattedTextField</h1><hr/><p>and it works,<b>even for bold</b></p><hr/>";
  randDays = randGenerator(10, 100);

  console.log("Finished setting up test variables");

  // Put your cpi side code here
  //debugger;

  // testing data insertion into accounts in bulk via AccountList and CPINode -- UPDATE: Chasky will implement a save function so the below would work.
  // pepperi.events.intercept(
  //   "RecalculateUIObject",
  //   { UIObject: { context: { Name: GENERIC_DATA_VIEWS[0] } } },
  //   async (data) => {
  //     console.log(data.DataObject, data.UIObject, data.UIPage);
  //     data.UIObject?.fields.forEach(async () => {
  //

  //UserHomePage
  // pepperi.events.intercept(
  //   "RecalculateUIObject",
  //   { UIObject: { context: { Name: GENERIC_DATA_VIEWS[1] } } },
  //   async (data) => {
  //     data.UIObject?.fields.forEach((field) => {
  // );

  //Lines
  // pepperi.events.intercept(
  //   "IncrementFieldValue",
  //   { FieldID: "UnitsQuantity" },
  //   async (data, next, main) => {
  //

  // pepperi.events.intercept(
  //   "DecrementFieldValue",
  //   { FieldID: "UnitsQuantity" },
  //   async (data, next, main) => {
  //

  // pepperi.events.intercept(
  //   "TSAButtonPressed",
  //   { FieldID: "TSAButtonField" },
  //   async (data, next, main) => {

  //header
  // pepperi.events.intercept(
  //   "SetFieldValue",
  //   { FieldID: "DeliveryDate" },
  //   async (data, next, main) => {
  //

  // //Account -- works other then the Date - existing bug
  // pepperi.events.intercept(
  //   "SetFieldValue",
  //   { FieldID: "TSALastOrder" },
  //   async (data, next, main) => {
  //
  // /header -- mini test for SetFieldValue/getFieldValue for checkbox/boolean
  // pepperi.events.intercept(
  //   "SetFieldValue",
  //   { FieldID: "DeliveryDate" },
  //   async (data, next, main) => {
}

export const router = Router();
//examples
router.use("/test", async (req, res, next) => {
  try {
    pepperi.events.intercept(
      "RecalculateUIObject",
      { UIObject: { context: { Name: "UserHomePage" } } },
      async (data) => {
        data.UIObject!.fields[0].title = "Testing1";
      }
    );

    const uiPage = await pepperi.internal.UIPage.Create("Home");
    await uiPage.rebuild();

    const apiRes = await pepperi.app.accounts.add({
      type: { Name: "Customer" },
      object: {
        TSAParagraphTextAcc: "Hello World",
      },
    });
    const accountUUID = apiRes.id;

    const dataObject = await pepperi.internal.DataObject.Get(
      "accounts",
      accountUUID
    );

    const fieldValue = await dataObject?.getFieldValue("TSAParagraphTextAcc");

    const actions = uiPage.actions;
    res.json({
      hello: "world",
      actions: actions,
      dataObject: dataObject,
      fieldValue: fieldValue,
    });
  } catch (err) {
    next(err);
  }
});
//debugger for specific code chunks
router.use("/debug-tester", async (req, res) => {
  const ExID = "CPINode testing";
  const uiHomePage = await pepperi.internal.UIPage.Create("Home");
  await uiHomePage.rebuild();

  let accRes = await pepperi.app.accounts.add({
    type: { Name: "Customer" },
    object: {
      ExternalID: ExID,
      Name: ExID,
    },
  });

  const accountUUID = accRes.id;

  let apiRes = await pepperi.app.transactions.add({
    type: { Name: "DorS CPINode Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  const transactionUUID = apiRes.id;

  let dataObject = await pepperi.internal.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let TrnDetailsUIPage: UIDetailsPage;
  try {
    TrnDetailsUIPage = await pepperi.internal.UIPage.Create(
      "Details",
      dataObject!
    );
    TrnDetailsUIPage.rebuild();
    console.log(uiHomePage.type);
    console.log(TrnDetailsUIPage.type);
  } catch (err) {
    console.log(err);
  }
});
//Automation tests for CPINode
router.use("/automation-tests/:v/tests", async (req, res) => {
  const tester = Tester("My test");
  const describe = tester.describe;
  const it = tester.it;
  const expect = tester.expect;

  const bgColor: string = "#659DBD";
  const color: string = "#FBEEC1";
  const accessories: string[] = ["#", "$", "%", "€", "£"];
  const randAcessory: string =
    accessories[Math.floor(Math.random() * accessories.length)];
  let formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const uiHomePage = await pepperi.internal.UIPage.Create("Home");
  await uiHomePage.rebuild();
  let uiObjectHP = uiHomePage.actions;

  let accRes = await pepperi.app.accounts.add({
    type: { Name: "Customer" },
    object: {
      ExternalID: ExID,
      Name: ExID,
    },
  });

  const accountUUID = accRes.id;

  let apiRes = await pepperi.app.transactions.add({
    type: { Name: "DorS CPINode Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  let activityApiRes = await pepperi.app.activities.add({
    type: { Name: "CPINode Test Activity" },
    references: {
      account: { UUID: accountUUID },
    },
  });

  const transactionUUID = apiRes.id;

  let lineRes = await pepperi.app.transactions.addLines({
    transaction: { UUID: transactionUUID },
    lines: [
      {
        item: { ExternalID: "CG1" },
        lineData: { UnitsQuantity: quantitiesTotal },
      },
    ],
  });

  const lineUUID = lineRes.result[0].id;

  let dataObject = await pepperi.internal.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let lineDataObject = await pepperi.internal.DataObject.Get(
    "transaction_lines",
    lineUUID
  );

  let accDataObject = await pepperi.internal.DataObject.Get(
    "accounts",
    accountUUID
  );

  const activityUUID = activityApiRes.id;

  let actDataObject = await pepperi.internal.DataObject.Get(
    "activities",
    activityUUID
  );

  let TrnDetailsUIPage: UIDetailsPage;
  if (dataObject!) {
    try {
      TrnDetailsUIPage = await pepperi.internal.UIPage.Create(
        "Details",
        dataObject!
      );
      TrnDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }

  let AccDetailsUIPage: UIDetailsPage;
  if (accDataObject!) {
    try {
      AccDetailsUIPage = await pepperi.internal.UIPage.Create(
        "Details",
        accDataObject!
      );
      AccDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }
  //initTestData - init test data for all dataObjects
  let testName = req.params.v;
  if (!["UI1", "UI2", "Data"].includes(testName)) {
    testName = "error";
  }
  switch (testName) {
    //===========================DataObject tests=====================================
    case "Data": {
      await initTestData(lineDataObject!, "transaction_lines");
      describe("TransactionLines DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue", async () => {
          console.log(
            "TransactionLines - DataObject Starting Basic CRUD for SetFieldValue and GetFieldValue"
          );
          //============================GET================================
          const getUnitDiscountPercentage = await lineDataObject?.getFieldValue(
            "UnitDiscountPercentage"
          );
          expect(
            getUnitDiscountPercentage,
            "Failed on getUnitDiscountPercentage"
          )
            .to.be.a("number")
            .that.is.equal(+randDiscount.toFixed(4)).and.is.not.null.and.is.not
            .undefined;
          const getUnitPriceAfterDiscount = await lineDataObject?.getFieldValue(
            "UnitPriceAfterDiscount"
          );
          expect(
            getUnitPriceAfterDiscount,
            "Failed on getUnitPriceAfterDiscount"
          )
            .to.be.a("number")
            .that.is.equal(+(randZip * randDiscount).toFixed(4)).and.is.not.null
            .and.is.not.undefined;
          const getTotalUnitsPriceAfterDiscount =
            await lineDataObject?.getFieldValue("TotalUnitsPriceAfterDiscount");
          expect(
            getTotalUnitsPriceAfterDiscount,
            "Failed on getTotalUnitsPriceAfterDiscount"
          )
            .to.be.a("number")
            .that.is.equal(
              +(randDiscount * randZip * quantitiesTotal).toFixed(4)
            ).and.is.not.null.and.is.not.undefined;
          const getDeliveryDate = await lineDataObject?.getFieldValue(
            "DeliveryDate"
          );
          const getDeliveryDateFormat = dateFormatter(getDeliveryDate);
          expect(getDeliveryDateFormat, "Failed on getDeliveryDate")
            .to.be.a("string")
            .that.is.equal(dateOnly).and.is.not.null.and.is.not.undefined;
          const getLineNumber = await lineDataObject?.getFieldValue(
            "LineNumber"
          );
          expect(getLineNumber, "Failed on getLineNumber")
            .to.be.a("number")
            .that.is.equal(accountGeoIndex + 1).and.is.not.null.and.is.not
            .undefined;
          const getUnitsQuantity = await lineDataObject?.getFieldValue(
            "UnitsQuantity"
          );
          expect(getUnitsQuantity, "Failed on getUnitsQuantity")
            .to.be.a("number")
            .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not
            .undefined;
          const getUnitPrice = await lineDataObject?.getFieldValue("UnitPrice");
          expect(getUnitPrice, "Failed on getUnitPrice")
            .to.be.a("number")
            .that.is.equal(randZip).and.is.not.null.and.is.not.undefined;
          const getTSACheckboxLines = await lineDataObject?.getFieldValue(
            "TSACheckboxLines"
          );
          expect(getTSACheckboxLines, "Failed on getTSACheckboxLines")
            .to.be.a("boolean")
            .that.is.equal(randBool).and.is.not.null.and.is.not.undefined;
          const getTSACurrencyLines = await lineDataObject?.getFieldValue(
            "TSACurrencyLines"
          );
          expect(getTSACurrencyLines, "Failed on getTSACurrencyLines")
            .to.be.a("number")
            .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not
            .undefined;
          const getTSADateLines = await lineDataObject?.getFieldValue(
            "TSADateLines"
          );
          const getTSADateLinesFormat = dateFormatter(getTSADateLines);
          expect(getTSADateLinesFormat, "Failed on getTSADateLines")
            .to.be.a("string")
            .that.is.equal(dateOnly).and.is.not.null.and.is.not.undefined;
          const getTSADateTimeLines = await lineDataObject?.getFieldValue(
            "TSADateTimeLines"
          );
          const getTSADateTimeLinesFormat = dateFormatter(
            getTSADateTimeLines,
            true,
            true
          );
          expect(getTSADateTimeLinesFormat, "Failed on getTSADateTimeLines")
            .to.be.a("string")
            .that.is.equal(dateTime).and.is.not.null.and.is.not.undefined;
          const getTSADecimalNumberLines = await lineDataObject?.getFieldValue(
            "TSADecimalNumberLines"
          );
          expect(getTSADecimalNumberLines, "Failed on getTSADecimalNumberLines")
            .to.be.a("number")
            .that.is.equal(+randDiscount.toFixed(6)).and.is.not.null.and.is.not
            .undefined;
          const getTSANumberLines = await lineDataObject?.getFieldValue(
            "TSANumberLines"
          );
          expect(getTSANumberLines, "Failed on getTSANumberLines")
            .to.be.a("number")
            .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not
            .undefined;
          const getTSALimitedLineTextLines =
            await lineDataObject?.getFieldValue("TSALimitedLineTextLines");
          expect(
            getTSALimitedLineTextLines,
            "Failed on  getTSALimitedLineTextLines"
          )
            .to.be.a("string")
            .that.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;
          const getTSAParagraphTextLines = await lineDataObject?.getFieldValue(
            "TSAParagraphTextLines"
          );
          expect(getTSAParagraphTextLines, "Failed on getTSAParagraphTextLines")
            .to.be.a("string")
            .that.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;
          const getTSASingleLineTextLines = await lineDataObject?.getFieldValue(
            "TSASingleLineTextLines"
          );
          expect(
            getTSASingleLineTextLines,
            "Failed on getTSASingleLineTextLines"
          )
            .to.be.a("string")
            .that.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;
          const getTSAEmailLines = await lineDataObject?.getFieldValue(
            "TSAEmailLines"
          );
          expect(getTSAEmailLines, "Failed on getTSAEmailLines")
            .to.be.a("string")
            .that.is.equal(userEmail).and.is.not.null.and.is.not.undefined;
          const getTSALinkLines = await lineDataObject?.getFieldValue(
            "TSALinkLines"
          );
          expect(getTSALinkLines, "Failed on getTSALinkLines")
            .to.be.a("string")
            .that.is.equal(link).and.is.not.null.and.is.not.undefined;
          const getTSAHTMLLines = await lineDataObject?.getFieldValue(
            "TSAHTMLLines"
          );
          expect(getTSAHTMLLines, "Failed on getTSAHTMLLines")
            .to.be.a("string")
            .that.is.equal(HTML).and.is.not.null.and.is.not.undefined;
          console.log(
            "TransactionLines - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue"
          );
        });
        it("Basic CRUD for Accessors", async () => {
          const hidden = lineDataObject?.hidden;
          const internalID = lineDataObject?.internalID;
          const children = lineDataObject?.children;
          const item = lineDataObject?.item;
          const cpiOrderItem = lineDataObject?.cpiOrderItem;
          const resource = lineDataObject?.resource;
          const uuid = lineDataObject?.uuid;
          const transaction = lineDataObject?.transaction;
          const typeDef = lineDataObject?.typeDefinition;
          console.log(transaction);
          expect(children, "Failed on Children accessor")
            .to.be.an("array")
            .that.has.lengthOf(0);
          expect(hidden, "Failed on hidden accessor").to.be.a("boolean").that.is
            .false.and.is.not.null.and.is.not.undefined;
          expect(internalID, "Failed on internalID accessor")
            .to.be.a("number")
            .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(resource, "Failed on resource accessor")
            .to.be.a("string")
            .that.is.equal("transaction_lines").and.is.not.null.and.is.not
            .undefined;
          expect(uuid, "Failed on UUID accessor")
            .to.be.a("string")
            .and.to.have.lengthOf(36).and.that.is.not.null;
          expect(item?.hidden, "Failed on item.hidden accessor").to.be.a(
            "boolean"
          ).that.is.false.and.is.not.null.and.is.not.undefined,
            expect(item?.internalID, "Failed on item.internalID accessor")
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(item?.resource, "Failed on item.resource accessor")
              .to.be.a("string")
              .that.is.equal("items").and.is.not.null.and.is.not.undefined,
            expect(item?.uuid, "Failed on item.UUID accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null;
          expect(typeDef?.hidden, "Failed on typeDef?.hidden accessor").to.be.a(
            "boolean"
          ).that.is.false.and.is.not.null.and.is.not.undefined,
            expect(
              typeDef?.internalID,
              "Failed on typeDef?.internalID accessor"
            )
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(typeDef?.resource, "Failed on typeDef?.resource accessor")
              .to.be.a("string")
              .that.is.equal("transactions").and.is.not.null.and.is.not
              .undefined,
            expect(typeDef?.uuid, "Failed on typeDef?.UUID accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(typeDef?.name, "Failed on typeDef?.name accessor")
              .to.be.a("string")
              .that.is.equal("DorS CPINode Sales Order").and.is.not.null.and.is
              .not.undefined;
          expect(
            cpiOrderItem?.hidden,
            "Failed on cpiOrderItem?.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined,
            expect(
              cpiOrderItem?.wrntyID,
              "Failed on cpiOrderItem?.wrntyID accessor"
            )
              .to.be.a("number")
              .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(
            cpiOrderItem?.children,
            "Failed on cpiOrderItem?.resource accessor"
          )
            .to.be.a("array")
            .that.has.lengthOf(0).and.is.not.null.and.is.not.undefined,
            expect(cpiOrderItem?.uuid, "Failed on cpiOrderItem?.UUID accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(
              cpiOrderItem?.dbObjectType,
              "Failed on cpiOrderItem?.dbObjectType accessor"
            )
              .to.be.a("number")
              .that.is.equal(34).and.is.not.null.and.is.not.undefined,
            expect(
              cpiOrderItem?.activityTypeDefinition.activityType,
              "Failed on cpiOrderItem?.activityTypeDefinition.activityType accessor"
            )
              .to.be.a("number")
              .that.is.equal(2).and.is.not.null.and.is.not.undefined,
            expect(
              cpiOrderItem?.activityTypeDefinition.dbObjectType,
              "Failed on cpiOrderItem?.activityTypeDefinition.dbObjectType accessor"
            )
              .to.be.a("number")
              .that.is.equal(39).and.is.not.null.and.is.not.undefined;
          expect(
            cpiOrderItem?.activityTypeDefinition.hidden,
            "Failed on cpiOrderItem?.activityTypeDefinition.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined,
            expect(
              cpiOrderItem?.activityTypeDefinition.wrntyID,
              "Failed on cpiOrderItem?.activityTypeDefinition.wrntyID accessor"
            )
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(
              cpiOrderItem?.activityTypeDefinition.uuid,
              "Failed on cpiOrderItem?.activityTypeDefinition.UUID accessor"
            )
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(
              cpiOrderItem?.activityTypeDefinition.name,
              "Failed on cpiOrderItem?.activityTypeDefinition.name accessor"
            )
              .to.be.a("string")
              .that.is.equal("DorS CPINode Sales Order").and.is.not.null.and.is
              .not.undefined;

          expect(
            transaction?.hidden,
            "Failed on transaction?.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined;
          expect(
            transaction?.internalID,
            "Failed on transaction?.internalID accessor"
          )
            .to.be.a("number")
            .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.resource,
            "Failed on transaction?.resource accessor"
          )
            .to.be.a("string")
            .that.is.equal("transactions").and.is.not.null.and.is.not.undefined;
          expect(transaction?.uuid, "Failed on transaction?.UUID accessor")
            .to.be.a("string")
            .and.to.have.lengthOf(36).and.that.is.not.null;

          expect(
            transaction?.account.hidden,
            "Failed on transaction?.account.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined;
          expect(
            transaction?.account.internalID,
            "Failed on transaction?.account.internalID accessor"
          )
            .to.be.a("number")
            .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.account.resource,
            "Failed on transaction?.account.resource accessor"
          )
            .to.be.a("string")
            .that.is.equal("accounts").and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.account.uuid,
            "Failed on transaction?.account.UUID accessor"
          )
            .to.be.a("string")
            .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(
              transaction?.account.name,
              "Failed on transaction?.account.name accessor"
            )
              .to.be.a("string")
              .that.is.equal("Tony Stark").and.is.not.null.and.is.not.undefined;

          expect(
            transaction?.catalog.hidden,
            "Failed on transaction?.catalog.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined;
          expect(
            transaction?.catalog.internalID,
            "Failed on transaction?.catalog.internalID accessor"
          )
            .to.be.a("number")
            .that.is.above(0).and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.catalog.resource,
            "Failed on transaction?.catalog.resource accessor"
          )
            .to.be.a("string")
            .that.is.equal("catalogs").and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.catalog.uuid,
            "Failed on transaction?.catalog.UUID accessor"
          )
            .to.be.a("string")
            .and.to.have.lengthOf(36).and.that.is.not.null;

          expect(
            transaction?.creator?.hidden,
            "Failed on transaction?.creator?.hidden accessor"
          ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not
            .undefined;
          expect(
            transaction?.creator?.internalID,
            "Failed on transaction?.creator?.internalID accessor"
          )
            .to.be.a("number")
            .that.is.above(0).and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.creator?.resource,
            "Failed on transaction?.creator?.resource accessor"
          )
            .to.be.a("string")
            .that.is.equal("users").and.is.not.null.and.is.not.undefined;
          expect(
            transaction?.creator?.uuid,
            "Failed on transaction?.creator?.UUID accessor"
          )
            .to.be.a("string")
            .and.to.have.lengthOf(36).and.that.is.not.null;
        });
      });
      await initTestData(dataObject!, "transactions");
      describe("Transaction header DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue for TSA fields", async () => {
          console.log(
            "Transaction - Dataobject Starting Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );
          //=================================GET==================================================
          const getTSASingleLineText = await dataObject?.getFieldValue(
            "TSASingleLineText"
          );
          expect(getTSASingleLineText, "fell on TSASingleLineText")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);

          const getTSALimitedLineText = await dataObject?.getFieldValue(
            "TSALimitedLineText"
          );
          expect(getTSALimitedLineText, "fell on getTSALimitedLineText")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);

          const getTSAParagraphText = await dataObject?.getFieldValue(
            "TSAParagraphText"
          );
          expect(getTSAParagraphText, "fell on getTSAParagraphText")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);

          const getTSADateField = await dataObject?.getFieldValue(
            "TSADateField"
          );
          let formattedDate = dateFormatter(getTSADateField);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal(dateOnly);

          const getTSADateTimeField = await dataObject?.getFieldValue(
            "TSADateTimeField"
          );
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeField,
            true,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);

          const getTSADecimalField = await dataObject?.getFieldValue(
            "TSADecimalField"
          );
          expect(getTSADecimalField, "fell on getTSADecimalField")
            .to.be.a("number")
            .and.is.equal(+randDiscount.toFixed(6));

          const getTSANumberField = await dataObject?.getFieldValue(
            "TSANumberField"
          );
          expect(getTSANumberField, "fell on getTSANumberField")
            .to.be.a("number")
            .and.is.equal(quantitiesTotal);

          const getTSACurrencyField = await dataObject?.getFieldValue(
            "TSACurrencyField"
          );
          expect(getTSACurrencyField, "fell on getTSACurrencyField")
            .to.be.a("number")
            .and.is.equal(quantitiesTotal);

          const getTSACheckboxField = await dataObject?.getFieldValue(
            "TSACheckboxField"
          );
          expect(getTSACheckboxField, "fell on getTSACheckboxField")
            .to.be.a("boolean")
            .and.is.equal(randBool);

          const getTSAEmailField = await dataObject?.getFieldValue(
            "TSAEmailField"
          );
          expect(getTSAEmailField, "fell on getTSAEmailField")
            .to.be.a("string")
            .and.is.equal(userEmail);

          const getTSAPhoneField = await dataObject?.getFieldValue(
            "TSAPhoneField"
          );
          expect(getTSAPhoneField, "fell on getTSAPhoneField")
            .to.be.a("string")
            .and.is.equal(randPhone);

          const getTSALinkField = await dataObject?.getFieldValue(
            "TSALinkField"
          );
          expect(getTSALinkField, "fell on getTSALinkField")
            .to.be.a("string")
            .and.is.equal(link);

          console.log(
            "Transaction - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );

          const getTSAHTMLField = await dataObject?.getFieldValue(
            "TSAHTMLField"
          );
          expect(getTSAHTMLField, "fell on getTSAHTMLField")
            .to.be.a("string")
            .and.is.equal(HTML);
        });

        it("Basic CRUD for SetFieldValue and GetFieldValue for system fields", async () => {
          console.log(
            "Transaction - DataObject Starting Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );
          //======================================GET==========================================
          const getExID = await dataObject?.getFieldValue("ExternalID");
          expect(getExID).that.is.a("string").and.is.equal(ExID);

          const getRemark = await dataObject?.getFieldValue("Remark");
          expect(getRemark, "Failed on getRemark")
            .that.is.a("string")
            .and.is.equal(phrase);

          const getBillToName = await dataObject?.getFieldValue("BillToName");
          expect(getBillToName, "Failed on getRemark")
            .that.is.a("string")
            .and.is.equal(name);

          const getBillToStreet = await dataObject?.getFieldValue(
            "BillToStreet"
          );
          expect(getBillToStreet, "Failed on getBillToStreet")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street);

          const getBillToZipCode = await dataObject?.getFieldValue(
            "BillToZipCode"
          );
          expect(getBillToZipCode, "Failed on getBillToZipCode")
            .that.is.a("string")
            .and.is.equal(randZip.toString());

          const getBillToPhone = await dataObject?.getFieldValue("BillToPhone");
          expect(getBillToPhone, "Failed on getBillToPhone")
            .that.is.a("string")
            .and.is.equal(randPhone);

          const getBillToCity = await dataObject?.getFieldValue("BillToCity");
          expect(getBillToCity, "Failed on getBillToCity")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City);

          const getDiscountPercentage = await dataObject?.getFieldValue(
            "DiscountPercentage"
          );
          expect(getDiscountPercentage, "Failed on getDiscountPercentage")
            .that.is.a("number")
            .and.is.equal(+randDiscount.toFixed(4));

          const getQuantitiesTotal = await dataObject?.getFieldValue(
            "QuantitiesTotal"
          );
          expect(getQuantitiesTotal, "Failed on getQuantitiesTotal")
            .that.is.a("number")
            .and.is.equal(quantitiesTotal);

          const getDeliveryDate = await dataObject?.getFieldValue(
            "DeliveryDate"
          );
          let formattedDate = dateFormatter(getDeliveryDate);
          expect(formattedDate, "Fell on getDeliveryDate")
            .to.be.a("string")
            .and.is.equal(dateOnly);

          const getStatus = await dataObject?.getFieldValue("Status");
          expect(getStatus, "Failed on getStatus")
            .to.be.a("number")
            .and.is.equal(2);

          const getLat = await dataObject?.getFieldValue(
            "SubmissionGeoCodeLAT"
          );
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat, "Failed on getLat")
            .to.be.a("number")
            .and.is.equal(latToNum);

          const getLng = await dataObject?.getFieldValue(
            "SubmissionGeoCodeLNG"
          );
          const lngToNum =
            +accounDataArr[accountGeoIndex].Longtitude!.toFixed(4);
          expect(getLng, "Failed on getLng")
            .to.be.a("number")
            .and.is.equal(lngToNum);

          const getShipToName = await dataObject?.getFieldValue("ShipToName");
          expect(getShipToName, "Failed on getShipToName")
            .to.be.a("string")
            .and.is.equal(name);

          const getShipToStreet = await dataObject?.getFieldValue(
            "ShipToStreet"
          );
          expect(getShipToStreet, "Failed on getShipToStreet")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street);

          const getShipToCity = await dataObject?.getFieldValue("ShipToCity");
          expect(getShipToCity, "Failed on getShipToCity")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City);

          const getShipToZipCode = await dataObject?.getFieldValue(
            "ShipToZipCode"
          );
          expect(getShipToZipCode, "Failed on getShipToZipCode")
            .to.be.a("string")
            .and.is.equal(randZip.toString());

          const getSubTotal = await dataObject?.getFieldValue("SubTotal");
          expect(getSubTotal, "Failed on getSubTotal")
            .to.be.a("number")
            .that.is.equal(randZip);

          const getSubTotalAfterItemsDiscount = await dataObject?.getFieldValue(
            "SubTotalAfterItemsDiscount"
          );

          expect(
            getSubTotalAfterItemsDiscount,
            "Failed on getSubTotalAfterItemsDiscount"
          )
            .to.be.a("number")
            .that.is.equal(+(randZip * randDiscount).toFixed(4));

          console.log(
            "Transaction - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );

          const getGrandTotal = await dataObject?.getFieldValue("GrandTotal");
          expect(getGrandTotal, "Failed on getGrandTotal")
            .to.be.a("number")
            .that.is.equal(
              +(randZip * randDiscount * quantitiesTotal).toFixed(4)
            );
        });

        it("Basic CRUD for Accessors", async () => {
          //=================================Accessors============================================
          console.log(
            "Transaction - DataObject Starting Basic CRUD for Accessors"
          );

          const hidden = dataObject?.hidden;
          const internalID = dataObject?.internalID;
          const uuid = dataObject?.uuid;
          const resource = dataObject?.resource;
          const typeDef = dataObject?.typeDefinition;
          const acc = dataObject?.account;
          const catalog = dataObject?.catalog;
          const creator = dataObject?.creator;
          const lines = dataObject?.lines;
          const perf = dataObject?.performer;

          expect(hidden, "Failed on Hidden Accessor")
            .to.be.a("boolean")
            .that.is.equal(false).and.is.not.null,
            expect(internalID, "Failed on InternalID Accessor")
              .to.be.a("number")
              .that.is.below(0).and.is.not.null,
            expect(uuid, "Failed on UUID Accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(resource).to.be.a("string").and.to.be.equal("transactions"),
            expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a(
              "boolean"
            ).that.is.false,
            expect(typeDef?.name, "Failed on typeDef.name")
              .that.is.a("string")
              .and.length.is.above(0).and.that.is.not.null,
            expect(typeDef?.uuid, "Failed on typeDef.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(typeDef?.internalID, "Failed on typeDef.InternalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null;

          expect(acc, "Failed on Account object").to.be.an("object").that.is.not
            .null.and.is.not.undefined,
            expect(acc?.hidden, "Failed on Account.Hidden").to.be.a("boolean")
              .to.be.false,
            expect(acc?.uuid, "Failed on Account.UUID")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(acc?.resource, "Failed on Account.resource")
              .to.be.a("string")
              .that.is.equal("accounts").that.is.not.null.and.is.not.undefined,
            expect(acc?.name, "Failed on Account.name")
              .to.be.a("string")
              .and.to.be.equal(name).that.is.not.null.and.is.not.undefined,
            expect(
              acc?.typeDefinition,
              "Failed on typeDefinition object"
            ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(acc?.typeDefinition?.uuid, "Failed on typeDefinition.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              acc?.typeDefinition?.internalID,
              "Failed on typeDefinition.internalID"
            )
              .to.be.a("number")
              .and.to.be.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(
              acc?.typeDefinition?.resource,
              "Failed on typeDefinition.resource"
            )
              .to.be.a("string")
              .and.to.be.equal("accounts").and.that.is.not.null.and.is.not
              .undefined,
            expect(acc?.typeDefinition?.name, "Failed on typeDefinition.name")
              .to.be.a("string")
              .and.to.be.equal("Customer").and.that.is.not.null.and.is.not
              .undefined,
            expect(
              acc?.typeDefinition?.hidden,
              "Failed on typeDefinition.hidden"
            ).to.be.a("boolean").and.to.be.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(lines, "Failed on Lines").to.be.an("array").with.lengthOf(1);
          expect(catalog, "Failed on Catalog object").to.be.an("object").that.is
            .not.null.and.is.not.undefined,
            expect(catalog?.hidden, "Failed on Catalog.hidden").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(catalog?.internalID, "Failed on Catalog.internalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(catalog?.uuid, "Failed on Catalog.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(catalog?.resource, "Failed on Catalog.resource")
              .to.be.a("string")
              .that.is.equal("catalogs").and.that.is.not.null.and.is.not
              .undefined,
            expect(creator, "Failed on creator object").to.be.an("object").that
              .is.not.null.and.is.not.undefined,
            expect(creator?.hidden, "Failed on creator.hidden").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(creator?.internalID, "Failed on creator.internalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(creator?.uuid, "Failed on creator.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(creator?.resource, "Failed on creator.resource")
              .to.be.a("string")
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined,
            expect(perf, "Failed on perf object").to.be.an("object").that.is.not
              .null.and.is.not.undefined,
            expect(perf?.hidden, "Failed on perf.hidden").to.be.a("boolean")
              .that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(perf?.internalID, "Failed on perf.internalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(perf?.uuid, "Failed on perf.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(perf?.resource, "Failed on perf.resource")
              .to.be.a("string")
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined,
            console.log(
              "Transaciton - DataObject Finished Basic CRUD for Accessors"
            );
        });
      });
      await initTestData(accDataObject!, "accounts");
      describe("Account DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue for TSA fields", async () => {
          console.log(
            "Account - DataObject Starting Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );
          //==============================GET====================================
          const getTSACheckboxAcc = await accDataObject?.getFieldValue(
            "TSACheckboxAcc"
          );
          expect(getTSACheckboxAcc, "Failed on getTSACheckboxAcc")
            .to.be.a("boolean")
            .that.is.equal(randBool).and.is.not.null.and.is.not.undefined;

          const getTSACurrencyAcc = await accDataObject?.getFieldValue(
            "TSACurrencyAcc"
          );
          expect(getTSACurrencyAcc, "Failed on getTSACurrencyAcc")
            .to.be.a("number")
            .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not
            .undefined;

          const getTSANumberAcc = await accDataObject?.getFieldValue(
            "TSANumberAcc"
          );
          expect(getTSANumberAcc, "Failed on getTSANumberAcc")
            .to.be.a("number")
            .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not
            .undefined;

          const getTSADateAcc = await accDataObject?.getFieldValue(
            "TSADateAcc"
          );
          const formattedDate = dateFormatter(getTSADateAcc);
          expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is
            .not.null.and.is.not.undefined;

          const getTSADateTimeAcc = await accDataObject?.getFieldValue(
            "TSADateTimeAcc"
          );
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeAcc,
            true,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeAcc")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);

          const getTSADecimalAcc = await accDataObject?.getFieldValue(
            "TSADecimalAcc"
          );
          expect(getTSADecimalAcc, "fell on getTSADecimalAcc")
            .to.be.a("number")
            .and.is.equal(+randDiscount.toFixed(6)).and.is.not.null.and.is.not
            .undefined;

          const getTSAEmailAcc = await accDataObject?.getFieldValue(
            "TSAEmailAcc"
          );
          expect(getTSAEmailAcc, "fell on TSAEmailAcc")
            .to.be.a("string")
            .and.is.equal(userEmail).and.is.not.null.and.is.not.undefined;

          const getTSAHTMLAcc = await accDataObject?.getFieldValue(
            "TSAHTMLAcc"
          );
          expect(getTSAHTMLAcc, "fell on TSAHTMLAcc")
            .to.be.a("string")
            .and.is.equal(HTML).and.is.not.null.and.is.not.undefined;

          const getTSASingleLineTextAcc = await accDataObject?.getFieldValue(
            "TSASingleLineTextAcc"
          );

          expect(getTSASingleLineTextAcc, "fell on TSASingleLineTextAcc")
            .to.be.is.a("string")
            .and.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;

          const getTSALimitedLineTextAcc = await accDataObject?.getFieldValue(
            "TSALimitedLineTextAcc"
          );
          expect(getTSALimitedLineTextAcc, "fell on TSALimitedLineTextAcc")
            .to.be.a("string")
            .and.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;

          const getTSAParagraphTextAcc = await accDataObject?.getFieldValue(
            "TSAParagraphTextAcc"
          );
          expect(getTSAParagraphTextAcc, "fell on TSAParagraphTextAcc")
            .to.be.a("string")
            .and.is.equal(phrase + randDiscount).and.is.not.null.and.is.not
            .undefined;

          const getTSALinkAcc = await accDataObject?.getFieldValue(
            "TSALinkAcc"
          );
          expect(getTSALinkAcc, "fell on getTSALinkAcc")
            .to.be.a("string")
            .and.is.equal(link).and.is.not.null.and.is.not.undefined;

          console.log(
            "Account - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );

          const getTSAPhoneAcc = await accDataObject?.getFieldValue(
            "TSAPhoneAcc"
          );
          expect(getTSAPhoneAcc, "fell on getTSAPhoneAcc")
            .to.be.a("string")
            .and.is.equal(randPhone).and.is.not.null.and.is.not.undefined;
        });

        it("Basic CRUD for SetFieldValue and GetFieldValue for system fields", async () => {
          console.log(
            "Account - DataObject Starting Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );
          //========================================GET==============================================
          const getExID = await accDataObject?.getFieldValue("ExternalID");
          expect(getExID, "Failed on ExternalID")
            .to.be.a("string")
            .that.is.equal(ExID).and.is.not.null.and.is.not.undefined;

          const getName = await accDataObject?.getFieldValue("Name");
          expect(getName, "Failed on Name")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined;

          const getNote = await accDataObject?.getFieldValue("Note");
          expect(getNote, "Failed on Note")
            .to.be.a("string")
            .that.is.equal(phrase + randZip).and.is.not.null.and.is.not
            .undefined;

          const getZipCode = await accDataObject?.getFieldValue("ZipCode");
          expect(getZipCode, "Failed on ZipCode")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined;

          const getCity = await accDataObject?.getFieldValue("City");
          expect(getCity, "Failed on City")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null
            .and.is.not.undefined;

          const getStreet = await accDataObject?.getFieldValue("Street");
          expect(getStreet, "Failed on Street")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not
            .null.and.is.not.undefined;

          const getDebt30 = await accDataObject?.getFieldValue("Debts30");
          expect(getDebt30, "Failed on Debt30")
            .to.be.a("number")
            .that.is.equal(rand30).and.is.not.null.and.is.not.undefined;

          const getDebt60 = await accDataObject?.getFieldValue("Debts60");
          expect(getDebt60, "Failed on Debt60")
            .to.be.a("number")
            .that.is.equal(rand60).and.is.not.null.and.is.not.undefined;

          const getDebt90 = await accDataObject?.getFieldValue("Debts90");
          expect(getDebt90, "Failed on Debt90")
            .to.be.a("number")
            .that.is.equal(rand90).and.is.not.null.and.is.not.undefined;

          const getDebtAbove90 = await accDataObject?.getFieldValue(
            "DebtsAbove90"
          );
          expect(getDebtAbove90, "Failed on DebtAbove90")
            .to.be.a("number")
            .that.is.equal(randAbove).and.is.not.null.and.is.not.undefined;

          const getDiscount = await accDataObject?.getFieldValue("Discount");
          expect(getDiscount, "Failed on Discount")
            .to.be.a("number")
            .that.is.equal(+randDiscount.toFixed(4)).and.is.not.null.and.is.not
            .undefined;

          const getFax = await accDataObject?.getFieldValue("Fax");
          expect(getFax, "Failed on Fax")
            .to.be.a("string")
            .that.is.equal(randPhone).and.is.not.null.and.is.not.undefined;

          const getPhone = await accDataObject?.getFieldValue("Phone");
          expect(getPhone, "Failed on Phone")
            .to.be.a("string")
            .that.is.equal(randPhone).and.is.not.null.and.is.not.undefined;

          const getMobile = await accDataObject?.getFieldValue("Fax");
          expect(getMobile, "Failed on Mobile")
            .to.be.a("string")
            .that.is.equal(randPhone).and.is.not.null.and.is.not.undefined;

          const getLong = await accDataObject?.getFieldValue("Longitude");
          expect(getLong, "Failed on Longtitude")
            .to.be.a("number")
            .that.is.equal(
              +accounDataArr[accountGeoIndex].Longtitude!.toFixed(4)
            ).and.is.not.null.and.is.not.undefined;

          console.log(
            "Account - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );

          const getLat = await accDataObject?.getFieldValue("Latitude");
          expect(getLat, "Failed on Latitue")
            .to.be.a("number")
            .that.is.equal(+accounDataArr[accountGeoIndex].Latitude!.toFixed(4))
            .and.is.not.null.and.is.not.undefined;
        });

        it("Basic CRUD for Accessors", async () => {
          console.log("Account - DataObject Starting Basic CRUD for Accessors");

          const hidden = accDataObject?.hidden;
          const internalID = accDataObject?.internalID;
          const resource = accDataObject?.resource;
          const typeDef = accDataObject?.typeDefinition;
          const uuid = accDataObject?.uuid;
          const cntcs = accDataObject?.contacts;
          const name = accDataObject?.name;

          expect(hidden, "Failed on Hidden Accessor")
            .to.be.a("boolean")
            .that.is.equal(false).and.is.not.null,
            expect(internalID, "Failed on InternalID Accessor")
              .to.be.a("number")
              .that.is.below(0).and.is.not.null,
            expect(uuid, "Failed on UUID Accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(resource).to.be.a("string").and.that.is.equal("accounts"),
            expect(name).to.be.a("string").and.that.is.equal(name).and.that.is
              .not.null.and.not.undefined,
            expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a(
              "boolean"
            ).that.is.false,
            expect(typeDef?.name, "Failed on typeDef.name")
              .that.is.a("string")
              .and.to.be.equal("Customer")
              .and.length.is.above(0).and.that.is.not.null,
            expect(typeDef?.resource)
              .to.be.a("string")
              .and.to.be.equal("accounts").and.that.is.not.null.and.not
              .undefined,
            expect(typeDef?.uuid, "Failed on typeDef.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(typeDef?.internalID, "Failed on typeDef.InternalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null,
            expect(cntcs, "Failed on contacs")
              .to.be.an("array")
              .with.lengthOf(0);

          console.log("Account - DataObject Finished Basic CRUD for Accessors");
        });
      });
      await initTestData(actDataObject!, "activities");
      describe("Activity DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue for TSA fields", async () => {
          console.log(
            "Activity - Dataobject Starting Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );
          //==================================GET======================================
          const getTSASingleLineTextACT = await actDataObject?.getFieldValue(
            "TSASingleLineTextACT"
          );
          expect(getTSASingleLineTextACT, "fell on getTSASingleLineTextACT")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);
          const getTSALimitedLineTextACT = await actDataObject?.getFieldValue(
            "TSALimitedLineTextACT"
          );
          expect(getTSALimitedLineTextACT, "fell on getTSALimitedLineTextACT")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);
          const getTSAParagraphTextACT = await actDataObject?.getFieldValue(
            "TSAParagraphTextACT"
          );
          expect(getTSAParagraphTextACT, "fell on TSAParagraphTextACT")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount);
          const getTSADateFieldACT = await actDataObject?.getFieldValue(
            "TSADateACT"
          );
          let formattedDate = dateFormatter(getTSADateFieldACT);
          expect(formattedDate, "fell on getTSADateACT")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getTSADateTimeAct = await actDataObject?.getFieldValue(
            "TSADateTimeACT"
          );
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeAct,
            true,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeAct")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);
          const getTSADecimalACT = await actDataObject?.getFieldValue(
            "TSADecimalACT"
          );
          expect(getTSADecimalACT, "fell on getTSADecimalACT")
            .to.be.a("number")
            .and.is.equal(+randDiscount.toFixed(6));
          const getTSANumberACT = await actDataObject?.getFieldValue(
            "TSANumberACT"
          );
          expect(getTSANumberACT, "fell on getTSANumberACT")
            .to.be.a("number")
            .and.is.equal(quantitiesTotal);
          const getTSACurrencyACT = await actDataObject?.getFieldValue(
            "TSACurrencyACT"
          );
          expect(getTSACurrencyACT, "fell on getTSACurrencyACT")
            .to.be.a("number")
            .and.is.equal(quantitiesTotal);
          const getTSACheckboxACT = await actDataObject?.getFieldValue(
            "TSACheckboxACT"
          );
          expect(getTSACheckboxACT, "fell on getTSACheckboxACT")
            .to.be.a("boolean")
            .and.is.equal(randBool);
          const getTSAEmailACT = await actDataObject?.getFieldValue(
            "TSAEmailACT"
          );
          expect(getTSAEmailACT, "fell on getTSAEmailACT")
            .to.be.a("string")
            .and.is.equal(userEmail);
          const getTSAPhoneACT = await actDataObject?.getFieldValue(
            "TSAPhoneACT"
          );
          expect(getTSAPhoneACT, "fell on getTSAPhoneACT")
            .to.be.a("string")
            .and.is.equal(randPhone);
          const getTSALinkACT = await actDataObject?.getFieldValue(
            "TSALinkACT"
          );
          expect(getTSALinkACT, "fell on getTSALinkACT")
            .to.be.a("string")
            .and.is.equal(link);
          console.log(
            "Activity - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
          );
          const getTSAHTMLACT = await actDataObject?.getFieldValue(
            "TSAHTMLACT"
          );
          expect(getTSAHTMLACT, "fell on getTSAHTMLACT")
            .to.be.a("string")
            .and.is.equal(HTML);
        });
        it("Basic CRUD for SetFieldValue and GetFieldValue for system fields", async () => {
          console.log(
            "Activity - Dataobject Starting Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );
          //=========================================GET=====================================================
          const getExID = await actDataObject?.getFieldValue("ExternalID");
          expect(getExID, "Failed on getExID")
            .to.be.a("string")
            .that.is.equal(ExID).and.is.not.null.and.is.not.undefined;
          const getStatus = await actDataObject?.getFieldValue("Status");
          expect(getStatus, "Failed on getStatus")
            .to.be.a("number")
            .that.is.equal(2).and.is.not.null.and.is.not.undefined;
          const getLAT = await actDataObject?.getFieldValue(
            "SubmissionGeoCodeLAT"
          );
          expect(getLAT, "Failed on getLAT")
            .to.be.a("number")
            .that.is.equal(+accounDataArr[accountGeoIndex].Latitude!.toFixed(4))
            .and.is.not.null.and.is.not.undefined;
          const getLNG = await actDataObject?.getFieldValue(
            "SubmissionGeoCodeLNG"
          );
          expect(getLNG, "Failed on getLNG")
            .to.be.a("number")
            .that.is.equal(
              +accounDataArr[accountGeoIndex].Longtitude!.toFixed(4)
            ).and.is.not.null.and.is.not.undefined;
          const getDuration = await actDataObject?.getFieldValue(
            "PlannedDuration"
          );
          expect(getDuration, "Failed on getDuration")
            .to.be.a("number")
            .that.is.equal(randDays).and.is.not.null.and.is.not.undefined;
          console.log(
            "Activity - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue for system fields"
          );
        });
        it("Basic CRUD for Accessors", async () => {
          console.log(
            "Activity - DataObject Starting Basic CRUD for Accessors"
          );
          const hidden = actDataObject?.hidden;
          const internalID = actDataObject?.internalID;
          const resource = actDataObject?.resource;
          const typeDef = actDataObject?.typeDefinition;
          const uuid = actDataObject?.uuid;
          const creator = actDataObject?.creator;
          const perf = actDataObject?.performer;
          const acc = actDataObject?.account;

          expect(hidden, "Failed on Hidden Accessor")
            .to.be.a("boolean")
            .that.is.equal(false).and.is.not.null,
            expect(internalID, "Failed on InternalID Accessor")
              .to.be.a("number")
              .that.is.below(0).and.is.not.null,
            expect(uuid, "Failed on UUID Accessor")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(resource).to.be.a("string").and.that.is.equal("activities"),
            expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a(
              "boolean"
            ).that.is.false,
            expect(typeDef?.name, "Failed on typeDef.name")
              .that.is.a("string")
              .and.length.is.above(0).and.that.is.not.null,
            expect(typeDef?.uuid, "Failed on typeDef.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            expect(typeDef?.internalID, "Failed on typeDef.InternalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null;
          expect(acc?.name, "Failed on acc?.name").to.be.equal(name).and.that.is
            .not.null.and.is.not.undefined,
            expect(acc?.resource, "Failed on acc?.resource").to.be.equal(
              "accounts"
            ).and.that.is.not.null.and.is.not.undefined,
            expect(acc?.hidden, "Failed on acc?.hidden").to.be.false.and.that.is
              .not.null.and.is.not.undefined,
            expect(acc?.uuid, "Failed on acc?.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null,
            console.log(
              "Activity - DataObject Finished Basic CRUD for Accessors"
            );
          expect(creator?.hidden, "Failed on creator.hidden").to.be.a("boolean")
            .that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(creator?.internalID, "Failed on creator.internalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(creator?.uuid, "Failed on creator.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(creator?.resource, "Failed on creator.resource")
              .to.be.a("string")
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined,
            expect(perf?.hidden, "Failed on perf.hidden").to.be.a("boolean")
              .that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(perf?.internalID, "Failed on perf.internalID")
              .to.be.a("number")
              .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
            expect(perf?.uuid, "Failed on perf.uuid")
              .to.be.a("string")
              .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
              .undefined,
            expect(perf?.resource, "Failed on perf.resource")
              .to.be.a("string")
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined;
        });
      });
      break;
    }
    //===========================UIObject tests=====================================
    case "UI1": {
      describe("UIObject CRUD tests suite 1", async () => {
        const uiObject = TrnDetailsUIPage.uiObject;

        it("CRUD testing on HomePage UIPage/UIObject - Accessors", async () => {
          //================================UIHomePage============================================
          console.log(
            "%cHomePage - UIObject Starting initial CRUD testing!",
            "color: #bada55"
          );
          try {
            uiHomePage.title = phrase;
            uiHomePage.subTitle = phrase;
            uiHomePage.quickAction.backgroundColor = bgColor;
            uiHomePage.quickAction.highlighted = false;
            uiHomePage.quickAction.readonly = false;
          } catch (err) {
            console.log(err);
            console.log(
              `%uiHomePage CRUD test failed! error: ${err}`,
              "color: #FF0000"
            );
          }
          expect(uiHomePage, "Failed on uiHomePage being null").to.be.an(
            "object"
          ).that.is.not.empty.and.that.is.not.null;
          expect(
            uiHomePage.dataObject,
            "Failed on uiHomePage.dataObject not being null"
          ).to.be.undefined,
            expect(
              uiHomePage.key,
              "Failed on uiHomePage.key being empty or null"
            ).to.be.a("string").that.is.not.empty.and.is.not.undefined,
            expect(
              uiHomePage.title,
              "Failed on uiHomePage.title being empty or null"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.is.not.null,
            expect(
              uiHomePage.subTitle,
              "Failed on uiHomePage.subTitle being empty or null"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.is.not.null;
          //expect(uiHomePage.type, "Failed on uiHomePage.type being empty or null/wrong value - https://pepperi.atlassian.net/browse/DI-18307").to.be.a("string").that.is.equal("Home").and.is.not.null;
          expect(
            uiHomePage.quickAction.backgroundColor,
            "Failed on uiHomePage.quickAction.backgroundColor"
          )
            .to.be.a("string")
            .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              uiHomePage.quickAction.highlighted,
              "Failed on uiHomePage.quickAction.highlighted"
            )
              .to.be.a("boolean")
              .that.is.equal(false).and.that.is.not.null.and.is.not.undefined,
            expect(
              uiHomePage.quickAction.readonly,
              "Failed on uiHomePage.quickAction.readonly"
            )
              .to.be.a("boolean")
              .that.is.equal(false).and.that.is.not.null.and.is.not.undefined,
            expect(
              uiHomePage.quickAction.key,
              "Failed on uiHomePage.quickAction.key"
            ).to.be.a("string").and.that.is.not.null.and.is.not.undefined;
          expect(
            uiHomePage.quickAction.dataObject,
            "Failed on uiHomePage.quickAction.dataObject"
          ).to.be.equal(undefined),
            expect(
              uiHomePage.quickAction.context.Name,
              "Failed on uiHomePage.quickAction.context.Name"
            )
              .to.be.a("string")
              .that.is.equal("UserHomePageQuickAction").and.that.is.not.null.and
              .is.not.undefined,
            expect(
              uiHomePage.quickAction.context.ScreenSize,
              "Failed on uiHomePage.quickAction.context.ScreenSize"
            )
              .to.be.a("string")
              .that.is.equal(
                screenSize[uiHomePage.quickAction.context.ScreenSize]
              ).and.that.is.not.null.and.is.not.undefined,
            expect(
              uiHomePage.quickAction.context.Profile.InternalID,
              "Failed on uiHomePage.quickAction.context.Profile.InternalID"
            ).to.be.a("number").that.is.not.null;
          expect(
            uiHomePage.quickAction.dataView.Fields![0].FieldID,
            "Failed on uiHomePage.quickAction.dataView.Fields![0].FieldID"
          )
            .to.be.a("string")
            .that.is.equal("DorS CPINode Sales Order").and.that.is.not.null.and
            .is.not.undefined,
            expect(
              uiHomePage.quickAction.dataView.Fields![0].Title,
              "Failed on uiHomePage.quickAction.dataView.Fields![0].Title"
            )
              .to.be.a("string")
              .that.is.equal("CPINode test ATD - KEEP OUT").and.that.is.not.null
              .and.is.not.undefined,
            expect(
              uiHomePage.quickAction.dataView.Fields?.length,
              "Failed on uiHomePage.quickAction.dataView.Fields?.length"
            ).to.be.a("number").and.that.is.not.null.and.is.not.undefined,
            //===================================UIObject/UIPage.actions===========================================
            expect(uiObjectHP, "Failed on uiObjectHP being null").to.be.an(
              "object"
            ).that.is.not.empty.and.that.is.not.null;
          try {
            uiObjectHP.readonly = false;
            uiObjectHP.highlighted = false;
            uiObjectHP.backgroundColor = bgColor;
          } catch (err) {
            console.log(err);
            console.log(
              `%cUIOBject CRUD test failed! error: ${err}`,
              "color: #FF0000"
            );
          }
          expect(
            uiObjectHP.readonly,
            "Failed on uiObject.readonly being null/true"
          ).to.be.a("boolean").that.is.false.and.is.not.null,
            expect(
              uiObjectHP.highlighted,
              "Failed on uiObject.highlighted being null/true"
            ).to.be.a("boolean").that.is.false.and.is.not.null,
            expect(
              uiObjectHP.backgroundColor,
              "Failed on uiObject.backgroundColor being null/wrong value"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.is.not.null,
            expect(
              uiObjectHP.context,
              "Failed on uiObject.context being null/wrong type"
            ).to.be.an("object").and.is.not.null,
            expect(
              uiObjectHP.context.ScreenSize,
              "Failed on uiObject.context.ScreenSize being null/wrong value"
            )
              .to.be.a("string")
              .that.is.equal(screenSize[uiObjectHP.context.ScreenSize]).and.is
              .not.null,
            expect(
              uiObjectHP.context.Name,
              "Failed on uiObject.context.Name being null/wrong value"
            ).to.be.equal(GENERIC_DATA_VIEWS[uiObjectHP.context.Name]).and.is
              .not.null,
            expect(
              uiObjectHP.key,
              "Failed on uiObject.key being null/wrong value"
            ).to.be.a("string").and.is.not.null.and.is.not.undefined,
            expect(
              uiObjectHP.key,
              "Failed on uiObject.key being null/wrong type"
            ).that.is.a("string").and.is.not.null;
          //=========================UIField Sets==================================
          const uiField = uiObjectHP.fields[0];
          let uiFieldJson;
          try {
            uiField.backgroundColor = bgColor;
            uiField.textColor = color;
            uiField.accessory = "$";
            uiField.decimalDigits = 3;
            uiField.highlighted = true;
            uiField.mandatory = false;
            uiField.readonly = false;
            uiField.title = phrase + randZip;
            uiField.value = phrase + randBool;
            uiField.visible = true;
            uiFieldJson = uiField.toJSON();
          } catch (err) {
            console.log(err);
            console.log(
              `%cUIField CRUD test failed! error: ${err}`,
              "color: #FF0000"
            );
          }
          console.log(
            "%cHomePage - UIObject Finished initial CRUD testing!",
            "color: #bada55"
          ); // need to move to the end of the test
          expect(uiFieldJson, "Failed on UIField.toJSON()").to.be.an("object")
            .that.is.not.null.and.is.not.undefined,
            expect(uiField.type, "Failed on uiField.type")
              .to.be.a("string")
              .that.is.equal(fieldTypeObj[uiField.type]).and.is.not.null,
            expect(uiField.fieldID, "Failed on uiField.fieldID").to.be.a(
              "string"
            ).and.is.not.null,
            expect(uiField.backgroundColor, "Failed on uiField.bgColor")
              .to.be.a("string")
              .that.is.equal(bgColor).and.is.not.null,
            expect(uiField.textColor, "Failed on uiField.textColor")
              .to.be.a("string")
              .that.is.equal(color).and.is.not.null,
            expect(uiField.accessory, "Failed on uiField.accessory")
              .to.be.a("string")
              .that.is.equal("$").and.is.not.null,
            expect(uiField.decimalDigits, "Failed on uiField.decimalDigits")
              .to.be.a("number")
              .that.is.equal(3).and.is.not.null,
            expect(uiField.highlighted, "Failed on uiField.highlighted")
              .to.be.a("boolean")
              .that.is.equal(true).and.is.not.null,
            expect(uiField.mandatory, "Failed on uiField.mandatory")
              .to.be.a("boolean")
              .that.is.equal(false).and.is.not.null,
            expect(uiField.readonly, "Failed on uiField.readonly")
              .to.be.a("boolean")
              .that.is.equal(false).and.is.not.null,
            expect(uiField.title, "Failed on uiField.title")
              .to.be.a("string")
              .that.is.equal(phrase + randZip).and.is.not.null,
            expect(uiField.value, "Failed on uiField.value")
              .to.be.a("string")
              .that.is.equal(phrase + randBool).and.is.not.null,
            expect(uiField.visible, "Failed on uiField.visible")
              .to.be.a("boolean")
              .that.is.equal(true).and.is.not.null;
        });
        it("CRUD testing on Transaction Details UIObject - UIField Accessors", async () => {
          console.log(
            "%cDetails - Accessors - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          //init
          await initTestData(dataObject!, "transactions");
          await initTestData(accDataObject!, "accounts");
          TrnDetailsUIPage.rebuild();
          //=================================UIDetailsPage=======================================
          try {
            TrnDetailsUIPage.subTitle = phrase;
            TrnDetailsUIPage.title = phrase;
          } catch (err) {
            console.log(err);
            console.log(
              `%uiDetails CRUD test failed! error: ${err}`,
              "color: #FF0000"
            );
          }
          expect(
            TrnDetailsUIPage.subTitle,
            "failed on TrnDetailsUIPage.subTitle"
          )
            .to.be.a("string")
            .that.is.equal(phrase).and.is.not.null.and.is.not.empty,
            expect(TrnDetailsUIPage.title, "failed on TrnDetailsUIPage.title")
              .to.be.a("string")
              .that.is.equal(phrase).and.is.not.null.and.is.not.empty;
          expect(
            TrnDetailsUIPage.dataObject,
            "failed on TrnDetailsUIPage.dataObject"
          ).to.be.an("object").that.is.not.null.and.is.not.empty,
            //expect(TrnDetailsUIPage.type,"DI-18307 UIPage.Type returns wrong values").to.be.a("string").that.is.equal("Details").that.is.not.null.and.is.not.empty, https://pepperi.atlassian.net/browse/DI-18307
            expect(
              TrnDetailsUIPage.key,
              "failed on TrnDetailsUIPage.key"
            ).to.be.a("string").that.is.not.null.and.is.not.empty;
          //===============================UIObject================================
          //===============================Accessors===============================
          try {
            uiObject.backgroundColor = bgColor;
            uiObject.highlighted = false;
            uiObject.readonly = false;
          } catch (err) {
            console.log(err);
          }
          const highlighted = uiObject.highlighted;
          const readonly = uiObject.readonly;
          expect(uiObject.backgroundColor, "failed on uiObject.backgroundColor")
            .to.be.a("string")
            .and.to.be.equal(bgColor).and.is.not.null.and.is.not.empty,
            expect(highlighted, "failed on uiObject.highlighted")
              .to.be.a("boolean")
              .and.to.be.equal(false).and.is.not.null.and.is.not.undefined,
            expect(readonly, "failed on uiObject.readonly")
              .to.be.a("boolean")
              .and.to.be.equal(false).and.is.not.null.and.is.not.undefined,
            expect(
              uiObject.dataObject,
              "failed on uiObject.dataObject"
            ).to.be.an("object").and.is.not.null.and.is.not.empty.and.is.not
              .undefined,
            expect(uiObject.key, "failed on uiObject.key").to.be.a("string").and
              .is.not.null.and.is.not.empty.and.is.not.undefined,
            expect(uiObject.context, "failed on uiObject.context").to.be.an(
              "object"
            ).and.is.not.null.and.is.not.empty.and.is.not.undefined,
            expect(uiObject.context.Name, "failed on uiObject.context.Name")
              .to.be.a("string")
              .and.is.equal("OrderForm").and.is.not.null.and.is.not.empty.and.is
              .not.undefined,
            expect(
              uiObject.context.ScreenSize,
              "failed on uiObject.context.ScreenSize"
            )
              .to.be.a("string")
              .and.is.equal(screenSize[uiObject.context.ScreenSize]).and.is.not
              .null.and.is.not.empty.and.is.not.undefined,
            expect(
              uiObject.context.Object?.InternalID,
              "failed on uiObject.Object?.InternalID"
            )
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(
              uiObject.context.Object?.Resource,
              "failed on uiObject.Object?.Resource"
            )
              .to.be.a("string")
              .that.is.equal("transactions").and.is.not.null.and.is.not.empty
              .and.is.not.undefined,
            expect(
              uiObject.context.Profile.InternalID,
              "failed on uiObject.Profile?.InternalID"
            )
              .to.be.a("number")
              .that.is.above(-0.1).and.is.not.null.and.is.not.undefined;
          //===============================UIFields======================================
          //===============================getUIField=================================
          //let emptyObject: boolean = false;
          //const uiFieldsMap = await getUIFields(uiObject);
          //console.log(uiFieldsMap);
          // if (uiFieldsMap === undefined) {
          //   emptyObject = true;
          // }
          // expect(emptyObject, "Failed getting UIFields from getUIFields function")
          //   .to.be.false;
          //===========================SystemFields================================
          let setExternalID = await uiObject.getUIField("ExternalID");
          try {
            setExternalID!.accessory = randAcessory;
            setExternalID!.backgroundColor = bgColor;
            setExternalID!.decimalDigits = 3;
            setExternalID!.highlighted = true;
            setExternalID!.mandatory = true;
            setExternalID!.readonly = false;
            setExternalID!.textColor = color;
            setExternalID!.title = phrase;
            setExternalID!.visible = true;
            setExternalID!.value = ExID + name + randPhone;
          } catch (err) {
            console.log(err);
          }
          let getExternalID = await uiObject.getUIField("ExternalID");
          expect(getExternalID!, "failed on ExternalID field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getExternalID!.type, "failed on ExternalID.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getExternalID!.value, "failed on ExternalID.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(
              getExternalID!.accessory,
              "failed on ExternalID.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getExternalID!.backgroundColor,
              "failed on ExternalID.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getExternalID!.decimalDigits,
              "failed on ExternalID.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getExternalID!.highlighted,
              "failed on ExternalID.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getExternalID!.mandatory,
              "failed on ExternalID.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getExternalID!.readonly,
              "failed on ExternalID.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getExternalID!.textColor,
              "failed on ExternalID.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getExternalID!.title, "failed on ExternalID.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getExternalID!.visible,
              "failed on ExternalID.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setDiscountPercentage = await uiObject.getUIField(
            "DiscountPercentage"
          );
          try {
            setDiscountPercentage!.accessory = randAcessory;
            setDiscountPercentage!.backgroundColor = bgColor;
            setDiscountPercentage!.decimalDigits = 3;
            setDiscountPercentage!.highlighted = true;
            setDiscountPercentage!.mandatory = true;
            setDiscountPercentage!.readonly = false;
            setDiscountPercentage!.textColor = color;
            setDiscountPercentage!.title = phrase;
            setDiscountPercentage!.visible = true;
            setDiscountPercentage!.value = randDiscount.toString();
          } catch (err) {
            console.log(err);
          }
          let getDiscountPercentage = await uiObject.getUIField(
            "DiscountPercentage"
          );
          expect(
            getDiscountPercentage!,
            "failed on DiscountPercentage field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getDiscountPercentage!.type,
              "failed on DiscountPercentage.type field"
            )
              .to.be.a("string")
              .that.is.equal("Percentage").that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscountPercentage!.value,
              "failed on DiscountPercentage.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getDiscountPercentage!.accessory,
              "failed on DiscountPercentage.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscountPercentage!.backgroundColor,
              "failed on DiscountPercentage.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscountPercentage!.decimalDigits,
              "failed on DiscountPercentage.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscountPercentage!.highlighted,
              "failed on DiscountPercentage.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscountPercentage!.mandatory,
              "failed on DiscountPercentage.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscountPercentage!.readonly,
              "failed on DiscountPercentage.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscountPercentage!.textColor,
              "failed on DiscountPercentage.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscountPercentage!.title,
              "failed on DiscountPercentage.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscountPercentage!.visible,
              "failed on DiscountPercentage.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setAccExID = await uiObject.getUIField("AccountExternalID");
          try {
            setAccExID!.accessory = randAcessory;
            setAccExID!.backgroundColor = bgColor;
            setAccExID!.decimalDigits = 3;
            setAccExID!.highlighted = true;
            setAccExID!.mandatory = true;
            setAccExID!.readonly = false;
            setAccExID!.textColor = color;
            setAccExID!.title = phrase;
            setAccExID!.visible = true;
            setAccExID!.value = ExID + name + randPhone;
          } catch (err) {
            console.log(err);
          }
          let getAccExID = await uiObject.getUIField("AccountExternalID");
          expect(getAccExID!, "failed on AccExID field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getAccExID!.type, "failed on AccExID.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getAccExID!.value, "failed on AccExID.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(getAccExID!.accessory, "failed on AccExID.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccExID!.backgroundColor,
              "failed on AccExID.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccExID!.decimalDigits,
              "failed on AccExID.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccExID!.highlighted,
              "failed on AccExID.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccExID!.mandatory,
              "failed on AccExID.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccExID!.readonly,
              "failed on AccExID.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getAccExID!.textColor, "failed on AccExID.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getAccExID!.title, "failed on AccExID.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccExID!.visible,
              "failed on AccExID.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setAccountName = await uiObject.getUIField("AccountName");
          try {
            setAccountName!.accessory = randAcessory;
            setAccountName!.backgroundColor = bgColor;
            setAccountName!.decimalDigits = 3;
            setAccountName!.highlighted = true;
            setAccountName!.mandatory = true;
            setAccountName!.readonly = false;
            setAccountName!.textColor = color;
            setAccountName!.title = phrase;
            setAccountName!.visible = true;
            setAccountName!.value = ExID + name;
          } catch (err) {
            console.log(err);
          }
          let getAccountName = await uiObject.getUIField("AccountName");
          expect(
            getAccountName!,
            "failed on AccountName field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getAccountName?.type, "failed on AccountName.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getAccountName!.value, "failed on AccountName.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name).that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccountName!.accessory,
              "failed on AccountName.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccountName!.backgroundColor,
              "failed on AccountName.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccountName!.decimalDigits,
              "failed on AccountName.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccountName!.highlighted,
              "failed on AccountName.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccountName!.mandatory,
              "failed on AccountName.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccountName!.readonly,
              "failed on AccountName.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAccountName!.textColor,
              "failed on AccountName.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getAccountName!.title, "failed on AccountName.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAccountName!.visible,
              "failed on AccountName.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setWrntyID = await uiObject.getUIField("WrntyID");
          try {
            setWrntyID!.accessory = randAcessory;
            setWrntyID!.backgroundColor = bgColor;
            setWrntyID!.decimalDigits = 3;
            setWrntyID!.highlighted = true;
            setWrntyID!.mandatory = true;
            setWrntyID!.readonly = false;
            setWrntyID!.textColor = color;
            setWrntyID!.title = phrase;
            setWrntyID!.visible = true;
            setWrntyID!.value = randPhone;
          } catch (err) {
            console.log(err);
          }
          let getWrntyID = await uiObject.getUIField("WrntyID");
          expect(getWrntyID!, "failed on WrntyID field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getWrntyID?.type, "failed on WrntyID.type field")
              .to.be.a("string")
              .that.is.equal("LimitedLengthTextBox").that.is.not.null.and.is.not
              .undefined,
            expect(getWrntyID!.value, "failed on WrntyID.value field")
              .to.be.a("string")
              .and.to.be.equal(randPhone).that.is.not.null.and.is.not.undefined,
            expect(getWrntyID!.accessory, "failed on WrntyID.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getWrntyID!.backgroundColor,
              "failed on WrntyID.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getWrntyID!.decimalDigits,
              "failed on WrntyID.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getWrntyID!.highlighted,
              "failed on WrntyID.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getWrntyID!.mandatory,
              "failed on WrntyID.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getWrntyID!.readonly,
              "failed on WrntyID.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getWrntyID!.textColor, "failed on WrntyID.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getWrntyID!.title, "failed on WrntyID.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getWrntyID!.visible,
              "failed on WrntyID.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setActionDateTime = await uiObject.getUIField("ActionDateTime");
          try {
            setActionDateTime!.accessory = randAcessory;
            setActionDateTime!.backgroundColor = bgColor;
            setActionDateTime!.decimalDigits = 3;
            setActionDateTime!.highlighted = true;
            setActionDateTime!.mandatory = true;
            setActionDateTime!.readonly = false;
            setActionDateTime!.textColor = color;
            setActionDateTime!.title = phrase;
            setActionDateTime!.visible = true;
            setActionDateTime!.value = "1990-07-27:00:00:00";
          } catch (err) {
            console.log(err);
          }
          let getActionDateTime = await uiObject.getUIField("ActionDateTime");
          expect(
            getActionDateTime!,
            "failed on ActionDateTime field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getActionDateTime?.type,
              "failed on ActionDateTime.type field"
            )
              .to.be.a("string")
              .that.is.equal("DateAndTime").that.is.not.null.and.is.not
              .undefined,
            expect(
              getActionDateTime!.value,
              "failed on ActionDateTime.value field"
            )
              .to.be.a("string")
              .and.to.be.equal("1990-07-27:00:00:00").that.is.not.null.and.is
              .not.undefined,
            expect(
              getActionDateTime!.accessory,
              "failed on ActionDateTime.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getActionDateTime!.backgroundColor,
              "failed on ActionDateTime.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getActionDateTime!.decimalDigits,
              "failed on ActionDateTime.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getActionDateTime!.highlighted,
              "failed on ActionDateTime.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getActionDateTime!.mandatory,
              "failed on ActionDateTime.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getActionDateTime!.readonly,
              "failed on ActionDateTime.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getActionDateTime!.textColor,
              "failed on ActionDateTime.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getActionDateTime!.title,
              "failed on ActionDateTime.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getActionDateTime!.visible,
              "failed on ActionDateTime.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setAgentName = await uiObject.getUIField("AgentName");
          try {
            setAgentName!.accessory = randAcessory;
            setAgentName!.backgroundColor = bgColor;
            setAgentName!.decimalDigits = 3;
            setAgentName!.highlighted = true;
            setAgentName!.mandatory = true;
            setAgentName!.readonly = false;
            setAgentName!.textColor = color;
            setAgentName!.title = phrase;
            setAgentName!.visible = true;
            setAgentName!.value = name;
          } catch (err) {
            console.log(err);
          }
          let getAgentName = await uiObject.getUIField("AgentName");
          expect(getAgentName!, "failed on AgentName field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getAgentName?.type, "failed on AgentName.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getAgentName!.value, "failed on AgentName.value field")
              .to.be.a("string")
              .and.to.be.equal(name).that.is.not.null.and.is.not.undefined,
            expect(
              getAgentName!.accessory,
              "failed on AgentName.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAgentName!.backgroundColor,
              "failed on AgentName.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAgentName!.decimalDigits,
              "failed on AgentName.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAgentName!.highlighted,
              "failed on AgentName.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAgentName!.mandatory,
              "failed on AgentName.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAgentName!.readonly,
              "failed on AgentName.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getAgentName!.textColor,
              "failed on AgentName.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getAgentName!.title, "failed on AgentName.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getAgentName!.visible,
              "failed on AgentName.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setCurrency = await uiObject.getUIField("Currency");
          try {
            setCurrency!.accessory = randAcessory;
            setCurrency!.backgroundColor = bgColor;
            setCurrency!.decimalDigits = 3;
            setCurrency!.highlighted = true;
            setCurrency!.mandatory = true;
            setCurrency!.readonly = false;
            setCurrency!.textColor = color;
            setCurrency!.title = phrase;
            setCurrency!.visible = true;
            setCurrency!.value = randAcessory;
          } catch (err) {
            console.log(err);
          }
          let getCurrency = await uiObject.getUIField("Currency");
          expect(getCurrency!, "failed on Currency field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getCurrency?.type, "failed on Currency.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getCurrency!.value, "failed on Currency.value field")
              .to.be.a("string")
              .and.to.be.equal(randAcessory).that.is.not.null.and.is.not
              .undefined,
            expect(getCurrency!.accessory, "failed on Currency.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getCurrency!.backgroundColor,
              "failed on Currency.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getCurrency!.decimalDigits,
              "failed on Currency.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getCurrency!.highlighted,
              "failed on Currency.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getCurrency!.mandatory,
              "failed on Currency.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getCurrency!.readonly,
              "failed on Currency.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getCurrency!.textColor, "failed on Currency.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getCurrency!.title, "failed on Currency.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getCurrency!.visible,
              "failed on Currency.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setDeliveryDate = await uiObject.getUIField("DeliveryDate");
          try {
            setDeliveryDate!.accessory = randAcessory;
            setDeliveryDate!.backgroundColor = bgColor;
            setDeliveryDate!.decimalDigits = 3;
            setDeliveryDate!.highlighted = true;
            setDeliveryDate!.mandatory = true;
            setDeliveryDate!.readonly = false;
            setDeliveryDate!.textColor = color;
            setDeliveryDate!.title = phrase;
            setDeliveryDate!.visible = true;
            setDeliveryDate!.value = "1990-07-27";
          } catch (err) {
            console.log(err);
          }
          let getDeliveryDate = await uiObject.getUIField("DeliveryDate");
          expect(
            getDeliveryDate!,
            "failed on DeliveryDate field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getDeliveryDate?.type, "failed on DeliveryDate.type field")
              .to.be.a("string")
              .that.is.equal("Date").that.is.not.null.and.is.not.undefined,
            expect(getDeliveryDate!.value, "failed on DeliveryDate.value field")
              .to.be.a("string")
              .and.to.be.equal("1990-07-27").that.is.not.null.and.is.not
              .undefined,
            expect(
              getDeliveryDate!.accessory,
              "failed on DeliveryDate.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDeliveryDate!.backgroundColor,
              "failed on DeliveryDate.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDeliveryDate!.decimalDigits,
              "failed on DeliveryDate.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDeliveryDate!.highlighted,
              "failed on DeliveryDate.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDeliveryDate!.mandatory,
              "failed on DeliveryDate.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDeliveryDate!.readonly,
              "failed on DeliveryDate.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDeliveryDate!.textColor,
              "failed on DeliveryDate.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getDeliveryDate!.title, "failed on DeliveryDate.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDeliveryDate!.visible,
              "failed on DeliveryDate.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setRemark = await uiObject.getUIField("Remark");
          try {
            setRemark!.accessory = randAcessory;
            setRemark!.backgroundColor = bgColor;
            setRemark!.decimalDigits = 3;
            setRemark!.highlighted = true;
            setRemark!.mandatory = true;
            setRemark!.readonly = false;
            setRemark!.textColor = color;
            setRemark!.title = phrase;
            setRemark!.visible = true;
            setRemark!.value = phrase + name;
          } catch (err) {
            console.log(err);
          }
          let getRemark = await uiObject.getUIField("Remark");
          expect(getRemark!, "failed on Remark field object").to.be.an("object")
            .that.is.not.null.and.is.not.undefined,
            expect(getRemark?.type, "failed on Remark.type field")
              .to.be.a("string")
              .that.is.equal("TextArea").that.is.not.null.and.is.not.undefined,
            expect(getRemark!.value, "failed on Remark.value field")
              .to.be.a("string")
              .and.to.be.equal(phrase + name).that.is.not.null.and.is.not
              .undefined,
            expect(getRemark!.accessory, "failed on Remark.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getRemark!.backgroundColor,
              "failed on Remark.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getRemark!.decimalDigits,
              "failed on Remark.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getRemark!.highlighted,
              "failed on Remark.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getRemark!.mandatory,
              "failed on Remark.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getRemark!.readonly,
              "failed on Remark.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getRemark!.textColor, "failed on Remark.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getRemark!.title, "failed on Remark.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getRemark!.visible,
              "failed on Remark.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToPhone = await uiObject.getUIField("BillToPhone");
          try {
            setBillToPhone!.accessory = randAcessory;
            setBillToPhone!.backgroundColor = bgColor;
            setBillToPhone!.decimalDigits = 3;
            setBillToPhone!.highlighted = true;
            setBillToPhone!.mandatory = true;
            setBillToPhone!.readonly = false;
            setBillToPhone!.textColor = color;
            setBillToPhone!.title = phrase;
            setBillToPhone!.visible = true;
            setBillToPhone!.value = randPhone + randPhone;
          } catch (err) {
            console.log(err);
          }
          let getBillToPhone = await uiObject.getUIField("BillToPhone");
          expect(
            getBillToPhone!,
            "failed on BillToPhone field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getBillToPhone?.type, "failed on BillToPhone.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getBillToPhone!.value, "failed on BillToPhone.value field")
              .to.be.a("string")
              .and.to.be.equal(randPhone + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(
              getBillToPhone!.accessory,
              "failed on BillToPhone.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToPhone!.backgroundColor,
              "failed on BillToPhone.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToPhone!.decimalDigits,
              "failed on BillToPhone.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToPhone!.highlighted,
              "failed on BillToPhone.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToPhone!.mandatory,
              "failed on BillToPhone.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToPhone!.readonly,
              "failed on BillToPhone.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToPhone!.textColor,
              "failed on BillToPhone.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getBillToPhone!.title, "failed on BillToPhone.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToPhone!.visible,
              "failed on BillToPhone.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToCountryIso = await uiObject.getUIField(
            "BillToCountryIso"
          );
          try {
            setBillToCountryIso!.accessory = randAcessory;
            setBillToCountryIso!.backgroundColor = bgColor;
            setBillToCountryIso!.decimalDigits = 3;
            setBillToCountryIso!.highlighted = true;
            setBillToCountryIso!.mandatory = true;
            setBillToCountryIso!.readonly = false;
            setBillToCountryIso!.textColor = color;
            setBillToCountryIso!.title = phrase;
            setBillToCountryIso!.visible = true;
            setBillToCountryIso!.value = "IL";
          } catch (err) {
            console.log(err);
          }
          let getBillToCountryIso = await uiObject.getUIField(
            "BillToCountryIso"
          );
          expect(
            getBillToCountryIso!,
            "failed on BillToCountryIso field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso?.type,
              "failed on BillToCountryIso.type field"
            )
              .to.be.a("string")
              .that.is.equal("EmptyComboBox").that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCountryIso!.value,
              "failed on BillToCountryIso.value field"
            )
              .to.be.a("string")
              .and.to.be.equal("IL").that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso!.accessory,
              "failed on BillToCountryIso.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCountryIso!.backgroundColor,
              "failed on BillToCountryIso.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso!.decimalDigits,
              "failed on BillToCountryIso.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso!.highlighted,
              "failed on BillToCountryIso.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCountryIso!.mandatory,
              "failed on BillToCountryIso.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCountryIso!.readonly,
              "failed on BillToCountryIso.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCountryIso!.textColor,
              "failed on BillToCountryIso.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso!.title,
              "failed on BillToCountryIso.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCountryIso!.visible,
              "failed on BillToCountryIso.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToStreet = await uiObject.getUIField("BillToStreet");
          try {
            setBillToStreet!.accessory = randAcessory;
            setBillToStreet!.backgroundColor = bgColor;
            setBillToStreet!.decimalDigits = 3;
            setBillToStreet!.highlighted = true;
            setBillToStreet!.mandatory = true;
            setBillToStreet!.readonly = false;
            setBillToStreet!.textColor = color;
            setBillToStreet!.title = phrase;
            setBillToStreet!.visible = true;
            setBillToStreet!.value = "Dizingoff";
          } catch (err) {
            console.log(err);
          }
          let getBillToStreet = await uiObject.getUIField("BillToStreet");
          expect(
            getBillToStreet!,
            "failed on BillToStreet field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getBillToStreet?.type, "failed on BillToStreet.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getBillToStreet!.value, "failed on BillToStreet.value field")
              .to.be.a("string")
              .and.to.be.equal("Dizingoff").that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToStreet!.accessory,
              "failed on BillToStreet.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToStreet!.backgroundColor,
              "failed on BillToStreet.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToStreet!.decimalDigits,
              "failed on BillToStreet.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToStreet!.highlighted,
              "failed on BillToStreet.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToStreet!.mandatory,
              "failed on BillToStreet.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToStreet!.readonly,
              "failed on BillToStreet.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToStreet!.textColor,
              "failed on BillToStreet.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getBillToStreet!.title, "failed on BillToStreet.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToStreet!.visible,
              "failed on BillToStreet.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToCity = await uiObject.getUIField("BillToCity");
          try {
            setBillToCity!.accessory = randAcessory;
            setBillToCity!.backgroundColor = bgColor;
            setBillToCity!.decimalDigits = 3;
            setBillToCity!.highlighted = true;
            setBillToCity!.mandatory = true;
            setBillToCity!.readonly = false;
            setBillToCity!.textColor = color;
            setBillToCity!.title = phrase;
            setBillToCity!.visible = true;
            setBillToCity!.value = "Tel-Aviv";
          } catch (err) {
            console.log(err);
          }
          let getBillToCity = await uiObject.getUIField("BillToCity");
          expect(getBillToCity!, "failed on BillToCity field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getBillToCity?.type, "failed on BillToCity.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getBillToCity!.value, "failed on BillToCity.value field")
              .to.be.a("string")
              .and.to.be.equal("Tel-Aviv").that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCity!.accessory,
              "failed on BillToCity.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCity!.backgroundColor,
              "failed on BillToCity.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCity!.decimalDigits,
              "failed on BillToCity.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCity!.highlighted,
              "failed on BillToCity.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCity!.mandatory,
              "failed on BillToCity.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCity!.readonly,
              "failed on BillToCity.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToCity!.textColor,
              "failed on BillToCity.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getBillToCity!.title, "failed on BillToCity.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToCity!.visible,
              "failed on BillToCity.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToZipCode = await uiObject.getUIField("BillToZipCode");
          try {
            setBillToZipCode!.accessory = randAcessory;
            setBillToZipCode!.backgroundColor = bgColor;
            setBillToZipCode!.decimalDigits = 3;
            setBillToZipCode!.highlighted = true;
            setBillToZipCode!.mandatory = true;
            setBillToZipCode!.readonly = false;
            setBillToZipCode!.textColor = color;
            setBillToZipCode!.title = phrase;
            setBillToZipCode!.visible = true;
            setBillToZipCode!.value = (randZip + randZip).toString();
          } catch (err) {
            console.log(err);
          }
          let getBillToZipCode = await uiObject.getUIField("BillToZipCode");
          expect(
            getBillToZipCode!,
            "failed on BillToZipCode field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getBillToZipCode?.type, "failed on BillToZipCode.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(
              getBillToZipCode!.value,
              "failed on BillToZipCode.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randZip + randZip).toString()).that.is.not.null
              .and.is.not.undefined,
            expect(
              getBillToZipCode!.accessory,
              "failed on BillToZipCode.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToZipCode!.backgroundColor,
              "failed on BillToZipCode.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToZipCode!.decimalDigits,
              "failed on BillToZipCode.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToZipCode!.highlighted,
              "failed on BillToZipCode.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToZipCode!.mandatory,
              "failed on BillToZipCode.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToZipCode!.readonly,
              "failed on BillToZipCode.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToZipCode!.textColor,
              "failed on BillToZipCode.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToZipCode!.title,
              "failed on BillToZipCode.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToZipCode!.visible,
              "failed on BillToZipCode.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setBillToName = await uiObject.getUIField("BillToName");
          try {
            setBillToName!.accessory = randAcessory;
            setBillToName!.backgroundColor = bgColor;
            setBillToName!.decimalDigits = 3;
            setBillToName!.highlighted = true;
            setBillToName!.mandatory = true;
            setBillToName!.readonly = false;
            setBillToName!.textColor = color;
            setBillToName!.title = phrase;
            setBillToName!.visible = true;
            setBillToName!.value = name + ExID;
          } catch (err) {
            console.log(err);
          }
          let getBillToName = await uiObject.getUIField("BillToName");
          expect(getBillToName!, "failed on BillToName field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getBillToName?.type, "failed on BillToName.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getBillToName!.value, "failed on BillToName.value field")
              .to.be.a("string")
              .and.to.be.equal(name + ExID).that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToName!.accessory,
              "failed on BillToName.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToName!.backgroundColor,
              "failed on BillToName.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToName!.decimalDigits,
              "failed on BillToName.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToName!.highlighted,
              "failed on BillToName.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToName!.mandatory,
              "failed on BillToName.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToName!.readonly,
              "failed on BillToName.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getBillToName!.textColor,
              "failed on BillToName.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getBillToName!.title, "failed on BillToName.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getBillToName!.visible,
              "failed on BillToName.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setSubTotalAfterItemsDiscount = await uiObject.getUIField(
            "SubTotalAfterItemsDiscount"
          );
          try {
            setSubTotalAfterItemsDiscount!.accessory = randAcessory;
            setSubTotalAfterItemsDiscount!.backgroundColor = bgColor;
            setSubTotalAfterItemsDiscount!.decimalDigits = 3;
            setSubTotalAfterItemsDiscount!.highlighted = true;
            setSubTotalAfterItemsDiscount!.mandatory = true;
            setSubTotalAfterItemsDiscount!.readonly = false;
            setSubTotalAfterItemsDiscount!.textColor = color;
            setSubTotalAfterItemsDiscount!.title = phrase;
            setSubTotalAfterItemsDiscount!.visible = true;
            setSubTotalAfterItemsDiscount!.value = (
              randZip * randDiscount +
              1
            ).toString();
          } catch (err) {
            console.log(err);
          }
          let getSubTotalAfterItemsDiscount = await uiObject.getUIField(
            "SubTotalAfterItemsDiscount"
          );
          expect(
            getSubTotalAfterItemsDiscount!,
            "failed on SubTotalAfterItemsDiscount field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount?.type,
              "failed on SubTotalAfterItemsDiscount.type field"
            )
              .to.be.a("string")
              .that.is.equal("Currency").that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.value,
              "failed on SubTotalAfterItemsDiscount.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randZip * randDiscount + 1).toString()).that.is
              .not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.accessory,
              "failed on SubTotalAfterItemsDiscount.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getSubTotalAfterItemsDiscount!.backgroundColor,
              "failed on SubTotalAfterItemsDiscount.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.decimalDigits,
              "failed on SubTotalAfterItemsDiscount.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.highlighted,
              "failed on SubTotalAfterItemsDiscount.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getSubTotalAfterItemsDiscount!.mandatory,
              "failed on SubTotalAfterItemsDiscount.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getSubTotalAfterItemsDiscount!.readonly,
              "failed on SubTotalAfterItemsDiscount.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getSubTotalAfterItemsDiscount!.textColor,
              "failed on SubTotalAfterItemsDiscount.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.title,
              "failed on SubTotalAfterItemsDiscount.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getSubTotalAfterItemsDiscount!.visible,
              "failed on SubTotalAfterItemsDiscount.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setQuantitiesTotal = await uiObject.getUIField("QuantitiesTotal");
          try {
            setQuantitiesTotal!.accessory = randAcessory;
            setQuantitiesTotal!.backgroundColor = bgColor;
            setQuantitiesTotal!.decimalDigits = 3;
            setQuantitiesTotal!.highlighted = true;
            setQuantitiesTotal!.mandatory = true;
            setQuantitiesTotal!.readonly = false;
            setQuantitiesTotal!.textColor = color;
            setQuantitiesTotal!.title = phrase;
            setQuantitiesTotal!.visible = true;
            setQuantitiesTotal!.value = (quantitiesTotal * 2).toString();
          } catch (err) {
            console.log(err);
          }
          let getQuantitiesTotal = await uiObject.getUIField("QuantitiesTotal");
          expect(
            getQuantitiesTotal!,
            "failed on QuantitiesTotal field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getQuantitiesTotal?.type,
              "failed on QuantitiesTotal.type field"
            )
              .to.be.a("string")
              .that.is.equal("NumberReal").that.is.not.null.and.is.not
              .undefined,
            expect(
              getQuantitiesTotal!.value,
              "failed on QuantitiesTotal.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((quantitiesTotal * 2).toString()).that.is.not
              .null.and.is.not.undefined,
            expect(
              getQuantitiesTotal!.accessory,
              "failed on QuantitiesTotal.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getQuantitiesTotal!.backgroundColor,
              "failed on QuantitiesTotal.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getQuantitiesTotal!.decimalDigits,
              "failed on QuantitiesTotal.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getQuantitiesTotal!.highlighted,
              "failed on QuantitiesTotal.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getQuantitiesTotal!.mandatory,
              "failed on QuantitiesTotal.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getQuantitiesTotal!.readonly,
              "failed on QuantitiesTotal.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getQuantitiesTotal!.textColor,
              "failed on QuantitiesTotal.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getQuantitiesTotal!.title,
              "failed on QuantitiesTotal.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getQuantitiesTotal!.visible,
              "failed on QuantitiesTotal.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          //================================TSA's=============================================
          let setTSASingleLineText = await uiObject.getUIField(
            "TSASingleLineText"
          );
          try {
            setTSASingleLineText!.accessory = randAcessory;
            setTSASingleLineText!.backgroundColor = bgColor;
            setTSASingleLineText!.decimalDigits = 3;
            setTSASingleLineText!.highlighted = true;
            setTSASingleLineText!.mandatory = true;
            setTSASingleLineText!.readonly = false;
            setTSASingleLineText!.textColor = color;
            setTSASingleLineText!.title = phrase;
            setTSASingleLineText!.visible = true;
            setTSASingleLineText!.value = phrase + randDiscount + name;
          } catch (err) {
            console.log(err);
          }
          let getTSASingleLineText = await uiObject.getUIField(
            "TSASingleLineText"
          );
          expect(
            getTSASingleLineText!,
            "failed on TSASingleLineText field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText?.type,
              "failed on TSASingleLineText.type field"
            )
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText!.value,
              "failed on TSASingleLineText.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(phrase + randDiscount + name).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSASingleLineText?.accessory,
              "failed on TSASingleLineText.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineText!.backgroundColor,
              "failed on TSASingleLineText.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText!.decimalDigits,
              "failed on TSASingleLineText.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText!.highlighted,
              "failed on TSASingleLineText.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineText!.mandatory,
              "failed on TSASingleLineText.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineText!.readonly,
              "failed on TSASingleLineText.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineText!.textColor,
              "failed on TSASingleLineText.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText!.title,
              "failed on TSASingleLineText.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineText!.visible,
              "failed on TSASingleLineText.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSALimitedLineText = await uiObject.getUIField(
            "TSALimitedLineText"
          );
          try {
            setTSALimitedLineText!.accessory = randAcessory;
            setTSALimitedLineText!.backgroundColor = bgColor;
            setTSALimitedLineText!.decimalDigits = 3;
            setTSALimitedLineText!.highlighted = true;
            setTSALimitedLineText!.mandatory = true;
            setTSALimitedLineText!.readonly = false;
            setTSALimitedLineText!.textColor = color;
            setTSALimitedLineText!.title = phrase;
            setTSALimitedLineText!.visible = true;
            setTSALimitedLineText!.value = phrase + randDiscount + name;
          } catch (err) {
            console.log(err);
          }
          let getTSALimitedLineText = await uiObject.getUIField(
            "TSALimitedLineText"
          );
          expect(
            getTSALimitedLineText!,
            "failed on TSALimitedLineText field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineText?.type,
              "failed on getTSALimitedLineText.type field"
            )
              .to.be.a("string")
              .that.is.equal("LimitedLengthTextBox").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineText!.value,
              "failed on TSALimitedLineText.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(phrase + randDiscount + name).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSALimitedLineText!.accessory,
              "failed on TSALimitedLineText.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineText!.backgroundColor,
              "failed on TSALimitedLineText.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineText!.decimalDigits,
              "failed on TSALimitedLineText.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineText!.highlighted,
              "failed on TSALimitedLineText.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineText!.mandatory,
              "failed on TSALimitedLineText.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineText!.readonly,
              "failed on TSALimitedLineText.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineText!.textColor,
              "failed on TSALimitedLineText.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineText!.title,
              "failed on TSALimitedLineText.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineText!.visible,
              "failed on TSALimitedLineText.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSAParagraphText = await uiObject.getUIField(
            "TSAParagraphText"
          );
          try {
            setTSAParagraphText!.accessory = randAcessory;
            setTSAParagraphText!.backgroundColor = bgColor;
            setTSAParagraphText!.decimalDigits = 3;
            setTSAParagraphText!.highlighted = true;
            setTSAParagraphText!.mandatory = true;
            setTSAParagraphText!.readonly = false;
            setTSAParagraphText!.textColor = color;
            setTSAParagraphText!.title = phrase;
            setTSAParagraphText!.visible = true;
            setTSAParagraphText!.value = phrase + randDiscount + name;
          } catch (err) {
            console.log(err);
          }
          let getTSAParagraphText = await uiObject.getUIField(
            "TSAParagraphText"
          );
          expect(
            getTSAParagraphText!,
            "failed on TSAParagraphText field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText?.type,
              "failed on getTSAParagraphText.type field"
            )
              .to.be.a("string")
              .that.is.equal("TextArea").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText!.value,
              "failed on TSAParagraphText.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(phrase + randDiscount + name).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSAParagraphText!.accessory,
              "failed on TSAParagraphText.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphText!.backgroundColor,
              "failed on TSAParagraphText.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText!.decimalDigits,
              "failed on TSAParagraphText.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText!.highlighted,
              "failed on TSAParagraphText.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphText!.mandatory,
              "failed on TSAParagraphText.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphText!.readonly,
              "failed on TSAParagraphText.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphText!.textColor,
              "failed on TSAParagraphText.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText!.title,
              "failed on TSAParagraphText.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphText!.visible,
              "failed on TSAParagraphText.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSADateField = await uiObject.getUIField("TSADateField");
          try {
            setTSADateField!.accessory = randAcessory;
            setTSADateField!.backgroundColor = bgColor;
            setTSADateField!.decimalDigits = 3;
            setTSADateField!.highlighted = true;
            setTSADateField!.mandatory = true;
            setTSADateField!.readonly = false;
            setTSADateField!.textColor = color;
            setTSADateField!.title = phrase;
            setTSADateField!.visible = true;
            setTSADateField!.value = "1990-07-27";
          } catch (err) {
            console.log(err);
          }
          let getTSADateField = await uiObject.getUIField("TSADateField");
          expect(
            getTSADateField!,
            "failed on TSADateField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateField?.type,
              "failed on getTSADateField.type field"
            )
              .to.be.a("string")
              .that.is.equal("Date").that.is.not.null.and.is.not.undefined,
            expect(getTSADateField!.value, "failed on TSADateField.value field")
              .to.be.a("string")
              .and.to.be.equal("1990-07-27").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateField!.accessory,
              "failed on TSADateField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateField!.backgroundColor,
              "failed on TSADateField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateField!.decimalDigits,
              "failed on TSADateField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateField!.highlighted,
              "failed on TSADateField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateField!.mandatory,
              "failed on TSADateField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateField!.readonly,
              "failed on TSADateField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateField!.textColor,
              "failed on TSADateField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSADateField!.title, "failed on TSADateField.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateField!.visible,
              "failed on TSADateField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSADateTimeField = await uiObject.getUIField(
            "TSADateTimeField"
          );
          try {
            setTSADateTimeField!.accessory = randAcessory;
            setTSADateTimeField!.backgroundColor = bgColor;
            setTSADateTimeField!.decimalDigits = 3;
            setTSADateTimeField!.highlighted = true;
            setTSADateTimeField!.mandatory = true;
            setTSADateTimeField!.readonly = false;
            setTSADateTimeField!.textColor = color;
            setTSADateTimeField!.title = phrase;
            setTSADateTimeField!.visible = true;
            setTSADateTimeField!.value = "1990-07-27:00:00:00";
          } catch (err) {
            console.log(err);
          }
          let getTSADateTimeField = await uiObject.getUIField(
            "TSADateTimeField"
          );
          expect(
            getTSADateTimeField!,
            "failed on TSADateTimeField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeField?.type,
              "failed on getTSADateTimeField.type field"
            )
              .to.be.a("string")
              .that.is.equal("DateAndTime").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeField!.value,
              "failed on TSADateTimeField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal("1990-07-27:00:00:00").that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSADateTimeField!.accessory,
              "failed on TSADateTimeField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeField!.backgroundColor,
              "failed on TSADateTimeField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeField!.decimalDigits,
              "failed on TSADateTimeField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeField!.highlighted,
              "failed on TSADateTimeField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeField!.mandatory,
              "failed on TSADateTimeField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeField!.readonly,
              "failed on TSADateTimeField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeField!.textColor,
              "failed on TSADateTimeField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeField!.title,
              "failed on TSADateTimeField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeField!.visible,
              "failed on TSADateTimeField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSACheckboxField = await uiObject.getUIField(
            "TSACheckboxField"
          );
          try {
            setTSACheckboxField!.accessory = randAcessory;
            setTSACheckboxField!.backgroundColor = bgColor;
            setTSACheckboxField!.decimalDigits = 3;
            setTSACheckboxField!.highlighted = true;
            setTSACheckboxField!.mandatory = true;
            setTSACheckboxField!.readonly = false;
            setTSACheckboxField!.textColor = color;
            setTSACheckboxField!.title = phrase;
            setTSACheckboxField!.visible = true;
            setTSACheckboxField!.value = (!randBool).toString();
          } catch (err) {
            console.log(err);
          }
          let getTSACheckboxField = await uiObject.getUIField(
            "TSACheckboxField"
          );
          expect(
            getTSACheckboxField!,
            "failed on TSACheckboxField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxField?.type,
              "failed on getTSACheckboxField.type field"
            )
              .to.be.a("string")
              .that.is.equal("BooleanText").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxField!.value,
              "failed on TSACheckboxField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSACheckboxField!.accessory,
              "failed on TSACheckboxField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxField!.backgroundColor,
              "failed on TSACheckboxField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxField!.decimalDigits,
              "failed on TSACheckboxField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxField!.highlighted,
              "failed on TSACheckboxField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxField!.mandatory,
              "failed on TSACheckboxField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxField!.readonly,
              "failed on TSACheckboxField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxField!.textColor,
              "failed on TSACheckboxField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxField!.title,
              "failed on TSACheckboxField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxField!.visible,
              "failed on TSACheckboxField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSACurrencyField = await uiObject.getUIField(
            "TSACurrencyField"
          );
          try {
            setTSACurrencyField!.accessory = randAcessory;
            setTSACurrencyField!.backgroundColor = bgColor;
            setTSACurrencyField!.decimalDigits = 3;
            setTSACurrencyField!.highlighted = true;
            setTSACurrencyField!.mandatory = true;
            setTSACurrencyField!.readonly = false;
            setTSACurrencyField!.textColor = color;
            setTSACurrencyField!.title = phrase;
            setTSACurrencyField!.visible = true;
            setTSACurrencyField!.value = (randDiscount * 2).toString();
          } catch (err) {
            console.log(err);
          }
          let getTSACurrencyField = await uiObject.getUIField(
            "TSACurrencyField"
          );
          expect(
            getTSACurrencyField!,
            "failed on TSACurrencyField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField?.type,
              "failed on getTSACurrencyField.type field"
            )
              .to.be.a("string")
              .that.is.equal("Currency").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField!.value,
              "failed on TSACurrencyField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randDiscount * 2).toString()).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSACurrencyField!.accessory,
              "failed on TSACurrencyField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyField!.backgroundColor,
              "failed on TSACurrencyField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField!.decimalDigits,
              "failed on TSACurrencyField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField!.highlighted,
              "failed on TSACurrencyField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyField!.mandatory,
              "failed on TSACurrencyField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyField!.readonly,
              "failed on TSACurrencyField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyField!.textColor,
              "failed on TSACurrencyField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField!.title,
              "failed on TSACurrencyField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyField!.visible,
              "failed on TSACurrencyField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSADecimalField = await uiObject.getUIField("TSADecimalField");
          try {
            setTSADecimalField!.accessory = randAcessory;
            setTSADecimalField!.backgroundColor = bgColor;
            setTSADecimalField!.decimalDigits = 3;
            setTSADecimalField!.highlighted = true;
            setTSADecimalField!.mandatory = true;
            setTSADecimalField!.readonly = false;
            setTSADecimalField!.textColor = color;
            setTSADecimalField!.title = phrase;
            setTSADecimalField!.visible = true;
            setTSADecimalField!.value = (!randBool).toString();
          } catch (err) {
            console.log(err);
          }
          let getTSADecimalField = await uiObject.getUIField("TSADecimalField");
          expect(
            getTSADecimalField!,
            "failed on TSADecimalField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalField?.type,
              "failed on getTSADecimalField.type field"
            )
              .to.be.a("string")
              .that.is.equal("NumberReal").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalField!.value,
              "failed on TSADecimalField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSADecimalField!.accessory,
              "failed on TSADecimalField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalField!.backgroundColor,
              "failed on TSADecimalField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalField!.decimalDigits,
              "failed on TSADecimalField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalField!.highlighted,
              "failed on TSADecimalField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalField!.mandatory,
              "failed on TSADecimalField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalField!.readonly,
              "failed on TSADecimalField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalField!.textColor,
              "failed on TSADecimalField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalField!.title,
              "failed on TSADecimalField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalField!.visible,
              "failed on TSADecimalField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSANumberField = await uiObject.getUIField("TSANumberField");
          try {
            setTSANumberField!.accessory = randAcessory;
            setTSANumberField!.backgroundColor = bgColor;
            setTSANumberField!.decimalDigits = 3;
            setTSANumberField!.highlighted = true;
            setTSANumberField!.mandatory = true;
            setTSANumberField!.readonly = false;
            setTSANumberField!.textColor = color;
            setTSANumberField!.title = phrase;
            setTSANumberField!.visible = true;
            setTSANumberField!.value = (quantitiesTotal * 2).toString();
          } catch (err) {
            console.log(err);
          }
          let getTSANumberField = await uiObject.getUIField("TSANumberField");
          expect(
            getTSANumberField!,
            "failed on TSANumberField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberField?.type,
              "failed on getTSANumberField.type field"
            )
              .to.be.a("string")
              .that.is.equal("NumberInteger").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberField!.value,
              "failed on TSANumberField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((quantitiesTotal * 2).toString()).that.is.not
              .null.and.is.not.undefined,
            expect(
              getTSANumberField!.accessory,
              "failed on TSANumberField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberField!.backgroundColor,
              "failed on TSANumberField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberField!.decimalDigits,
              "failed on TSANumberField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberField!.highlighted,
              "failed on TSANumberField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberField!.mandatory,
              "failed on TSANumberField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberField!.readonly,
              "failed on TSANumberField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberField!.textColor,
              "failed on TSANumberField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberField!.title,
              "failed on TSANumberField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberField!.visible,
              "failed on TSANumberField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSAEmailField = await uiObject.getUIField("TSAEmailField");
          try {
            setTSAEmailField!.accessory = randAcessory;
            setTSAEmailField!.backgroundColor = bgColor;
            setTSAEmailField!.decimalDigits = 3;
            setTSAEmailField!.highlighted = true;
            setTSAEmailField!.mandatory = true;
            setTSAEmailField!.readonly = false;
            setTSAEmailField!.textColor = color;
            setTSAEmailField!.title = phrase;
            setTSAEmailField!.visible = true;
            setTSAEmailField!.value = randDiscount + userEmail;
          } catch (err) {
            console.log(err);
          }
          let getTSAEmailField = await uiObject.getUIField("TSAEmailField");
          expect(
            getTSAEmailField!,
            "failed on TSAEmailField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField?.type,
              "failed on getTSAEmailField.type field"
            )
              .to.be.a("string")
              .that.is.equal("Email").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField!.value,
              "failed on TSAEmailField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(randDiscount + userEmail).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSAEmailField!.accessory,
              "failed on TSAEmailField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailField!.backgroundColor,
              "failed on TSAEmailField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField!.decimalDigits,
              "failed on TSAEmailField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField!.highlighted,
              "failed on TSAEmailField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailField!.mandatory,
              "failed on TSAEmailField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailField!.readonly,
              "failed on TSAEmailField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailField!.textColor,
              "failed on TSAEmailField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField!.title,
              "failed on TSAEmailField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailField!.visible,
              "failed on TSAEmailField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSAPhoneField = await uiObject.getUIField("TSAPhoneField");
          try {
            setTSAPhoneField!.accessory = randAcessory;
            setTSAPhoneField!.backgroundColor = bgColor;
            setTSAPhoneField!.decimalDigits = 3;
            setTSAPhoneField!.highlighted = true;
            setTSAPhoneField!.mandatory = true;
            setTSAPhoneField!.readonly = false;
            setTSAPhoneField!.textColor = color;
            setTSAPhoneField!.title = phrase;
            setTSAPhoneField!.visible = true;
            setTSAPhoneField!.value = (randPhone + randPhone).toString();
          } catch (err) {
            console.log(err);
          }
          let getTSAPhoneField = await uiObject.getUIField("TSAPhoneField");
          expect(
            getTSAPhoneField!,
            "failed on TSAPhoneField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField?.type,
              "failed on getTSAPhoneField.type field"
            )
              .to.be.a("string")
              .that.is.equal("Phone").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.value,
              "failed on TSAPhoneField.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randPhone + randPhone).toString()).that.is.not
              .null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.accessory,
              "failed on TSAPhoneField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneField!.backgroundColor,
              "failed on TSAPhoneField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.decimalDigits,
              "failed on TSAPhoneField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.highlighted,
              "failed on TSAPhoneField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneField!.mandatory,
              "failed on TSAPhoneField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneField!.readonly,
              "failed on TSAPhoneField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneField!.textColor,
              "failed on TSAPhoneField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.title,
              "failed on TSAPhoneField.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneField!.visible,
              "failed on TSAPhoneField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSALinkField = await uiObject.getUIField("TSALinkField");
          try {
            setTSALinkField!.accessory = randAcessory;
            setTSALinkField!.backgroundColor = bgColor;
            setTSALinkField!.decimalDigits = 3;
            setTSALinkField!.highlighted = true;
            setTSALinkField!.mandatory = true;
            setTSALinkField!.readonly = false;
            setTSALinkField!.textColor = color;
            setTSALinkField!.title = phrase;
            setTSALinkField!.visible = true;
            setTSALinkField!.value = userEmail + userEmail;
          } catch (err) {
            console.log(err);
          }
          let getTSALinkField = await uiObject.getUIField("TSALinkField");
          expect(
            getTSALinkField!,
            "failed on TSALinkField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkField?.type,
              "failed on getTSALinkField.type field"
            )
              .to.be.a("string")
              .that.is.equal("Link").that.is.not.null.and.is.not.undefined,
            expect(getTSALinkField!.value, "failed on TSALinkField.value field")
              .to.be.a("string")
              .and.to.be.equal(userEmail + userEmail).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSALinkField!.accessory,
              "failed on TSALinkField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkField!.backgroundColor,
              "failed on TSALinkField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkField!.decimalDigits,
              "failed on TSALinkField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkField!.highlighted,
              "failed on TSALinkField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkField!.mandatory,
              "failed on TSALinkField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkField!.readonly,
              "failed on TSALinkField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkField!.textColor,
              "failed on TSALinkField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSALinkField!.title, "failed on TSALinkField.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkField!.visible,
              "failed on TSALinkField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          let setTSAHTMLField = await uiObject.getUIField("TSAHTMLField");
          try {
            setTSAHTMLField!.accessory = randAcessory;
            setTSAHTMLField!.backgroundColor = bgColor;
            setTSAHTMLField!.decimalDigits = 3;
            setTSAHTMLField!.highlighted = true;
            setTSAHTMLField!.mandatory = true;
            setTSAHTMLField!.readonly = false;
            setTSAHTMLField!.textColor = color;
            setTSAHTMLField!.title = phrase;
            setTSAHTMLField!.visible = true;
            setTSAHTMLField!.value = HTML + HTML;
          } catch (err) {
            console.log(err);
          }
          let getTSAHTMLField = await uiObject.getUIField("TSAHTMLField");
          expect(
            getTSAHTMLField!,
            "failed on TSAHTMLField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLField?.type, "failed on TSAHTMLField.type field")
              .to.be.a("string")
              .that.is.equal("None").that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLField!.value, "failed on TSAHTMLField.value field")
              .to.be.a("string")
              .and.to.be.equal(HTML + HTML).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLField!.accessory,
              "failed on TSAHTMLField.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLField!.backgroundColor,
              "failed on TSAHTMLField.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLField!.decimalDigits,
              "failed on TSAHTMLField.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLField!.highlighted,
              "failed on TSAHTMLField.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLField!.mandatory,
              "failed on TSAHTMLField.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLField!.readonly,
              "failed on TSAHTMLField.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLField!.textColor,
              "failed on TSAHTMLField.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLField!.title, "failed on TSAHTMLField.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLField!.visible,
              "failed on TSAHTMLField.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          console.log(
            "%cDetails - Accessors - UIObject Finished CRUD testing!",
            "color: #bada55"
          );
        });
        it("CRUD testing on Transaction Details UIObject - SetFieldValue", async () => {
          //need to set the oringinal values as the first test and then test for those values
          //===========================SET=========================================
          console.log(
            "%cDetails - SetFieldValue - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          //need to set new values so the recalculate test will be accurate
          //========================TSA's===========================================
          await uiObject?.setFieldValue(
            "TSASingleLineText",
            phrase + randDiscount
          );
          await uiObject?.setFieldValue(
            "TSALimitedLineText",
            phrase + randDiscount
          );
          await uiObject?.setFieldValue(
            "TSAParagraphText",
            phrase + randDiscount
          );
          await uiObject?.setFieldValue("TSADateField", dateOnly);
          await uiObject?.setFieldValue("TSADateTimeField", date);
          await uiObject?.setFieldValue(
            "TSADecimalField",
            randDiscount.toFixed(6)
          );
          await uiObject?.setFieldValue(
            "TSANumberField",
            quantitiesTotal.toString()
          );
          await uiObject?.setFieldValue(
            "TSACurrencyField",
            quantitiesTotal.toString()
          );
          await uiObject?.setFieldValue(
            "TSACheckboxField",
            randBool.toString()
          );
          await uiObject?.setFieldValue("TSAEmailField", userEmail);
          await uiObject?.setFieldValue("TSAPhoneField", randPhone);
          await uiObject?.setFieldValue("TSALinkField", link);
          await uiObject?.setFieldValue("TSAHTMLField", HTML);
          //===================================SystemFields=================================
          const status = 2;
          await uiObject?.setFieldValue("ExternalID", ExID);
          await uiObject?.setFieldValue("Remark", phrase);
          await uiObject?.setFieldValue(
            "DiscountPercentage",
            randDiscount.toString()
          );
          await uiObject?.setFieldValue("BillToName", name);
          await uiObject?.setFieldValue(
            "BillToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await uiObject?.setFieldValue(
            "BillToCity",
            accounDataArr[accountGeoIndex].City
          );
          await uiObject?.setFieldValue("BillToZipCode", randZip.toString());
          await uiObject?.setFieldValue("BillToPhone", randPhone);
          await uiObject?.setFieldValue(
            "QuantitiesTotal",
            quantitiesTotal.toString()
          );
          await uiObject?.setFieldValue("DeliveryDate", dateOnly);
          await uiObject?.setFieldValue("Status", status.toString());
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLAT",
            accounDataArr[accountGeoIndex].Latitude!.toString()
          );
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLNG",
            accounDataArr[accountGeoIndex].Longtitude!.toString()
          );
          await uiObject?.setFieldValue("ShipToName", name);
          await uiObject?.setFieldValue(
            "ShipToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await uiObject?.setFieldValue(
            "ShipToCity",
            accounDataArr[accountGeoIndex].City
          );
          await uiObject?.setFieldValue("ShipToZipCode", randZip.toString());
          await uiObject?.setFieldValue("SubTotal", randZip.toString());
          await uiObject?.setFieldValue(
            "SubTotalAfterItemsDiscount",
            (randZip * randDiscount).toString()
          );
          await uiObject?.setFieldValue(
            "GrandTotal",
            (randZip * randDiscount * quantitiesTotal).toString()
          );
          //=============================GET======================================
          const getTSASingleLineText = await uiObject?.getUIField(
            "TSASingleLineText"
          );
          expect(getTSASingleLineText?.value, "fell on TSASingleLineText.value")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSASingleLineText?.formattedValue,
              "fell on TSASingleLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          const getTSALimitedLineText = await uiObject?.getUIField(
            "TSALimitedLineText"
          );
          expect(
            getTSALimitedLineText?.value,
            "fell on getTSALimitedLineText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSALimitedLineText?.formattedValue,
              "fell on getTSALimitedLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          const getTSAParagraphText = await uiObject?.getUIField(
            "TSAParagraphText"
          );
          expect(
            getTSAParagraphText?.value,
            "fell on getTSAParagraphText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSAParagraphText?.formattedValue,
              "fell on getTSAParagraphText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          //need to go back to here
          const getTSADateField = await uiObject?.getUIField("TSADateField");
          let formattedDate = dateFormatter(getTSADateField!.value);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getTSADateTimeField = await uiObject?.getUIField(
            "TSADateTimeField"
          );
          console.log(getTSADateTimeField);
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeField!.value,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);
          const getTSADecimalField = await uiObject?.getUIField(
            "TSADecimalField"
          );
          expect(getTSADecimalField?.value, "fell on getTSADecimalField.value")
            .to.be.a("string")
            .and.is.equal(randDiscount.toFixed(6)),
            expect(
              getTSADecimalField?.formattedValue,
              "fell on getTSADecimalField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randDiscount.toFixed(6));
          const getTSANumberField = await uiObject?.getUIField(
            "TSANumberField"
          );
          expect(getTSANumberField?.value, "fell on getTSANumberField.value")
            .to.be.a("string")
            .and.is.equal(quantitiesTotal.toString()),
            expect(
              getTSANumberField?.formattedValue,
              "fell on getTSANumberField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(quantitiesTotal.toString());
          const getTSACurrencyField = await uiObject?.getUIField(
            "TSACurrencyField"
          );
          const strCur = formatter.format(quantitiesTotal);
          const resultCur = strCur.substr(1) + strCur.substr(0, 1);
          expect(
            getTSACurrencyField?.value,
            "fell on getTSACurrencyField.value"
          )
            .to.be.a("string")
            .and.is.equal(quantitiesTotal.toString());
          expect(
            getTSACurrencyField?.formattedValue,
            "fell on getTSACurrencyField.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal(resultCur);
          const getTSACheckboxField = await uiObject?.getUIField(
            "TSACheckboxField"
          );
          expect(
            getTSACheckboxField?.value,
            "fell on getTSACheckboxField.value"
          )
            .to.be.a("string")
            .and.is.equal(randBool.toString()),
            expect(
              getTSACheckboxField?.formattedValue,
              "fell on getTSACheckboxField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randBool.toString());
          const getTSAEmailField = await uiObject?.getUIField("TSAEmailField");
          expect(getTSAEmailField?.value, "fell on getTSAEmailField.value")
            .to.be.a("string")
            .and.is.equal(userEmail),
            expect(
              getTSAEmailField?.formattedValue,
              "fell on getTSAEmailField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(userEmail);
          const getTSAPhoneField = await uiObject?.getUIField("TSAPhoneField");
          expect(getTSAPhoneField?.value, "fell on getTSAPhoneField.value")
            .to.be.a("string")
            .and.is.equal(randPhone.toString()),
            expect(
              getTSAPhoneField?.formattedValue,
              "fell on getTSAPhoneField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randPhone.toString());
          const getTSALinkField = await uiObject?.getUIField("TSALinkField");
          expect(getTSALinkField?.value, "fell on getTSALinkField.value")
            .to.be.a("string")
            .and.is.equal(link),
            expect(
              getTSALinkField?.formattedValue,
              "fell on getTSALinkField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(link);
          const getTSAHTMLField = await uiObject?.getUIField("TSAHTMLField");
          expect(getTSAHTMLField?.value, "fell on getTSAHTMLField.value")
            .to.be.a("string")
            .and.is.equal(HTML),
            expect(
              getTSAHTMLField?.formattedValue,
              "fell on getTSAHTMLField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML);
          const getExID = await uiObject?.getUIField("ExternalID");
          expect(getExID?.value, "Failed on getExID.value")
            .that.is.a("string")
            .and.is.equal(ExID),
            expect(getExID?.formattedValue, "Failed on getExID.formattedValue")
              .that.is.a("string")
              .and.is.equal(ExID);
          const getRemark = await uiObject?.getUIField("Remark");
          expect(getRemark?.value, "Failed on getRemark.value")
            .that.is.a("string")
            .and.is.equal(phrase),
            expect(
              getRemark?.formattedValue,
              "Failed on getRemark.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase);
          const getBillToName = await uiObject?.getUIField("BillToName");
          expect(getBillToName?.value, "Failed on getBillToName.value")
            .that.is.a("string")
            .and.is.equal(name),
            expect(
              getBillToName?.formattedValue,
              "Failed on getBillToName.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(name);
          const getBillToStreet = await uiObject?.getUIField("BillToStreet");
          expect(getBillToStreet?.value, "Failed on getBillToStreet.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getBillToStreet?.formattedValue,
              "Failed on getBillToStreet.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getBillToZipCode = await uiObject?.getUIField("BillToZipCode");
          expect(getBillToZipCode?.value, "Failed on getBillToZipCode.value")
            .that.is.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getBillToZipCode?.formattedValue,
              "Failed on getBillToZipCode.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randZip.toString());
          const getBillToPhone = await uiObject?.getUIField("BillToPhone");
          expect(getBillToPhone?.value, "Failed on getBillToPhone.value")
            .that.is.a("string")
            .and.is.equal(randPhone),
            expect(
              getBillToPhone?.formattedValue,
              "Failed on getBillToPhone.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randPhone);
          const getBillToCity = await uiObject?.getUIField("BillToCity");
          expect(getBillToCity?.value, "Failed on getBillToCity.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getBillToCity?.formattedValue,
              "Failed on getBillToCity.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getDiscountPercentage = await uiObject?.getUIField(
            "DiscountPercentage"
          );
          expect(
            parseFloat(getDiscountPercentage!.value).toFixed(6),
            "Failed on getDiscountPercentage.value"
          )
            .that.is.a("string")
            .and.is.equal(randDiscount.toFixed(6)),
            expect(
              getDiscountPercentage!.formattedValue,
              "Failed on getDiscountPercentage.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randDiscount.toFixed(2) + "%");
          const getQuantitiesTotal = await uiObject?.getUIField(
            "QuantitiesTotal"
          );
          expect(
            parseFloat(getQuantitiesTotal!.value).toFixed(0),
            "Failed on getQuantitiesTotal.value"
          )
            .that.is.a("string")
            .and.is.equal(quantitiesTotal.toString());
          expect(
            parseFloat(getQuantitiesTotal!.formattedValue).toFixed(2),
            "Failed on getQuantitiesTotal.formattedValue"
          )
            .that.is.a("string")
            .and.is.equal(quantitiesTotal.toFixed(2));

          const getDeliveryDate = await uiObject?.getUIField("DeliveryDate");
          let formattedDateSystem = dateFormatter(getDeliveryDate!.value);
          expect(formattedDateSystem, "Fell on getDeliveryDate")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getStatus = await uiObject?.getUIField("Status");
          expect(getStatus?.value, "Failed on getStatus.value")
            .to.be.a("string")
            .and.is.equal(status.toString());
          expect(
            getStatus?.formattedValue,
            "Failed on getStatus.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal("Submitted");
          const getLat = await uiObject?.getUIField("SubmissionGeoCodeLAT");
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat?.value, "Failed on getLat.value")
            .to.be.a("string")
            .and.is.equal(latToNum.toString());
          expect(getLat?.formattedValue, "Failed on getLat.formattedValue")
            .to.be.a("string")
            .and.is.equal(latToNum.toFixed(2));
          const getLng = await uiObject?.getUIField("SubmissionGeoCodeLNG");
          const lngToNum =
            +accounDataArr[accountGeoIndex].Longtitude!.toFixed(3);
          expect(parseFloat(getLng!.value).toFixed(3), "Failed on getLng.value")
            .to.be.a("string")
            .and.is.equal(lngToNum.toString());
          expect(
            parseFloat(getLng!.formattedValue).toFixed(2),
            "Failed on getLng.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal(lngToNum.toFixed(2));
          const getShipToName = await uiObject?.getUIField("ShipToName");
          expect(getShipToName?.value, "Failed on getShipToName.value")
            .to.be.a("string")
            .and.is.equal(name),
            expect(
              getShipToName?.formattedValue,
              "Failed on getShipToName.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(name);
          const getShipToStreet = await uiObject?.getUIField("ShipToStreet");
          expect(getShipToStreet?.value, "Failed on getShipToStreet.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getShipToStreet?.formattedValue,
              "Failed on getShipToStreet.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getShipToCity = await uiObject?.getUIField("ShipToCity");
          expect(getShipToCity?.value, "Failed on getShipToCity.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getShipToCity?.formattedValue,
              "Failed on getShipToCity.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getShipToZipCode = await uiObject?.getUIField("ShipToZipCode");
          expect(getShipToZipCode?.value, "Failed on getShipToZipCode.value")
            .to.be.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getShipToZipCode?.formattedValue,
              "Failed on getShipToZipCode.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randZip.toString());
          const getSubTotal = await uiObject?.getUIField("SubTotal");
          const strST = formatter.format(randZip);
          const resultST = strST.substr(1) + strST.substr(0, 1);
          expect(
            parseFloat(getSubTotal!.value).toFixed(2),
            "Failed on getSubTotal.value"
          )
            .to.be.a("string")
            .that.is.equal(randZip.toFixed(2));
          expect(
            getSubTotal!.formattedValue,
            "Failed on getSubTotal.formattedValue"
          )
            .to.be.a("string")
            .that.is.equal(resultST);
          const getSubTotalAfterItemsDiscount = await uiObject?.getUIField(
            "SubTotalAfterItemsDiscount"
          );
          const strSTAD = formatter.format(randZip * randDiscount);
          const resultSTAD = strSTAD.substr(1) + strSTAD.substr(0, 1);
          expect(
            parseFloat(getSubTotalAfterItemsDiscount!.value).toFixed(4),
            "Failed on getSubTotalAfterItemsDiscount.value"
          )
            .to.be.a("string")
            .that.is.equal((randZip * randDiscount).toFixed(4)),
            expect(
              getSubTotalAfterItemsDiscount!.formattedValue,
              "Failed on getSubTotalAfterItemsDiscount.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultSTAD);
          const getGrandTotal = await uiObject?.getUIField("GrandTotal");
          const strGT = formatter.format(
            randZip * randDiscount * quantitiesTotal
          );
          const resultGT = strGT.substr(1) + strGT.substr(0, 1);
          expect(
            parseFloat(getGrandTotal!.value).toFixed(4),
            "Failed on getGrandTotal.value"
          )
            .to.be.a("string")
            .that.is.equal(
              (randZip * randDiscount * quantitiesTotal).toFixed(4)
            ),
            expect(
              getGrandTotal!.formattedValue,
              "Failed on getGrandTotal.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultGT),
            console.log(
              "%cDetails - SetFieldValue - UIObject Finished CRUD testing!",
              "color: #bada55"
            );
        });
      });
      break;
    }

    case "UI2": {
      describe("UIObject CRUD tests suite 2", async () => {
        let uiObject = TrnDetailsUIPage.uiObject;
        let accUIObject = AccDetailsUIPage.uiObject;
        const status = 2;

        it("CRUD testing on Transaction Details UIObject - Recalculate", async () => {
          console.log(
            "%cDetails - Recalculate - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          await initTestData(dataObject!, "transactions");
          await initTestData(accDataObject!, "accounts");
          TrnDetailsUIPage.rebuild();
          uiObject = TrnDetailsUIPage.uiObject;
          console.log(uiObject);
          //===========================SET=========================================
          //========================TSA's===========================================
          //setting new values for the recalculate to work
          await uiObject?.setFieldValue("TSASingleLineText", phrase + randDays);
          await uiObject?.setFieldValue(
            "TSALimitedLineText",
            phrase + randDays
          );
          await uiObject?.setFieldValue("TSAParagraphText", phrase + randDays);
          await uiObject?.setFieldValue("TSADateField", "27-07-1990");
          await uiObject?.setFieldValue(
            "TSADateTimeField",
            "27-07-1990T07:45:00Z"
          );
          await uiObject?.setFieldValue("TSADecimalField", randZip.toFixed(6));
          await uiObject?.setFieldValue("TSANumberField", randDays.toString());
          await uiObject?.setFieldValue(
            "TSACurrencyField",
            randDays.toString()
          );
          await uiObject?.setFieldValue(
            "TSACheckboxField",
            (!randBool).toString()
          );
          await uiObject?.setFieldValue(
            "TSAEmailField",
            "dor.s@cpinodetest.com"
          );
          await uiObject?.setFieldValue("TSAPhoneField", randZip.toString());
          await uiObject?.setFieldValue(
            "TSALinkField",
            "https://en.wikipedia.org/wiki/Iron_Man"
          );
          await uiObject?.setFieldValue(
            "TSAHTMLField",
            HTML + "<br/><h1>this is a change</h1>"
          );
          //===================================SystemFields=================================
          const status = 2;
          await uiObject?.setFieldValue("ExternalID", name);
          await uiObject?.setFieldValue("Remark", ExID);
          await uiObject?.setFieldValue(
            "DiscountPercentage",
            randDays.toString()
          );
          await uiObject?.setFieldValue("BillToName", phrase);
          await uiObject?.setFieldValue(
            "BillToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await uiObject?.setFieldValue(
            "BillToCity",
            accounDataArr[accountGeoIndex].City
          );
          await uiObject?.setFieldValue("BillToZipCode", randDays.toString());
          await uiObject?.setFieldValue("BillToPhone", randZip.toString());
          await uiObject?.setFieldValue("QuantitiesTotal", randDays.toString());
          await uiObject?.setFieldValue("DeliveryDate", "27-07-1990");
          await uiObject?.setFieldValue("Status", (status + 1).toString());
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLAT",
            accounDataArr[accountGeoIndex].Latitude!.toString()
          );
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLNG",
            accounDataArr[accountGeoIndex].Longtitude!.toString()
          );
          await uiObject?.setFieldValue("ShipToName", phrase);
          await uiObject?.setFieldValue(
            "ShipToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await uiObject?.setFieldValue(
            "ShipToCity",
            accounDataArr[accountGeoIndex].City
          );
          await uiObject?.setFieldValue("ShipToZipCode", randDays.toString());
          await uiObject?.setFieldValue("SubTotal", randDays.toString());
          await uiObject?.setFieldValue(
            "SubTotalAfterItemsDiscount",
            (randZip * randDays).toString()
          );
          await uiObject?.setFieldValue(
            "GrandTotal",
            (randZip * randDays * quantitiesTotal).toString()
          );
          //brings the data back to the point it was when was defined by the dataObject
          await uiObject.recalculate(); // possible bug,I see the function running and bringing back the correct values, but it doesn't update the UIObject
          console.log(uiObject);

          //=============================GET======================================
          const getTSASingleLineText = await uiObject?.getUIField(
            "TSASingleLineText"
          );
          expect(getTSASingleLineText?.value, "fell on TSASingleLineText.value")
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSASingleLineText?.formattedValue,
              "fell on TSASingleLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          const getTSALimitedLineText = await uiObject?.getUIField(
            "TSALimitedLineText"
          );
          expect(
            getTSALimitedLineText?.value,
            "fell on getTSALimitedLineText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSALimitedLineText?.formattedValue,
              "fell on getTSALimitedLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          const getTSAParagraphText = await uiObject?.getUIField(
            "TSAParagraphText"
          );
          expect(
            getTSAParagraphText?.value,
            "fell on getTSAParagraphText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDiscount),
            expect(
              getTSAParagraphText?.formattedValue,
              "fell on getTSAParagraphText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDiscount);
          //need to go back to here
          const getTSADateField = await uiObject?.getUIField("TSADateField");
          let formattedDate = dateFormatter(getTSADateField!.value);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getTSADateTimeField = await uiObject?.getUIField(
            "TSADateTimeField"
          );
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeField!.value,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);
          const getTSADecimalField = await uiObject?.getUIField(
            "TSADecimalField"
          );
          expect(getTSADecimalField?.value, "fell on getTSADecimalField.value")
            .to.be.a("string")
            .and.is.equal(randDiscount.toFixed(6)),
            expect(
              getTSADecimalField?.formattedValue,
              "fell on getTSADecimalField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randDiscount.toFixed(6));
          const getTSANumberField = await uiObject?.getUIField(
            "TSANumberField"
          );
          expect(getTSANumberField?.value, "fell on getTSANumberField.value")
            .to.be.a("string")
            .and.is.equal(quantitiesTotal.toString()),
            expect(
              getTSANumberField?.formattedValue,
              "fell on getTSANumberField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(quantitiesTotal.toString());
          const getTSACurrencyField = await uiObject?.getUIField(
            "TSACurrencyField"
          );
          const strCur = formatter.format(quantitiesTotal);
          const resultCur = strCur.substr(1) + strCur.substr(0, 1);
          expect(
            getTSACurrencyField?.value,
            "fell on getTSACurrencyField.value"
          )
            .to.be.a("string")
            .and.is.equal(quantitiesTotal.toString());
          expect(
            getTSACurrencyField?.formattedValue,
            "fell on getTSACurrencyField.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal(resultCur);
          const getTSACheckboxField = await uiObject?.getUIField(
            "TSACheckboxField"
          );
          expect(
            getTSACheckboxField?.value,
            "fell on getTSACheckboxField.value"
          )
            .to.be.a("string")
            .and.is.equal(randBool.toString()),
            expect(
              getTSACheckboxField?.formattedValue,
              "fell on getTSACheckboxField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randBool.toString());
          const getTSAEmailField = await uiObject?.getUIField("TSAEmailField");
          expect(getTSAEmailField?.value, "fell on getTSAEmailField.value")
            .to.be.a("string")
            .and.is.equal(userEmail),
            expect(
              getTSAEmailField?.formattedValue,
              "fell on getTSAEmailField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(userEmail);
          const getTSAPhoneField = await uiObject?.getUIField("TSAPhoneField");
          expect(getTSAPhoneField?.value, "fell on getTSAPhoneField.value")
            .to.be.a("string")
            .and.is.equal(randPhone.toString()),
            expect(
              getTSAPhoneField?.formattedValue,
              "fell on getTSAPhoneField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randPhone.toString());
          const getTSALinkField = await uiObject?.getUIField("TSALinkField");
          expect(getTSALinkField?.value, "fell on getTSALinkField.value")
            .to.be.a("string")
            .and.is.equal(link),
            expect(
              getTSALinkField?.formattedValue,
              "fell on getTSALinkField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(link);
          const getTSAHTMLField = await uiObject?.getUIField("TSAHTMLField");
          expect(getTSAHTMLField?.value, "fell on getTSAHTMLField.value")
            .to.be.a("string")
            .and.is.equal(HTML),
            expect(
              getTSAHTMLField?.formattedValue,
              "fell on getTSAHTMLField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML);
          const getExID = await uiObject?.getUIField("ExternalID");
          expect(getExID?.value, "Failed on getExID.value")
            .that.is.a("string")
            .and.is.equal(ExID),
            expect(getExID?.formattedValue, "Failed on getExID.formattedValue")
              .that.is.a("string")
              .and.is.equal(ExID);
          const getRemark = await uiObject?.getUIField("Remark");
          expect(getRemark?.value, "Failed on getRemark.value")
            .that.is.a("string")
            .and.is.equal(phrase),
            expect(
              getRemark?.formattedValue,
              "Failed on getRemark.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase);
          const getBillToName = await uiObject?.getUIField("BillToName");
          expect(getBillToName?.value, "Failed on getBillToName.value")
            .that.is.a("string")
            .and.is.equal(name),
            expect(
              getBillToName?.formattedValue,
              "Failed on getBillToName.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(name);
          const getBillToStreet = await uiObject?.getUIField("BillToStreet");
          expect(getBillToStreet?.value, "Failed on getBillToStreet.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getBillToStreet?.formattedValue,
              "Failed on getBillToStreet.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getBillToZipCode = await uiObject?.getUIField("BillToZipCode");
          expect(getBillToZipCode?.value, "Failed on getBillToZipCode.value")
            .that.is.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getBillToZipCode?.formattedValue,
              "Failed on getBillToZipCode.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randZip.toString());
          const getBillToPhone = await uiObject?.getUIField("BillToPhone");
          expect(getBillToPhone?.value, "Failed on getBillToPhone.value")
            .that.is.a("string")
            .and.is.equal(randPhone),
            expect(
              getBillToPhone?.formattedValue,
              "Failed on getBillToPhone.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randPhone);
          const getBillToCity = await uiObject?.getUIField("BillToCity");
          expect(getBillToCity?.value, "Failed on getBillToCity.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getBillToCity?.formattedValue,
              "Failed on getBillToCity.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getDiscountPercentage = await uiObject?.getUIField(
            "DiscountPercentage"
          );
          expect(
            parseFloat(getDiscountPercentage!.value).toFixed(6),
            "Failed on getDiscountPercentage.value"
          )
            .that.is.a("string")
            .and.is.equal(randDiscount.toFixed(6)),
            expect(
              getDiscountPercentage!.formattedValue,
              "Failed on getDiscountPercentage.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randDiscount.toFixed(2) + "%");
          const getQuantitiesTotal = await uiObject?.getUIField(
            "QuantitiesTotal"
          );
          expect(
            parseFloat(getQuantitiesTotal!.value).toFixed(0),
            "Failed on getQuantitiesTotal.value"
          )
            .that.is.a("string")
            .and.is.equal(quantitiesTotal.toString());
          expect(
            parseFloat(getQuantitiesTotal!.formattedValue).toFixed(2),
            "Failed on getQuantitiesTotal.formattedValue"
          )
            .that.is.a("string")
            .and.is.equal(quantitiesTotal.toFixed(2));

          const getDeliveryDate = await uiObject?.getUIField("DeliveryDate");
          let formattedDateSystem = dateFormatter(getDeliveryDate!.value);
          expect(formattedDateSystem, "Fell on getDeliveryDate")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getStatus = await uiObject?.getUIField("Status");
          expect(getStatus?.value, "Failed on getStatus.value")
            .to.be.a("string")
            .and.is.equal(status.toString());
          expect(
            getStatus?.formattedValue,
            "Failed on getStatus.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal("Submitted");
          const getLat = await uiObject?.getUIField("SubmissionGeoCodeLAT");
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat?.value, "Failed on getLat.value")
            .to.be.a("string")
            .and.is.equal(latToNum.toString());
          expect(getLat?.formattedValue, "Failed on getLat.formattedValue")
            .to.be.a("string")
            .and.is.equal(latToNum.toFixed(2));
          const getLng = await uiObject?.getUIField("SubmissionGeoCodeLNG");
          const lngToNum =
            +accounDataArr[accountGeoIndex].Longtitude!.toFixed(3);
          expect(parseFloat(getLng!.value).toFixed(3), "Failed on getLng.value")
            .to.be.a("string")
            .and.is.equal(lngToNum.toString());
          expect(
            parseFloat(getLng!.formattedValue).toFixed(2),
            "Failed on getLng.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal(lngToNum.toFixed(2));
          const getShipToName = await uiObject?.getUIField("ShipToName");
          expect(getShipToName?.value, "Failed on getShipToName.value")
            .to.be.a("string")
            .and.is.equal(name),
            expect(
              getShipToName?.formattedValue,
              "Failed on getShipToName.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(name);
          const getShipToStreet = await uiObject?.getUIField("ShipToStreet");
          expect(getShipToStreet?.value, "Failed on getShipToStreet.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getShipToStreet?.formattedValue,
              "Failed on getShipToStreet.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getShipToCity = await uiObject?.getUIField("ShipToCity");
          expect(getShipToCity?.value, "Failed on getShipToCity.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getShipToCity?.formattedValue,
              "Failed on getShipToCity.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getShipToZipCode = await uiObject?.getUIField("ShipToZipCode");
          expect(getShipToZipCode?.value, "Failed on getShipToZipCode.value")
            .to.be.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getShipToZipCode?.formattedValue,
              "Failed on getShipToZipCode.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randZip.toString());
          const getSubTotal = await uiObject?.getUIField("SubTotal");
          const strST = formatter.format(randZip);
          const resultST = strST.substr(1) + strST.substr(0, 1);
          expect(
            parseFloat(getSubTotal!.value).toFixed(2),
            "Failed on getSubTotal.value"
          )
            .to.be.a("string")
            .that.is.equal(randZip.toFixed(2));
          expect(
            getSubTotal!.formattedValue,
            "Failed on getSubTotal.formattedValue"
          )
            .to.be.a("string")
            .that.is.equal(resultST);
          const getSubTotalAfterItemsDiscount = await uiObject?.getUIField(
            "SubTotalAfterItemsDiscount"
          );
          const strSTAD = formatter.format(randZip * randDiscount);
          const resultSTAD = strSTAD.substr(1) + strSTAD.substr(0, 1);
          expect(
            parseFloat(getSubTotalAfterItemsDiscount!.value).toFixed(4),
            "Failed on getSubTotalAfterItemsDiscount.value"
          )
            .to.be.a("string")
            .that.is.equal((randZip * randDiscount).toFixed(4)),
            expect(
              getSubTotalAfterItemsDiscount!.formattedValue,
              "Failed on getSubTotalAfterItemsDiscount.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultSTAD);
          const getGrandTotal = await uiObject?.getUIField("GrandTotal");
          const strGT = formatter.format(
            randZip * randDiscount * quantitiesTotal
          );
          const resultGT = strGT.substr(1) + strGT.substr(0, 1);
          expect(
            parseFloat(getGrandTotal!.value).toFixed(4),
            "Failed on getGrandTotal.value"
          )
            .to.be.a("string")
            .that.is.equal(
              (randZip * randDiscount * quantitiesTotal).toFixed(4)
            ),
            expect(
              getGrandTotal!.formattedValue,
              "Failed on getGrandTotal.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultGT),
            console.log(
              "%cDetails - Recalculate - UIObject Finished CRUD testing!",
              "color: #bada55"
            );
        });

        it("CRUD testing on Transaction Details UIObject - SetFieldValue - Save", async () => {
          console.log(
            "%cDetails - Save - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          await initTestData(dataObject!, "transactions");
          await initTestData(accDataObject!, "accounts");
          TrnDetailsUIPage.rebuild();
          uiObject = TrnDetailsUIPage.uiObject;
          //===================================SET=====================================
          await uiObject?.setFieldValue(
            "TSASingleLineText",
            phrase + randZip,
            true
          );
          await uiObject?.setFieldValue(
            "TSALimitedLineText",
            phrase + randZip,
            true
          );
          await uiObject?.setFieldValue(
            "TSAParagraphText",
            phrase + randZip,
            true
          );
          await uiObject?.setFieldValue(
            "TSADateField",
            "2005-07-27T09:00:00Z",
            true
          );
          await uiObject?.setFieldValue(
            "TSADateTimeField",
            "2005-07-27T01:00:00Z",
            true
          );
          await uiObject?.setFieldValue(
            "TSADecimalField",
            randZip.toFixed(6),
            true
          );
          await uiObject?.setFieldValue(
            "TSANumberField",
            randZip.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "TSACurrencyField",
            randZip.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "TSACheckboxField",
            (!randBool).toString(),
            true
          );
          await uiObject?.setFieldValue(
            "TSAEmailField",
            "dor.s@pepperi.com",
            true
          );
          await uiObject?.setFieldValue(
            "TSAPhoneField",
            randZip.toString(),
            true
          );
          await uiObject?.setFieldValue("TSALinkField", "www.google.com", true);
          await uiObject?.setFieldValue(
            "TSAHTMLField",
            HTML + "<h1>now I'm saved!</h1>",
            true
          );
          //===================================SystemFields=================================
          const status = 2;
          await uiObject?.setFieldValue("ExternalID", name, true);
          await uiObject?.setFieldValue("Remark", ExID), true;
          await uiObject?.setFieldValue(
            "DiscountPercentage",
            randDays.toString(),
            true
          );
          await uiObject?.setFieldValue("BillToName", phrase, true);
          await uiObject?.setFieldValue(
            "BillToStreet",
            accounDataArr[accountGeoIndex].Street,
            true
          );
          await uiObject?.setFieldValue(
            "BillToCity",
            accounDataArr[accountGeoIndex].City,
            true
          );
          await uiObject?.setFieldValue(
            "BillToZipCode",
            randDays.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "BillToPhone",
            randZip.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "QuantitiesTotal",
            randDays.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "DeliveryDate",
            "2005-07-27T01:00:00Z",
            true
          );
          await uiObject?.setFieldValue(
            "Status",
            (status + 2).toString(),
            true
          );
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLAT",
            accounDataArr[accountGeoIndex].Latitude!.toString(),
            true
          );
          await uiObject?.setFieldValue(
            "SubmissionGeoCodeLNG",
            accounDataArr[accountGeoIndex].Longtitude!.toString(),
            true
          );
          await uiObject?.setFieldValue("ShipToName", phrase, true);
          await uiObject?.setFieldValue(
            "ShipToStreet",
            accounDataArr[accountGeoIndex].Street,
            true
          );
          await uiObject?.setFieldValue(
            "ShipToCity",
            accounDataArr[accountGeoIndex].City,
            true
          );
          await uiObject?.setFieldValue(
            "ShipToZipCode",
            randDays.toString(),
            true
          );
          await uiObject?.setFieldValue("SubTotal", randDays.toString(), true);
          await uiObject?.setFieldValue(
            "SubTotalAfterItemsDiscount",
            (randDays * randDiscount).toString(),
            true
          );
          await uiObject?.setFieldValue(
            "GrandTotal",
            (randDays * randDiscount * quantitiesTotal).toString(),
            true
          );
          //===============================GET====================================
          //===============================TSA's==================================
          const getTSASingleLineText = await dataObject?.getFieldValue(
            "TSASingleLineText"
          );
          expect(getTSASingleLineText, "fell on TSASingleLineText")
            .that.is.a("string")
            .and.is.equal(phrase + randZip);

          const getTSALimitedLineText = await dataObject?.getFieldValue(
            "TSALimitedLineText"
          );
          expect(getTSALimitedLineText, "fell on getTSALimitedLineText")
            .that.is.a("string")
            .and.is.equal(phrase + randZip);

          const getTSAParagraphText = await dataObject?.getFieldValue(
            "TSAParagraphText"
          );
          expect(getTSAParagraphText, "fell on getTSAParagraphText")
            .that.is.a("string")
            .and.is.equal(phrase + randZip);

          const getTSADateField = await dataObject?.getFieldValue(
            "TSADateField"
          );
          const formattedDate = dateFormatter(getTSADateField);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal("2005-07-27");

          const getTSADateTimeField = await dataObject?.getFieldValue(
            "TSADateTimeField"
          );
          expect(getTSADateTimeField, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal("2005-07-27T00:00:00Z");

          const getTSADecimalField = await dataObject?.getFieldValue(
            "TSADecimalField"
          );
          expect(getTSADecimalField, "fell on getTSADecimalField")
            .to.be.a("number")
            .and.is.equal(+randZip.toFixed(6));

          const getTSANumberField = await dataObject?.getFieldValue(
            "TSANumberField"
          );
          expect(getTSANumberField, "fell on getTSANumberField")
            .to.be.a("number")
            .and.is.equal(randZip);

          const getTSACurrencyField = await dataObject?.getFieldValue(
            "TSACurrencyField"
          );
          expect(getTSACurrencyField, "fell on getTSACurrencyField")
            .to.be.a("number")
            .and.is.equal(randZip);

          const getTSACheckboxField = await dataObject?.getFieldValue(
            "TSACheckboxField"
          );
          expect(getTSACheckboxField, "fell on getTSACheckboxField")
            .to.be.a("boolean")
            .and.is.equal(!randBool);

          const getTSAEmailField = await dataObject?.getFieldValue(
            "TSAEmailField"
          );
          expect(getTSAEmailField, "fell on getTSAEmailField")
            .to.be.a("string")
            .and.is.equal("dor.s@pepperi.com");

          const getTSAPhoneField = await dataObject?.getFieldValue(
            "TSAPhoneField"
          );
          expect(getTSAPhoneField, "fell on getTSAPhoneField")
            .to.be.a("string")
            .and.is.equal(randZip.toString());

          const getTSALinkField = await dataObject?.getFieldValue(
            "TSALinkField"
          );
          expect(getTSALinkField, "fell on getTSALinkField")
            .to.be.a("string")
            .and.is.equal("www.google.com");

          const getTSAHTMLField = await dataObject?.getFieldValue(
            "TSAHTMLField"
          );
          expect(getTSAHTMLField, "fell on getTSAHTMLField")
            .to.be.a("string")
            .and.is.equal(HTML + "<h1>now I'm saved!</h1>");
          //================================SystemFields==============================
          const getExID = await dataObject?.getFieldValue("ExternalID");
          expect(getExID).that.is.a("string").and.is.equal(ExID); //negative

          const getRemark = await dataObject?.getFieldValue("Remark");
          expect(getRemark, "Failed on getRemark")
            .that.is.a("string")
            .and.is.equal(ExID);

          const getBillToName = await dataObject?.getFieldValue("BillToName");
          expect(getBillToName, "Failed on getBillToName")
            .that.is.a("string")
            .and.is.equal(phrase);

          const getBillToStreet = await dataObject?.getFieldValue(
            "BillToStreet"
          );
          expect(getBillToStreet, "Failed on getBillToStreet")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street);

          const getBillToZipCode = await dataObject?.getFieldValue(
            "BillToZipCode"
          );
          expect(getBillToZipCode, "Failed on getBillToZipCode")
            .that.is.a("string")
            .and.is.equal(randDays.toString());

          const getBillToPhone = await dataObject?.getFieldValue("BillToPhone");
          expect(getBillToPhone, "Failed on getBillToPhone")
            .that.is.a("string")
            .and.is.equal(randZip.toString());

          const getBillToCity = await dataObject?.getFieldValue("BillToCity");
          expect(getBillToCity, "Failed on getBillToCity")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City);

          const getDiscountPercentage = await dataObject?.getFieldValue(
            "DiscountPercentage"
          );
          expect(getDiscountPercentage, "Failed on getDiscountPercentage")
            .that.is.a("number")
            .and.is.equal(+randDays.toFixed(4));

          const getQuantitiesTotal = await dataObject?.getFieldValue(
            "QuantitiesTotal"
          ); 
          expect(getQuantitiesTotal, "Failed on getQuantitiesTotal")
            .that.is.a("number")
            .and.is.equal(quantitiesTotal);

          const getDeliveryDate = await dataObject?.getFieldValue(
            "DeliveryDate"
          ); //currently not working
          let formattedDate2 = dateFormatter(getDeliveryDate);
          // expect(getDeliveryDate, "Fell on getDeliveryDate")
          //   .to.be.a("string")
          //   .and.is.equal("27-07-2005");

          const getStatus = await dataObject?.getFieldValue("Status");
          expect(getStatus, "Failed on getStatus")
            .to.be.a("number")
            .and.is.equal(status);

          const getLat = await dataObject?.getFieldValue(
            "SubmissionGeoCodeLAT"
          );
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat, "Failed on getLat")
            .to.be.a("number")
            .and.is.equal(latToNum);

          const getLng = await dataObject?.getFieldValue(
            "SubmissionGeoCodeLNG"
          );
          const lngToNum =
            +accounDataArr[accountGeoIndex].Longtitude!.toFixed(4);
          expect(getLng, "Failed on getLng")
            .to.be.a("number")
            .and.is.equal(lngToNum);

          const getShipToName = await dataObject?.getFieldValue("ShipToName");
          expect(getShipToName, "Failed on getShipToName")
            .to.be.a("string")
            .and.is.equal(phrase);

          const getShipToStreet = await dataObject?.getFieldValue(
            "ShipToStreet"
          );
          expect(getShipToStreet, "Failed on getShipToStreet")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street);

          const getShipToCity = await dataObject?.getFieldValue("ShipToCity");
          expect(getShipToCity, "Failed on getShipToCity")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City);

          const getShipToZipCode = await dataObject?.getFieldValue(
            "ShipToZipCode"
          );
          expect(getShipToZipCode, "Failed on getShipToZipCode")
            .to.be.a("string")
            .and.is.equal(randDays.toString());

          const getSubTotal = await dataObject?.getFieldValue("SubTotal");
          expect(getSubTotal, "Failed on getSubTotal")
            .to.be.a("number")
            .that.is.equal(+randZip.toFixed(2));

          const getSubTotalAfterItemsDiscount = await dataObject?.getFieldValue(
            "SubTotalAfterItemsDiscount"
          );
          expect(
            getSubTotalAfterItemsDiscount,
            "Failed on getSubTotalAfterItemsDiscount"
          )
            .to.be.a("number")
            .that.is.equal(+(randZip * randDiscount).toFixed(4));

          const getGrandTotal = await dataObject?.getFieldValue("GrandTotal");
          expect(getGrandTotal, "Failed on getGrandTotal")
            .to.be.a("number")
            .that.is.equal(
              +(randZip * randDiscount * quantitiesTotal).toFixed(4)
            );

          console.log(
            "%cDetails - Save - UIObject Finished CRUD testing!",
            "color: #bada55"
          );
        });

        it("CRUD testing on Account Details UIObject", async () => {

          console.log(
            "%cDetails - Accounts - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          AccDetailsUIPage.rebuild();
          accUIObject = AccDetailsUIPage.uiObject;
          console.log("Acc ui details form");
          console.log(AccDetailsUIPage);
          console.log(accUIObject);

          //===========================SET===========================================
          await accUIObject?.setFieldValue(
            "TSACheckboxAcc",
            (!randBool).toString()
          );
          await accUIObject?.setFieldValue(
            "TSACurrencyAcc",
            randZip.toString()
          );
          await accUIObject?.setFieldValue("TSANumberAcc", randZip.toString());
          await accUIObject?.setFieldValue("TSADateAcc", dateOnly);
          await accUIObject?.setFieldValue("TSADateTimeAcc", date);
          await accUIObject?.setFieldValue(
            "TSADecimalAcc",
            (randDiscount + quantitiesTotal).toFixed(6)
          );
          await accUIObject?.setFieldValue("TSAEmailAcc", "dor.s@pepperi.com");
          await accUIObject?.setFieldValue("TSAHTMLAcc", HTML + HTML);
          await accUIObject?.setFieldValue(
            "TSALimitedLineTextAcc",
            phrase + randZip
          );
          await accUIObject?.setFieldValue(
            "TSAParagraphTextAcc",
            phrase + randZip
          );
          await accUIObject?.setFieldValue(
            "TSASingleLineTextAcc",
            phrase + randZip
          );
          await accUIObject?.setFieldValue(
            "TSALinkAcc",
            "https://www.google.com"
          );
          await accUIObject?.setFieldValue("TSAPhoneAcc", randZip.toString());
          await accUIObject?.setFieldValue("ExternalID", name);
          await accUIObject?.setFieldValue(
            "City",
            accounDataArr[accountGeoIndex].City
          );
          await accUIObject?.setFieldValue(
            "Discount",
            (randDiscount + 0.5).toString()
          );
          await accUIObject?.setFieldValue("Fax", randZip.toString());
          await accUIObject?.setFieldValue("Mobile", randZip.toString());
          await accUIObject?.setFieldValue("Phone", randZip.toString());
          await accUIObject?.setFieldValue("Name", phrase);
          await accUIObject?.setFieldValue("Note", phrase + randDays);
          await accUIObject?.setFieldValue("ZipCode", randDays.toString());
          await accUIObject?.setFieldValue("Status", status.toString());
          await accUIObject?.setFieldValue(
            "Street",
            accounDataArr[accountGeoIndex].Street
          );
          //===============================GET================================
          const getTSACheckboxAcc = await accUIObject?.getUIField(
            "TSACheckboxAcc"
          );
          console.log(getTSACheckboxAcc);
          expect(getTSACheckboxAcc?.value, "Failed on getTSACheckboxAcc.value")
            .to.be.a("string")
            .that.is.equal((!randBool).toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSACheckboxAcc?.formattedValue,
              "Failed on getTSACheckboxAcc.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal((!randBool).toString()).and.is.not.null.and.is.not
              .undefined;

          const getTSACurrencyAcc = await accUIObject?.getUIField(
            "TSACurrencyAcc"
          );
          const strCur = formatter.format(randZip);
          const resultCur = strCur.substr(1) + strCur.substr(0, 1);
          expect(getTSACurrencyAcc?.value, "Failed on getTSACurrencyAcc.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSACurrencyAcc?.formattedValue,
              "Failed on getTSACurrencyAcc.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultCur).and.is.not.null.and.is.not.undefined;

          const getTSANumberAcc = await accUIObject?.getUIField("TSANumberAcc");
          expect(getTSANumberAcc?.value, "Failed on getTSANumberAcc.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSANumberAcc?.formattedValue,
              "Failed on getTSANumberAcc.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getTSADateAcc = await accUIObject?.getUIField("TSADateAcc");
          console.log(getTSADateAcc?.value);
          console.log(getTSADateAcc?.formattedValue);
          const formattedDate = dateFormatter(getTSADateAcc!.value);
          expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is
            .not.null.and.is.not.undefined;

          const getTSADateTimeAcc = await accUIObject?.getUIField(
            "TSADateTimeAcc"
          );
          console.log(getTSADateTimeAcc?.value);
          console.log(getTSADateTimeAcc?.formattedValue);
          let formattedDateTime: any = dateFormatter(
            getTSADateTimeAcc!.value,
            true,
            true
          );
          const expectedDateTimeValue = dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeAcc")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);

          const getTSADecimalAcc = await accUIObject?.getUIField(
            "TSADecimalAcc"
          );
          expect(getTSADecimalAcc?.value, "fell on getTSADecimalAcc.value")
            .to.be.a("string")
            .and.is.equal((randDiscount + quantitiesTotal).toFixed(6)).and.is
            .not.null.and.is.not.undefined,
            expect(
              getTSADecimalAcc?.formattedValue,
              "fell on getTSADecimalAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal((randDiscount + quantitiesTotal).toFixed(6)).and.is
              .not.null.and.is.not.undefined;

          const getTSAEmailAcc = await accUIObject?.getUIField("TSAEmailAcc");
          expect(getTSAEmailAcc?.value, "fell on TSAEmailAcc.value")
            .to.be.a("string")
            .and.is.equal("dor.s@pepperi.com").and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSAEmailAcc?.formattedValue,
              "fell on TSAEmailAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal("dor.s@pepperi.com").and.is.not.null.and.is.not
              .undefined;

          const getTSAHTMLAcc = await accUIObject?.getUIField("TSAHTMLAcc");
          expect(getTSAHTMLAcc?.value, "fell on TSAHTMLAcc.value")
            .to.be.a("string")
            .and.is.equal(HTML + HTML).and.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc?.formattedValue,
              "fell on TSAHTMLAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML + HTML).and.is.not.null.and.is.not.undefined;

          const getTSASingleLineTextAcc = await accUIObject?.getUIField(
            "TSASingleLineTextAcc"
          );

          expect(
            getTSASingleLineTextAcc?.value,
            "fell on TSASingleLineTextAcc.value"
          )
            .to.be.is.a("string")
            .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSASingleLineTextAcc?.formattedValue,
              "fell on TSASingleLineTextAcc.formattedValue"
            )
              .to.be.is.a("string")
              .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
              .undefined;

          const getTSALimitedLineTextAcc = await accUIObject?.getUIField(
            "TSALimitedLineTextAcc"
          );
          expect(
            getTSALimitedLineTextAcc?.value,
            "fell on TSALimitedLineTextAcc.value"
          )
            .to.be.a("string")
            .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSALimitedLineTextAcc?.formattedValue,
              "fell on TSALimitedLineTextAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
              .undefined;

          const getTSAParagraphTextAcc = await accUIObject?.getUIField(
            "TSAParagraphTextAcc"
          );
          expect(
            getTSAParagraphTextAcc?.value,
            "fell on TSAParagraphTextAcc.value"
          )
            .to.be.a("string")
            .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSAParagraphTextAcc?.formattedValue,
              "fell on TSAParagraphTextAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(phrase + randZip).and.is.not.null.and.is.not
              .undefined;

          const getTSALinkAcc = await accUIObject?.getUIField("TSALinkAcc");
          expect(getTSALinkAcc?.value, "fell on getTSALinkAcc.value")
            .to.be.a("string")
            .and.is.equal("dor.s@pepperi.com").and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSALinkAcc?.formattedValue,
              "fell on getTSALinkAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(link).and.is.not.null.and.is.not.undefined;

          const getTSAPhoneAcc = await accUIObject?.getUIField("TSAPhoneAcc");
          expect(getTSAPhoneAcc?.value, "fell on getTSAPhoneAcc.value")
            .to.be.a("string")
            .and.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSAPhoneAcc?.formattedValue,
              "fell on getTSAPhoneAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getExID = await accUIObject?.getUIField("ExternalID");
          expect(getExID?.value, "Failed on ExternalID.value")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined,
            expect(
              getExID?.formattedValue,
              "Failed on ExternalID.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(name).and.is.not.null.and.is.not.undefined;

          const getName = await accUIObject?.getUIField("Name");
          expect(getName?.value, "Failed on Name.value")
            .to.be.a("string")
            .that.is.equal(phrase).and.is.not.null.and.is.not.undefined,
            expect(getName?.formattedValue, "Failed on Name.formattedValue")
              .to.be.a("string")
              .that.is.equal(phrase).and.is.not.null.and.is.not.undefined;

          const getNote = await accUIObject?.getUIField("Note");
          expect(getNote?.value, "Failed on Note.value")
            .to.be.a("string")
            .that.is.equal(phrase + randDays).and.is.not.null.and.is.not
            .undefined,
            expect(getNote?.formattedValue, "Failed on Note.formattedValue")
              .to.be.a("string")
              .that.is.equal(phrase + randDays).and.is.not.null.and.is.not
              .undefined;

          const getZipCode = await accUIObject?.getUIField("ZipCode");
          expect(getZipCode?.value, "Failed on ZipCode.value")
            .to.be.a("string")
            .that.is.equal(randDays.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getZipCode?.formattedValue,
              "Failed on ZipCode.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(randDays.toString()).and.is.not.null.and.is.not
              .undefined;

          const getCity = await accUIObject?.getUIField("City");
          expect(getCity?.value, "Failed on City.value")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null
            .and.is.not.undefined,
            expect(getCity?.formattedValue, "Failed on City.formattedValue")
              .to.be.a("string")
              .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not
              .null.and.is.not.undefined;

          const getStreet = await accUIObject?.getUIField("Street");
          expect(getStreet?.value, "Failed on Street.value")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not
            .null.and.is.not.undefined,
            expect(getStreet?.formattedValue, "Failed on Street.formattedValue")
              .to.be.a("string")
              .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not
              .null.and.is.not.undefined;

          const getDiscount = await accUIObject?.getUIField("Discount");
          expect(getDiscount?.value, "Failed on Discount.value")
            .to.be.a("string")
            .that.is.equal(randDiscount.toFixed(4)).and.is.not.null.and.is.not
            .undefined,
            expect(
              getDiscount?.formattedValue,
              "Failed on Discount.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(randDiscount.toFixed(4)).and.is.not.null.and.is.not
              .undefined;

          const getFax = await accUIObject?.getUIField("Fax");
          expect(getFax?.value, "Failed on Fax.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(getFax?.formattedValue, "Failed on Fax.formattedValue")
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getPhone = await accUIObject?.getUIField("Phone");
          expect(getPhone?.value, "Failed on Phone.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(getPhone?.formattedValue, "Failed on Phone.formattedValue")
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getMobile = await accUIObject?.getUIField("Fax");
          expect(getMobile?.value, "Failed on Mobile.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(getMobile?.formattedValue, "Failed on Mobile.formattedValue")
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;


              console.log(
                "%cDetails - Accounts - UIObject Finished CRUD testing!",
                "color: #bada55"
              );
        });
      });
      break;
    }

    case "error": {
      console.log(
        "%cThe test name you've inserted does not exist,try again with 'Data' or 'UI1/2'",
        "color: #FF0000"
      );
      break;
    }
  }
  const testResult = await tester.run();
  res.json(testResult);
});
