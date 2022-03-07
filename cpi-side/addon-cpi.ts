import "@pepperi-addons/cpi-node";
import Tester from "./tester";
import {
  GeneralActivity,
  Item,
  TransactionLine,
  UIField,
  User,
  Account,
  Contact,
  Transaction,
} from "@pepperi-addons/cpi-node";
import generalService from "./services/general.service";
import  DataService, {
  OCEvents,
  GENERIC_DATA_VIEWS,
  accounDataArr,
  fieldTypeObj,
  screenSize,
  addonUUID,
  adalTableName,
} from "./services/data.service";

//**Test data variables */
let accountGeoIndex: number;
let randZip: number;
let randDiscount: number;
let randPhone: string;
let quantitiesTotal: number;
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
let interceptorArr: number[];
let preLoadGetLine: TransactionLine | undefined | number = 1;
let preLoadGetLines: TransactionLine[] | undefined;
let onLoadGetLine: TransactionLine | undefined;
let onLoadGetLines: TransactionLine[] | undefined;


/**initiates test data for all objects - cannot be moved to general.service due to it using variables from this file */
export async function initTestData(
  dataObject:
    | Transaction
    | TransactionLine
    | Account
    | GeneralActivity
    | Contact
    | User
    | Item,
  resource: string
): Promise<
  | Transaction
  | TransactionLine
  | Account
  | GeneralActivity
  | Contact
  | User
  | Item
  | undefined
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
      break;
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
      break;
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
      break;
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
      break;
    }
    //init contacts for automation test
    case "contacts": {
      await dataObject?.setFieldValue("ExternalID", ExID);
      await dataObject?.setFieldValue("BirthDay", dateOnly);
      await dataObject?.setFieldValue("Email", userEmail);
      await dataObject?.setFieldValue("Email2", userEmail);
      await dataObject?.setFieldValue("FirstName", name);
      await dataObject?.setFieldValue("LastName", phrase);
      await dataObject?.setFieldValue("Mobile", randPhone);
      await dataObject?.setFieldValue("Phone", randPhone);
      await dataObject?.setFieldValue("Status", 2);
      await dataObject?.setFieldValue("TSACheckboxCnct", randBool);
      await dataObject?.setFieldValue("TSACurrencyCnct", randZip);
      await dataObject?.setFieldValue("TSADateCnct", dateOnly);
      await dataObject?.setFieldValue("TSADateTimeCnct", dateTime + "Z");
      await dataObject?.setFieldValue("TSADecimalCnct", randDiscount);
      await dataObject?.setFieldValue("TSAEmailCnct", userEmail);
      await dataObject?.setFieldValue("TSAHTMLCnct", HTML);
      await dataObject?.setFieldValue(
        "TSALimitedLineTextCnct",
        phrase + randZip
      );
      await dataObject?.setFieldValue("TSAParagraphTextCnct", phrase + randZip);
      await dataObject?.setFieldValue(
        "TSASingleLineTextCnct",
        phrase + randZip
      );
      await dataObject?.setFieldValue("TSALinkCnct", link);
      await dataObject?.setFieldValue("TSANumberCnct", randZip);
      await dataObject?.setFieldValue("TSAPhoneCnct", randPhone);
      break;
    }
    //init users for automation test
    case "users": {
      await dataObject?.setFieldValue("FirstName", name);
      await dataObject?.setFieldValue("LastName", phrase);
      await dataObject?.setFieldValue("Phone", randPhone);
      await dataObject?.setFieldValue("Mobile", randPhone);
      break;
    }
    //init items for automation test - not in use
    case "items": {
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

      await dataObject?.setFieldValue("TSADate", dateOnly);
      await dataObject?.setFieldValue("TSADateTime", date);
      await dataObject?.setFieldValue("TSADecimal", randDiscount.toFixed(6));
      await dataObject?.setFieldValue("TSANumber", quantitiesTotal);
      await dataObject?.setFieldValue("TSACurrency", quantitiesTotal);
      await dataObject?.setFieldValue("TSACheckbox", randBool);
      await dataObject?.setFieldValue("TSAEmail", userEmail);
      await dataObject?.setFieldValue("TSAPhone", randPhone);
      await dataObject?.setFieldValue("TSALink", link);
      await dataObject?.setFieldValue("TSAHTML", HTML);
      //Setup for system fields
      await dataObject?.setFieldValue("UPC", ExID);
      await dataObject?.setFieldValue("Name", name);
      await dataObject?.setFieldValue("LongDescription", name);
      await dataObject?.setFieldValue("Price", quantitiesTotal);
      break;
    }
  }
  return dataObject;
}

/** Load function - setup for interceptors/load tests*/
export async function load(configuration: any) {
  console.log("cpi side works!");
  console.log("Setting up test variables");
  const dataService = new DataService();

  accountGeoIndex = await dataService.getAccountGeoIndex();
  randZip = await dataService.getRandZip();
  randDiscount = await dataService.getRandDiscount();
  randPhone = await dataService.getRandPhone();
  quantitiesTotal = await dataService.getQuantitiesTotal();
  userEmail = await dataService.getEmail();
  name = await dataService.getName();
  phrase = await dataService.getPhrase();
  randBool = await dataService.getRandBool();
  ExID = await dataService.getExID();
  rand30 = await dataService.getRand30();
  rand60 = await dataService.getRand60();
  rand90 = await dataService.getRand90();
  randAbove = await dataService.getRandAbove();
  date = await dataService.getDate();
  dateTime = await dataService.getDateTime(date,true);
  dateOnly = await dataService.getDateOnly(date);
  link = await dataService.getLink();
  HTML = await dataService.getHTML();
  randDays = await dataService.getRandDays();
  interceptorArr = [];
  console.log("Finished setting up test variables");
  const clientActionsTestActive = true;
  if(clientActionsTestActive === true) {

  pepperi.events.intercept(
    OCEvents.Button,
    { FieldID: "TSAAlert" },
    async (data, next, main) => {
      console.log("button pressed! on alert");
      const alert = await pepperi.client.alert("my first alert","putin is douchebag");
      const confirm = await pepperi.client.confirm("this is a confirm","putin is a huylo");
      // const alert2 = await pepperi.client.alert("my first alert","putin is douchebag");
      // const alert3 = await pepperi.client.alert("my first alert","putin is douchebag");
      console.log(alert);
      console.log(confirm);
      await next(main);
    }
  );

  pepperi.events.intercept(
    OCEvents.Button,
    { FieldID: "TSAHUD" },
    async (data, next, main) => {
      console.log("button pressed! on hud");
      const options = {
        canceled:false,
        result: "yeye"
      };
      //const hud = await pepperi.client.showHUD(options);
      //console.log(hud);
      await next(main);
    }
  );

  pepperi.events.intercept(
    OCEvents.Button,
    { FieldID: "TSACaptureGeo" },
    async (data, next, main) => {
      console.log("button pressed! on captureGeo");
      //const alert = pepperi.client.alert("my first alert","putin is douchebag");
     // console.log(alert);
      await next(main);
    }
  );

  pepperi.events.intercept(
    OCEvents.Button,
    { FieldID: "TSAScanBarcode" },
    async (data, next, main) => {
      console.log("button pressed! on scanBarcode");
      //const alert = pepperi.client.alert("my first alert","putin is douchebag");
      //console.log(alert);
      await next(main);
    }
  );

  }

  //====================================ADAL================================================
  //need to add trigger to adal table for TransactionScope test -> when preparing server side
  const adalData = await pepperi.api.adal
    .get({
      addon: addonUUID,
      table: adalTableName,
      key: "testKey1",
    })
    .then((obj) => obj.object);
  //console.log(adalData);
  const loadTestActive = adalData.TestActive;
  const loadTestCounter = adalData.TestRunCounter;
  const InterceptorsTestActive = adalData.InterceptorsTestActive;
  const TrnScopeTestActive = adalData.TrnScopeTestActive;
  
  console.log("LoadTester::loadTestActive: " + loadTestActive);
  console.log("LoadTester::counter: " + loadTestCounter);
  console.log(
    "InterceptorTester::InterceptorTestActive: " + InterceptorsTestActive
  );
  console.log(
    "TrnScopeTester::TrnScopeTestActive: " + TrnScopeTestActive
  );

  if (TrnScopeTestActive === true) {
    //========================TransactionScope Interceptors===================================
    pepperi.events.intercept(OCEvents.preLoad, {}, async (data, next, main) => {
      console.log("preLoadTransactionScope interceptor");
      let itemRes = await pepperi.api.items.get({
        key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
        fields: ["InternalID", "ExternalID", "UUID"],
      });

      let itemUUID = itemRes.object.UUID;

      let itemDataObject: Item | undefined = await pepperi.DataObject.Get(
        "items",
        itemUUID
      );
      const Transaction = data.DataObject as Transaction;
      //saving data in global variable (saves only when test runs)
      preLoadGetLine = await Transaction.transactionScope?.getLine(
        itemDataObject as Item
      ); // should get undefined
      preLoadGetLines = await Transaction.transactionScope?.getLines(); // should return empty array
      interceptorArr.push(0); //checking order of interceptors
    });

    pepperi.events.intercept(OCEvents.onLoad, {}, async (data, next, main) => {
      console.log("OnLoadTransactionScope interceptor");
      let itemRes = await pepperi.api.items.get({
        key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
        fields: ["InternalID", "ExternalID", "UUID"],
      });

      let itemUUID = itemRes.object.UUID;

      let itemDataObject: Item | undefined = await pepperi.DataObject.Get(
        "items",
        itemUUID
      );
      const Transaction = data.DataObject as Transaction;
      //saving data in global variable (saves only when test runs)
      onLoadGetLine = await Transaction.transactionScope?.getLine(
        itemDataObject as Item
      ); // should return item normally -> accepts itemDataObject
      onLoadGetLines = await Transaction.transactionScope?.getLines(); // should return all catalog items
      interceptorArr.push(1); //checking order of interceptors
    });
  }

  //==========================Load inserts into UDT/ADAL====================================
  if (
    loadTestActive === true &&
    (loadTestCounter === 0 || loadTestCounter === 1)
  ) {
    console.log("LoadTester::Inside load test if");
    //insert one line into UDT after the each load occured
    const date = new Date();
    console.log(
      "LoadTester::write to UDT by the " +
        loadTestCounter +
        " Index, TimeStamp: " +
        date.toISOString()
    );
    try {
      await pepperi.api.userDefinedTables.upsert({
        table: "LoadUDT",
        mainKey: date.toISOString(),
        secondaryKey: loadTestCounter.toString(),
        value: date.toISOString(),
      });
    } catch (err) {
      console.log("LoadTester::issue detected on UDT insert.");
      console.log(err);
    }
  }
  if (InterceptorsTestActive === true) {
    //=======================Interceptors test setup======================================
    //==================================Recalculate interceptors==========================
    pepperi.events.intercept(
      OCEvents.Recalculate,
      { UIObject: { context: { Name: "AccountForm" } } },
      async (data, next, main) => {
        console.log("InterceptorsTester::Recalculate 1 - before main");
        interceptorArr.push(22);
        await next(main);
        main = async (data) => {
          console.log("InterceptorsTester::Recalculate 1 - inside main");
          interceptorArr.push(42);
        };
        console.log("InterceptorsTester::Recalculate 1 - after main");
        interceptorArr.push(31);
        console.log(interceptorArr);
        try {
          const upsert = await pepperi.api.userDefinedTables.upsert({
            table: "InterceptorsUDT",
            mainKey: new Date().toISOString(),
            secondaryKey: "TestResults",
            value: interceptorArr.toString(),
          });
          console.log(upsert);
        } catch (err) {
          console.log(err);
        }
      }
    );
    pepperi.events.intercept(
      OCEvents.Recalculate,
      { UIObject: { context: { Name: "AccountForm" } } },
      async (data, next, main) => {
        console.log("InterceptorsTester::Recalculate 2 - before main");
        interceptorArr.push(23);
        await next(main);
        await next(async (data) => {
          console.log("InterceptorsTester::Recalculate 2 - inside main");
          interceptorArr.push(43);
        });
        console.log("InterceptorsTester::Recalculate 2 - after main");
        interceptorArr.push(30);
      }
    );
    pepperi.events.intercept(
      OCEvents.Recalculate,
      { UIObject: { Context: { name: "AccountForm" } } },
      async (data, next, main) => {
        console.log("InterceptorsTester::Recalculate 3 - before main");
        if (interceptorArr[interceptorArr.length - 1] === 23) {
          interceptorArr.push(24);
        } else {
          interceptorArr.push(27);
        }
        await next(async (data) => {
          console.log("InterceptorsTester::Recalculate 3 - inside main");
          if (interceptorArr[interceptorArr.length - 1] === 24) {
            interceptorArr.push(25);
          } else {
            interceptorArr.push(28);
          }
        });
        console.log("InterceptorsTester::Recalculate 3 - after main");
        if (interceptorArr[interceptorArr.length - 1] === 25) {
          interceptorArr.push(26);
        } else {
          interceptorArr.push(29);
        }
      }
    );
    //Lines
    //====================IncrementFieldValue - BELOW LOGIC FOR IncrementFieldValue IS READY========================
    pepperi.events.intercept(
      OCEvents.Increment,
      { FieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::IncrementFieldValue 1 - before main");
        interceptorArr.push(8);
        main = async () => {
          console.log("InterceptorsTester::IncrementFieldValue 1 - main");
          interceptorArr.push(11);
        };
        await next(main);
        console.log("InterceptorsTester::IncrementFieldValue 1 - after main");
        interceptorArr.push(14);
        console.log(interceptorArr);
      }
    );
    pepperi.events.intercept(
      OCEvents.Increment,
      { FieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::IncrementFieldValue 2 - before main");
        interceptorArr.push(9);
        await next(main);
        main = async () => {
          console.log("InterceptorsTester::IncrementFieldValue 2 - main");
          interceptorArr.push(10);
        };
        console.log("InterceptorsTester::IncrementFieldValue 2 - after main");
        interceptorArr.push(13);
      }
    );
    pepperi.events.intercept(
      OCEvents.Increment,
      { fieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::IncrementFieldValue 3 - before main");
        interceptorArr.push(10);
        await next(main);
        console.log("InterceptorsTester::IncrementFieldValue 3 - after main");
        interceptorArr.push(12);
      }
    );
    //=====================DecrementFieldValue events==================================
    pepperi.events.intercept(
      OCEvents.Decrement,
      { FieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::DecrementFieldValue 1 - before main");
        interceptorArr.push(15);
        await next(main);
        console.log("InterceptorsTester::DecrementFieldValue 1 - after main");
        interceptorArr.push(21);
        console.log(interceptorArr);
      }
    );
    pepperi.events.intercept(
      OCEvents.Decrement,
      { FieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::DecrementFieldValue 2 - before main");
        interceptorArr.push(16);
        await next(async (data) => {
          console.log("InterceptorsTester::DecrementFieldValue 2 - main");
          interceptorArr.push(19);
        });
        console.log("InterceptorsTester::DecrementFieldValue 2 - after main");
        interceptorArr.push(20);
      }
    );
    pepperi.events.intercept(
      OCEvents.Decrement,
      { fieldID: "UnitsQuantity" },
      async (data, next, main) => {
        console.log("InterceptorsTester::DecrementFieldValue 3 - before main");
        interceptorArr.push(17);
        main = async () => {
          console.log("InterceptorsTester::DecrementFieldValue 3 - main");
          interceptorArr.push(77);
        };
        console.log("InterceptorsTester::DecrementFieldValue 3 - after main");
        interceptorArr.push(18);
      }
    );
    //header -- BELOW LOGIC FOR SETFIELDVALUE IS READY
    pepperi.events.intercept(
      OCEvents.SetField,
      { FieldID: "TSAInterceptorTrigger" },
      async (data, next, main) => {
        console.log("InterceptorsTester::SetFieldValue 1 - before main");
        interceptorArr.push(1);
        await next(main);
        main = async () => {
          console.log("InterceptorsTester::SetFieldValue 1 - inside main");
          interceptorArr.push(42);
        };
        console.log("InterceptorsTester::SetFieldValue 1 - after main");
        interceptorArr.push(7);
        console.log(interceptorArr);
      }
    );
    pepperi.events.intercept(
      OCEvents.SetField,
      { FieldID: "TSAInterceptorTrigger" },
      async (data, next, main) => {
        console.log("InterceptorsTester::SetFieldValue 2 - before main");
        interceptorArr.push(2);
        await next(main);
        console.log("InterceptorsTester::SetFieldValue 2 - after main");
        interceptorArr.push(6);
      }
    );
    pepperi.events.intercept(
      OCEvents.SetField,
      { fieldID: "TSAInterceptorTrigger" },
      async (data, next, main) => {
        console.log("InterceptorsTester::SetFieldValue 3 - before main");
        interceptorArr.push(3);
        await next(async () => {
          console.log("InterceptorsTester::SetFieldValue 3 - inside main");
          interceptorArr.push(4);
        });
        console.log("InterceptorsTester::SetFieldValue 3 - after main");
        interceptorArr.push(5);
      }
    );
  }
}

export const router = Router();
//debugger for specific code chunks
router.use("/debug-tester", async (req, res) => {
  console.log(
    "Start"
  );
  console.log("end");

});
/**Automation tests for CPINode */
router.use("/automation-tests/:v/tests", async (req, res) => {
  console.log("inside main test function CPISide");
  const service = new generalService();
  const { describe, it, expect, run } = Tester("My test");
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

  let formatterUS = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 6, // (this suffices for whole numbers, but will print 2500.10 as $2,500.100000)
  });

  const uiHomePage = await pepperi.UIPage.Create("Home");
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

  let itemRes = await pepperi.api.items.get({
    key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
    fields: ["InternalID", "ExternalID", "UUID"],
  });

  let itemUUID = itemRes.object.UUID;

  let cnctRes = await pepperi.app.contacts.add({
    references: { account: { UUID: accountUUID } },
    object: { ExternalID: ExID },
  });

  const cnctUUID = cnctRes.id;

  let itemResTypeDef = await pepperi.api.items.get({
    key: { UUID: "E05D2C82-B236-4075-9587-7C52A3CB6021" }, //CG2
    fields: ["InternalID", "ExternalID", "UUID"],
  });

  let itemTypeDefUUID = itemResTypeDef.object.UUID;
  let itemDataObjectTypeDef = await pepperi.DataObject.Get(
    "items",
    itemTypeDefUUID
  );

  let dataObject = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let lineDataObject = await pepperi.DataObject.Get(
    "transaction_lines",
    lineUUID
  );

  let itemDataObject = await pepperi.DataObject.Get("items", itemUUID);

  let accDataObject = await pepperi.DataObject.Get("accounts", accountUUID);

  const activityUUID = activityApiRes.id;

  let actDataObject = await pepperi.DataObject.Get("activities", activityUUID);

  let cnctDataObject = await pepperi.DataObject.Get("contacts", cnctUUID);

  let userRes = await pepperi.api.users.get({
    key: { UUID: "6ad107c0-2c7f-4856-9c1f-fde5318fa6b8" },
    fields: ["InternalID", "ExternalID", "UUID"],
  });

  const userUUID = userRes.object.UUID;

  let userDataObject = await pepperi.DataObject.Get("users", userUUID);

  let TrnDetailsUIPage;
  if (dataObject!) {
    try {
      TrnDetailsUIPage = await pepperi.UIPage.Create("Details", dataObject!);
      TrnDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }

  let AccDetailsUIPage;
  if (accDataObject!) {
    try {
      AccDetailsUIPage = await pepperi.UIPage.Create("Details", accDataObject!);
      AccDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }
  const tests = ["UI1", "UI2", "Data", "Negative"];
  let testName = req.params.v;
  if (!tests.includes(testName)) {
    testName = "error";
  }
  switch (testName) {
    //===========================DataObject tests===================================
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
          const getDeliveryDateFormat = await service.dateFormatter(
            getDeliveryDate
          );
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
          const getTSADateLinesFormat = await service.dateFormatter(getTSADateLines);
          expect(getTSADateLinesFormat, "Failed on getTSADateLines")
            .to.be.a("string")
            .that.is.equal(dateOnly).and.is.not.null.and.is.not.undefined;
          const getTSADateTimeLines = await lineDataObject?.getFieldValue(
            "TSADateTimeLines"
          );
          const getTSADateTimeLinesFormat = await service.dateFormatter(
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
          const resource = lineDataObject?.resource;
          const uuid = lineDataObject?.uuid;
          const transaction = lineDataObject?.transaction;
          const typeDef = lineDataObject?.typeDefinition;
          const parent = lineDataObject?.parent;

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
              .that.is.equal("types").and.is.not.null.and.is.not.undefined,
            expect(typeDef?.type, "Failed on typeDef?.type")
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
          let formattedDate = await service.dateFormatter(getTSADateField);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal(dateOnly);

          const getTSADateTimeField = await dataObject?.getFieldValue(
            "TSADateTimeField"
          );
          let formattedDateTime: any = await service.dateFormatter(
            getTSADateTimeField,
            true,
            true
          );
          const expectedDateTimeValue = await service.dateFormatter(
            dateTime,
            true
          );
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
          let formattedDate = await service.dateFormatter(getDeliveryDate);
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

        it("Basic CRUD for Accessors and setAsignee", async () => {
          //=================================Accessors============================================
          console.log(
            "Transaction - DataObject Starting Basic CRUD for Accessors"
          );

          await dataObject?.setAssignee(userDataObject);

          const hidden = dataObject?.hidden;
          const internalID = dataObject?.internalID;
          const uuid = dataObject?.uuid;
          const resource = dataObject?.resource;
          const typeDef = dataObject?.typeDefinition;
          const acc = dataObject?.account;
          const catalog = dataObject?.catalog;
          const creator = dataObject?.creator;
          const lines = dataObject?.lines;
          const actionDT = dataObject?.actionDateTime;
          const ExternalID = dataObject?.externalID;
          const asignee = dataObject?.assignee;
          const status = dataObject?.status;

          expect(ExternalID, "Failed on ExID accessor")
            .to.be.a("string")
            .that.is.equal(ExID).and.is.not.null.and.is.not.undefined;
          expect(status, "Failed on status accessor")
            .to.be.a("number")
            .that.is.equal(2).and.is.not.null.and.is.not.undefined;
          expect(asignee, "Failed on asignee accessor").to.be.an("object").that
            .is.not.empty,
            expect(asignee?.email, "Failed on asignee.email accessor")
              .to.be.a("string")
              .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
              .undefined;

          expect(actionDT, "Failed on actionDateTime accessor").to.be.a(
            "string"
          ).that.is.not.null.and.is.not.undefined;

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
              .that.is.above(0).and.that.is.not.null,
            expect(typeDef?.type, "Failed on typeDef.type")
              .to.be.a("string")
              .and.to.equal("transactions").and.that.is.not.null,
            expect(typeDef?.resource, "Failed on typeDef.resource")
              .to.be.a("string")
              .and.to.equal("types").and.that.is.not.null;

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
              .and.to.be.equal("types").and.that.is.not.null.and.is.not
              .undefined,
            expect(acc?.typeDefinition?.type, "Failed on typeDefinition.type")
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
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined;
          console.log(
            "Transaciton - DataObject Finished Basic CRUD for Accessors"
          );
        });
        //test that performs calculations to other fields via triggering a specific participant field and the others calculate via rule engine
        it("Basic CRUD for SetFieldValue and doCalculations for TSA fields", async () => {
          console.log(
            "Transaction - DataObject Starting Basic CRUD for SetFieldValue and doCalculations for TSA fields"
          );
          //=====================Positive============================
          const insertedValue: number = await service.randGenerator(1, 9);

          await dataObject?.setFieldValue(
            "TSAdoCalcTrigger",
            insertedValue,
            true
          );

          const getSingleLine = await dataObject?.getFieldValue(
            "TSAdoCalcSingleLine"
          );
          expect(
            getSingleLine,
            "failed on Single line doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Single Line Text" + insertedValue);

          const getDecimal = await dataObject?.getFieldValue(
            "TSAdoCalcDecimal"
          );
          expect(getDecimal, "failed on Decimal doCalculation not firing")
            .to.be.a("number")
            .that.is.equal(2.5 + insertedValue);

          const getLimitedLine = await dataObject?.getFieldValue(
            "TSAdoCalcLimitedLine"
          );
          expect(
            getLimitedLine,
            "failed on Limited Line Text doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Limited Line Text" + insertedValue);

          const getCB = await dataObject?.getFieldValue("TSAdoCalcCB");
          expect(getCB, "failed on Checkbox doCalculation not firing")
            .to.be.a("boolean")
            .that.is.equal(5 < insertedValue);

          const getParagraph = await dataObject?.getFieldValue(
            "TSAdoCalcParagraph"
          );
          expect(
            getParagraph,
            "failed on Paragraph Text doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Paragraph Text" + insertedValue);

          const getNumber = await dataObject?.getFieldValue("TSAdoCalcNumber");
          expect(getNumber, "failed on Number doCalculation not firing")
            .to.be.a("number")
            .that.is.equal(2 + insertedValue);

          const getCurrency = await dataObject?.getFieldValue(
            "TSAdoCalcCurrency"
          );
          expect(getCurrency, "failed on currency doCalculation not firing")
            .to.be.a("number")
            .that.is.equal(4 + insertedValue);

          const getLink = await dataObject?.getFieldValue("TSAdoCalcLink");
          expect(getLink, "failed on link doCalculation not firing")
            .to.be.a("string")
            .that.is.equal("www.google.com/" + insertedValue);

          const getEmail = await dataObject?.getFieldValue("TSAdoCalcEmail");
          expect(getEmail, "failed on email doCalculation not firing")
            .to.be.a("string")
            .that.is.equal("dor.s@pepperitest" + insertedValue + ".com");

          const getHTML = await dataObject?.getFieldValue("TSAdoCalcHTML");
          expect(getHTML, "failed on HTML doCalculation not firing")
            .to.be.a("string")
            .that.is.equal("<div><p>" + insertedValue + "</p></div>");
          //formating issues,when resolved will uncomment the below
          // const getDate = await dataObject?.getFieldValue("TSAdoCalcDate");
          // console.log(getDate);
          // expect(getDate, "failed on Date doCalculation not firing")
          // .to.be.a("string")
          // .that.is.equal("2022-0" + insertedValue + "-23T00:00:00Z");

          // const getDateTime = await dataObject?.getFieldValue("TSAdoCalcDateTime");
          // console.log(getDateTime);
          // expect(getDateTime, "failed on DateTime doCalculation not firing")
          // .to.be.a("string")
          // .that.is.equal("2022-0" + insertedValue + "-23T21:22:23Z");
          //=====================Negative============================
          const insertedValueNeg: number = await service.randGenerator(1, 9);

          await dataObject?.setFieldValue(
            "TSAdoCalcTrigger",
            insertedValueNeg,
            false
          );

          const getSingleLineNeg = await dataObject?.getFieldValue(
            "TSAdoCalcSingleLine"
          );
          expect(
            getSingleLineNeg,
            "failed on Single line negative doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Single Line Text" + insertedValue);

          const getDecimalNeg = await dataObject?.getFieldValue(
            "TSAdoCalcDecimal"
          );
          expect(
            getDecimalNeg,
            "failed on Decimal Negative doCalculation not firing"
          )
            .to.be.a("number")
            .that.is.equal(2.5 + insertedValue);

          const getLimitedLineNeg = await dataObject?.getFieldValue(
            "TSAdoCalcLimitedLine"
          );
          expect(
            getLimitedLineNeg,
            "failed on Limited Line Text negative doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Limited Line Text" + insertedValue);

          const getCBNeg = await dataObject?.getFieldValue("TSAdoCalcCB");
          expect(
            getCBNeg,
            "failed on Checkbox negative doCalculation not firing"
          )
            .to.be.a("boolean")
            .that.is.equal(5 < insertedValue);

          const getParagraphNeg = await dataObject?.getFieldValue(
            "TSAdoCalcParagraph"
          );
          expect(
            getParagraphNeg,
            "failed on Paragraph Text doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("Paragraph Text" + insertedValue);

          const getNumberNeg = await dataObject?.getFieldValue(
            "TSAdoCalcNumber"
          );
          expect(
            getNumberNeg,
            "failed on Number Negative doCalculation not firing"
          )
            .to.be.a("number")
            .that.is.equal(2 + insertedValue);

          const getCurrencyNeg = await dataObject?.getFieldValue(
            "TSAdoCalcCurrency"
          );
          expect(
            getCurrencyNeg,
            "failed on currency negative doCalculation not firing"
          )
            .to.be.a("number")
            .that.is.equal(4 + insertedValue);

          const getLinkNeg = await dataObject?.getFieldValue("TSAdoCalcLink");
          expect(getLinkNeg, "failed on link negative doCalculation not firing")
            .to.be.a("string")
            .that.is.equal("www.google.com/" + insertedValue);

          const getEmailNeg = await dataObject?.getFieldValue("TSAdoCalcEmail");
          expect(
            getEmailNeg,
            "failed on email negative doCalculation not firing"
          )
            .to.be.a("string")
            .that.is.equal("dor.s@pepperitest" + insertedValue + ".com");

          const getHTMLNeg = await dataObject?.getFieldValue("TSAdoCalcHTML");
          expect(getHTMLNeg, "failed on HTML negative doCalculation not firing")
            .to.be.a("string")
            .that.is.equal("<div><p>" + insertedValue + "</p></div>");

          //formating issues,when resolved will uncomment the below
          // const getDateNeg = await dataObject?.getFieldValue("TSAdoCalcDate");
          // console.log(getDateNeg);
          // expect(getDateNeg, "failed on Date negative doCalculation not firing")
          // .to.be.a("string")
          // .that.is.equal("2022-0" + insertedValue + "-22T00:00:00Z");

          // const getDateTimeNeg = await dataObject?.getFieldValue("TSAdoCalcDateTime");
          // console.log(getDateTimeNeg);
          // expect(getDateTimeNeg, "failed on DateTime negative doCalculation not firing")
          // .to.be.a("string")
          // .that.is.equal("2022-0" + insertedValue + "-23T20:22:23Z");

          console.log(
            "Transaction - DataObject Finished Basic CRUD for SetFieldValue and doCalculations for TSA fields"
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
          const formattedDate = await service.dateFormatter(getTSADateAcc);
          expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is
            .not.null.and.is.not.undefined;

          const getTSADateTimeAcc = await accDataObject?.getFieldValue(
            "TSADateTimeAcc"
          );
          let formattedDateTime: any = await service.dateFormatter(
            getTSADateTimeAcc,
            true,
            true
          );
          const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
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
          // need to add const parent = accDataObject?.parent; -- returns undefined
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
            expect(typeDef?.resource, "Failed on typeDef.resource")
              .to.be.a("string")
              .and.to.be.equal("types").and.that.is.not.null.and.not.undefined,
            expect(typeDef?.type, "Failed on typeDef.type")
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
              .with.lengthOf(1);

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
          let formattedDate = await service.dateFormatter(getTSADateFieldACT);
          expect(formattedDate, "fell on getTSADateACT")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getTSADateTimeAct = await actDataObject?.getFieldValue(
            "TSADateTimeACT"
          );
          let formattedDateTime: any = await service.dateFormatter(
            getTSADateTimeAct,
            true,
            true
          );
          const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
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
        it("Basic CRUD for Accessors and setAsignee", async () => {
          console.log(
            "Activity - DataObject Starting Basic CRUD for Accessors"
          );
          //setAsignee
          await actDataObject?.setAssignee(userDataObject);

          const hidden = actDataObject?.hidden;
          const internalID = actDataObject?.internalID;
          const resource = actDataObject?.resource;
          const typeDef = actDataObject?.typeDefinition;
          const uuid = actDataObject?.uuid;
          const creator = actDataObject?.creator;
          const acc = actDataObject?.account;
          const status = actDataObject?.status;
          const assignee = actDataObject?.assignee;
          const actionDT = actDataObject?.actionDateTime; //need to add after DI-18506
          const ExternalID = actDataObject?.externalID;

          expect(ExternalID, "Failed on ExID accessor")
            .to.be.a("string")
            .that.is.equal(ExID).and.is.not.null.and.is.not.undefined;
          expect(status, "Failed on status accessor")
            .to.be.a("number")
            .that.is.equal(2).and.is.not.null.and.is.not.undefined;
          expect(assignee, "Failed on asignee accessor").to.be.an("object").that
            .is.not.empty,
            expect(assignee?.email, "Failed on asignee.email accessor")
              .to.be.a("string")
              .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
              .undefined;

          expect(actionDT, "Failed on actionDateTime accessor").to.be.a(
            "string"
          ).that.is.not.null.and.is.not.undefined;

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
            expect(typeDef?.type, "Failed on typeDef.type")
              .to.be.a("string")
              .and.to.equal("activities").and.that.is.not.null,
            expect(typeDef?.resource, "Failed on typeDef.resource")
              .to.be.a("string")
              .and.to.equal("types").and.that.is.not.null,
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
              .that.is.equal("users").and.that.is.not.null.and.is.not.undefined;
          // expect(perf?.hidden, "Failed on perf.hidden").to.be.a("boolean")
          //   .that.is.false.and.that.is.not.null.and.is.not.undefined,
          // expect(perf?.internalID, "Failed on perf.internalID")
          //   .to.be.a("number")
          //   .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
          // expect(perf?.uuid, "Failed on perf.uuid")
          //   .to.be.a("string")
          //   .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not
          //   .undefined,
          // expect(perf?.resource, "Failed on perf.resource")
          //   .to.be.a("string")
          //   .that.is.equal("users").and.that.is.not.null.and.is.not.undefined;
        });
      });
      await initTestData(cnctDataObject!, "contacts");
      describe("Contact DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue", async () => {
          console.log(
            "Contact - Dataobject Starting Basic CRUD for SetFieldValue and GetFieldValue"
          );
          //===============================GET=============================================
          //===============================TSA==============================================
          const getTSASingleLineText = await cnctDataObject?.getFieldValue(
            "TSASingleLineTextCnct"
          );
          expect(getTSASingleLineText, "Failed on getTSASingleLineText")
            .to.be.a("string")
            .that.is.equal(phrase + randZip).and.that.is.not.null.and.is.not
            .undefined;

          const getTSALimitedLineText = await cnctDataObject?.getFieldValue(
            "TSALimitedLineTextCnct"
          );
          expect(getTSALimitedLineText, "Failed on getTSALimitedLineText")
            .to.be.a("string")
            .that.is.equal(phrase + randZip).and.that.is.not.null.and.is.not
            .undefined;

          const getTSAParagraphText = await cnctDataObject?.getFieldValue(
            "TSAParagraphTextCnct"
          );
          expect(getTSAParagraphText, "Failed on getTSAParagraphText")
            .to.be.a("string")
            .that.is.equal(phrase + randZip).and.that.is.not.null.and.is.not
            .undefined;

          const getTSACheckbox = await cnctDataObject?.getFieldValue(
            "TSACheckboxCnct"
          );
          expect(getTSACheckbox, "Failed on getTSACheckbox")
            .to.be.a("boolean")
            .that.is.equal(randBool).and.that.is.not.null.and.is.not.undefined;

          const getTSANumber = await cnctDataObject?.getFieldValue(
            "TSANumberCnct"
          );
          expect(getTSANumber, "Failed on getTSANumber")
            .to.be.a("number")
            .that.is.equal(randZip).and.that.is.not.null.and.is.not.undefined;

          const getTSADecimal = await cnctDataObject?.getFieldValue(
            "TSADecimalCnct"
          );
          expect(getTSADecimal, "Failed on getTSADecimal")
            .to.be.a("number")
            .that.is.equal(+randDiscount.toFixed(4)).and.that.is.not.null.and.is
            .not.undefined;

          const getTSACurrency = await cnctDataObject?.getFieldValue(
            "TSACurrencyCnct"
          );
          expect(getTSACurrency, "Failed on getTSACurrency")
            .to.be.a("number")
            .that.is.equal(randZip).and.that.is.not.null.and.is.not.undefined;

          const getTSAPhone = await cnctDataObject?.getFieldValue(
            "TSAPhoneCnct"
          );
          expect(getTSAPhone, "Failed on getTSAPhone")
            .to.be.a("string")
            .that.is.equal(randPhone).and.that.is.not.null.and.is.not.undefined;

          const getTSAEmail = await cnctDataObject?.getFieldValue(
            "TSAEmailCnct"
          );
          expect(getTSAEmail, "Failed on getTSAEmail")
            .to.be.a("string")
            .that.is.equal(userEmail).and.that.is.not.null.and.is.not.undefined;

          const getTSALink = await cnctDataObject?.getFieldValue("TSALinkCnct");
          expect(getTSALink, "Failed on getTSALink")
            .to.be.a("string")
            .that.is.equal(link).and.that.is.not.null.and.is.not.undefined;

          const getTSAHTML = await cnctDataObject?.getFieldValue("TSAHTMLCnct");
          expect(getTSAHTML, "Failed on getTSAHTML")
            .to.be.a("string")
            .that.is.equal(HTML).and.that.is.not.null.and.is.not.undefined;

          const getTSADate = await cnctDataObject?.getFieldValue("TSADateCnct");
          const formattedDate = await service.dateFormatter(getTSADate);
          expect(formattedDate, "Failed on getTSADate")
            .to.be.a("string")
            .that.is.equal(dateOnly).and.that.is.not.null.and.is.not.undefined;

          const getTSADateTime = await cnctDataObject?.getFieldValue(
            "TSADateTimeCnct"
          );
          const formattedDateTime = await service.dateFormatter(getTSADateTime, true, true);
          expect(formattedDateTime, "Failed on getTSADateTime")
            .to.be.a("string")
            .that.is.equal(dateTime).and.that.is.not.null.and.is.not.undefined;

          //==============================================SystemFields========================================================
          const getExID = await cnctDataObject?.getFieldValue("ExternalID");
          expect(getExID, "Failed on getExID")
            .to.be.a("string")
            .that.is.equal(ExID).and.that.is.not.null.and.is.not.undefined;

          const getEmail = await cnctDataObject?.getFieldValue("Email");
          expect(getEmail, "Failed on getEmail")
            .to.be.a("string")
            .that.is.equal(userEmail).and.that.is.not.null.and.is.not.undefined;

          const getEmail2 = await cnctDataObject?.getFieldValue("Email2");
          expect(getEmail2, "Failed on getEmail2")
            .to.be.a("string")
            .that.is.equal(userEmail).and.that.is.not.null.and.is.not.undefined;

          const getFName = await cnctDataObject?.getFieldValue("FirstName");
          expect(getFName, "Failed on getFName")
            .to.be.a("string")
            .that.is.equal(name).and.that.is.not.null.and.is.not.undefined;

          const getLName = await cnctDataObject?.getFieldValue("LastName");
          expect(getLName, "Failed on getLName")
            .to.be.a("string")
            .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined;

          const getPhone = await cnctDataObject?.getFieldValue("Phone");
          expect(getPhone, "Failed on getPhone")
            .to.be.a("string")
            .that.is.equal(randPhone).and.that.is.not.null.and.is.not.undefined;

          const getMobile = await cnctDataObject?.getFieldValue("Mobile");
          expect(getMobile, "Failed on getMobile")
            .to.be.a("string")
            .that.is.equal(randPhone).and.that.is.not.null.and.is.not.undefined;

          const getStatus = await cnctDataObject?.getFieldValue("Status");
          expect(getStatus, "Failed on getMobile")
            .to.be.a("number")
            .that.is.equal(2).and.that.is.not.null.and.is.not.undefined;

          const getBirthday = await cnctDataObject?.getFieldValue("Birthday");
          const formattedBirthday = await service.dateFormatter(getBirthday);
          expect(formattedBirthday, "Failed on getMobile")
            .to.be.a("string")
            .that.is.equal(dateOnly).and.that.is.not.null.and.is.not.undefined;

          console.log(
            "Contact - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue"
          );
        });
        it("Basic CRUD for Accessors", async () => {
          console.log("Contact - Dataobject Starting Basic CRUD for Accessors");

          const internalID = cnctDataObject?.internalID;
          const hidden = cnctDataObject?.hidden;
          const resource = cnctDataObject?.resource;
          const uuid = cnctDataObject?.uuid;
          const typeDef = cnctDataObject?.typeDefinition;
          const account = cnctDataObject?.account;
          expect(account?.uuid, "Failed on account.UUID accessor")
            .to.be.a("string")
            .that.lengthOf(36).and.is.not.null.and.is.not.undefined;
          expect(account?.resource, "Failed on account.resource accessor")
            .to.be.a("string")
            .that.is.equal("accounts").and.is.not.null.and.is.not.undefined;
          expect(account?.name, "Failed on account.name accessor")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined;
          expect(account?.internalID, "Failed on account.internalID accessor")
            .to.be.a("number")
            .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(account?.contacts, "failed on account.contacts")
            .to.be.an("array")
            .that.has.lengthOf(1).and.is.not.undefined;
          expect(account?.contacts[0], "failed on account.contacts").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined;
          expect(account?.hidden, "Failed on account.hidden accessor").to.be.a(
            "boolean"
          ).that.is.false.and.is.not.null.and.is.not.undefined;
          expect(internalID, "Failed on internalID accessor")
            .to.be.a("number")
            .that.is.below(0).and.is.not.null.and.is.not.undefined;
          expect(hidden, "Failed on hidden accessor").to.be.a("boolean").that.is
            .false.and.is.not.null.and.is.not.undefined;
          expect(resource, "Failed on resource accessor")
            .to.be.a("string")
            .that.is.equal("contacts").and.is.not.null.and.is.not.undefined;
          expect(uuid, "Failed on UUID accessor")
            .to.be.a("string")
            .that.lengthOf(36).and.is.not.null.and.is.not.undefined;
          expect(typeDef, "Failed on TypeDef object").to.be.an("object").and.is
            .not.empty,
            expect(typeDef?.hidden, "Failed on TypeDef.hidden").to.be.a(
              "boolean"
            ).and.is.false.and.is.not.null.and.is.not.undefined,
            expect(typeDef?.name, "Failed on TypeDef.name")
              .to.be.a("string")
              .that.is.equal("Default Contact Person").and.is.not.null.and.is
              .not.undefined,
            expect(typeDef?.uuid, "Failed on TypeDef.uuid")
              .to.be.a("string")
              .that.lengthOf(36).and.is.not.null.and.is.not.undefined,
            expect(typeDef?.internalID, "Failed on TypeDef.internalID")
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(typeDef?.resource, "Failed on TypeDef.resource")
              .to.be.a("string")
              .that.is.equal("types").and.is.not.null.and.is.not.undefined,
            expect(typeDef?.type, "Failed on TypeDef.type")
              .to.be.a("string")
              .that.is.equal("contacts").and.is.not.null.and.is.not.undefined;

          console.log("Contact - Dataobject Finished Basic CRUD for Accessors");
        });
      });
      await initTestData(userDataObject!, "users");
      describe("User DataObject Basic CRUD test", async () => {
        it("Basic CRUD for SetFieldValue and GetFieldValue", async () => {
          console.log(
            "User - Dataobject Starting Basic CRUD for SetFieldValue and GetFieldValue"
          );
          //===============================GET=============================================
          const getUUID = await userDataObject?.getFieldValue("UUID");
          expect(getUUID, "Failed on getUUID")
            .to.be.a("string")
            .that.has.lengthOf(36).and.is.not.null.and.is.not.undefined;

          const getInternalID = await userDataObject?.getFieldValue(
            "InternalID"
          );
          expect(getInternalID, "Failed on getInternalID")
            .to.be.a("number")
            .that.is.above(0).and.is.not.null.and.is.not.undefined;

          const getExID = await userDataObject?.getFieldValue("ExternalID");
          expect(getExID, "Failed on getExID")
            .to.be.a("string")
            .that.is.equal("TEST").and.is.not.null.and.is.not.undefined;

          const getEmail = await userDataObject?.getFieldValue("Email");
          expect(getEmail, "Failed on getEmail")
            .to.be.a("string")
            .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
            .undefined;

          const getFName = await userDataObject?.getFieldValue("FirstName");
          expect(getFName, "Failed on getFName")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined;

          const getLName = await userDataObject?.getFieldValue("LastName");
          expect(getLName, "Failed on getLName")
            .to.be.a("string")
            .that.is.equal(phrase).and.is.not.null.and.is.not.undefined;

          const getHidden = await userDataObject?.getFieldValue("Hidden");
          expect(getHidden, "Failed on getHidden").to.be.a("boolean").that.is
            .false.and.is.not.null.and.is.not.undefined;

          const getPhone = await userDataObject?.getFieldValue("Phone");
          expect(getPhone, "Failed on getPhone")
            .to.be.a("string")
            .that.is.equal(randPhone).and.is.not.null.and.is.not.undefined;

          const getMobile = await userDataObject?.getFieldValue("Mobile");
          expect(getMobile, "Failed on getMobile")
            .to.be.a("string")
            .that.is.equal(randPhone).and.is.not.null.and.is.not.undefined;

          console.log(
            "User - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue"
          );
        });

        it("Basic CRUD for Accessors", async () => {
          console.log("User - Dataobject Starting Basic CRUD for Accessors");
          //==============================Accessors=================================
          const email = userDataObject?.email;
          const ExternalID = userDataObject?.externalID;
          const fName = userDataObject?.firstName;
          const lName = userDataObject?.lastName;
          const hidden = userDataObject?.hidden;
          const internalID = userDataObject?.internalID;
          const res = userDataObject?.resource;
          const uuid = userDataObject?.uuid;
          const typeDef = userDataObject?.typeDefinition; //currently returns undefined

          expect(email, "Failed on Email accessor")
            .to.be.a("string")
            .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
            .undefined;
          expect(ExternalID, "Failed on ExternalID accessor")
            .to.be.a("string")
            .that.is.equal("TEST").and.is.not.null.and.is.not.undefined;
          expect(fName, "Failed on fName accessor")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined;
          expect(lName, "Failed on lName accessor")
            .to.be.a("string")
            .that.is.equal(phrase).and.is.not.null.and.is.not.undefined;
          expect(hidden, "Failed on hidden accessor").to.be.a("boolean").that.is
            .false.and.is.not.null.and.is.not.undefined;
          expect(internalID, "Failed on internalID accessor")
            .to.be.a("number")
            .that.is.above(0).and.is.not.null.and.is.not.undefined;
          expect(res, "Failed on resource accessor")
            .to.be.a("string")
            .that.is.equal("users").and.is.not.null.and.is.not.undefined;
          expect(uuid, "Failed on uuid accessor")
            .to.be.a("string")
            .that.has.lengthOf(36).and.is.not.null.and.is.not.undefined;

          console.log("User - Dataobject Finished Basic CRUD for Accessors");
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
          expect(
            uiHomePage.type,
            "Failed on uiHomePage.type being empty or null/wrong value - https://pepperi.atlassian.net/browse/DI-18307"
          )
            .to.be.a("string")
            .that.is.equal("Home").and.is.not.null;
          expect(
            uiHomePage.quickAction.backgroundColor,
            "Failed on uiHomePage.quickAction.backgroundColor"
          )
            .to.be.a("string")
            .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
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
        it("CRUD testing on Transaction Details UIObject - SetFieldValue", async () => {
          //need to set the oringinal values as the first test and then test for those values
          //===========================SET=========================================
          await initTestData(dataObject!, "transactions");
          await initTestData(accDataObject!, "accounts");
          TrnDetailsUIPage.rebuild();
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
          const getTSASingleLineText = await uiObject?.getField(
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
          const getTSALimitedLineText = await uiObject?.getField(
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
          const getTSAParagraphText = await uiObject?.getField(
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
          const getTSADateField = await uiObject?.getField("TSADateField");
          let formattedDate = await service.dateFormatter(getTSADateField!.value);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getTSADateTimeField = await uiObject?.getField(
            "TSADateTimeField"
          );
          let formattedDateTime: any = await service.dateFormatter(
            getTSADateTimeField!.value,
            true
          );
          const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
          expect(formattedDateTime, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);
          const getTSADecimalField = await uiObject?.getField(
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
          const getTSANumberField = await uiObject?.getField("TSANumberField");
          expect(getTSANumberField?.value, "fell on getTSANumberField.value")
            .to.be.a("string")
            .and.is.equal(quantitiesTotal.toString()),
            expect(
              getTSANumberField?.formattedValue,
              "fell on getTSANumberField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(quantitiesTotal.toString());
          const getTSACurrencyField = await uiObject?.getField(
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
          const getTSACheckboxField = await uiObject?.getField(
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
          const getTSAEmailField = await uiObject?.getField("TSAEmailField");
          expect(getTSAEmailField?.value, "fell on getTSAEmailField.value")
            .to.be.a("string")
            .and.is.equal(userEmail),
            expect(
              getTSAEmailField?.formattedValue,
              "fell on getTSAEmailField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(userEmail);
          const getTSAPhoneField = await uiObject?.getField("TSAPhoneField");
          expect(getTSAPhoneField?.value, "fell on getTSAPhoneField.value")
            .to.be.a("string")
            .and.is.equal(randPhone.toString()),
            expect(
              getTSAPhoneField?.formattedValue,
              "fell on getTSAPhoneField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randPhone.toString());
          const getTSALinkField = await uiObject?.getField("TSALinkField");
          expect(getTSALinkField?.value, "fell on getTSALinkField.value")
            .to.be.a("string")
            .and.is.equal(link),
            expect(
              getTSALinkField?.formattedValue,
              "fell on getTSALinkField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(link);
          const getTSAHTMLField = await uiObject?.getField("TSAHTMLField");
          expect(getTSAHTMLField?.value, "fell on getTSAHTMLField.value")
            .to.be.a("string")
            .and.is.equal(HTML),
            expect(
              getTSAHTMLField?.formattedValue,
              "fell on getTSAHTMLField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML);
          const getExID = await uiObject?.getField("ExternalID");
          expect(getExID?.value, "Failed on getExID.value")
            .that.is.a("string")
            .and.is.equal(ExID),
            expect(getExID?.formattedValue, "Failed on getExID.formattedValue")
              .that.is.a("string")
              .and.is.equal(ExID);
          const getRemark = await uiObject?.getField("Remark");
          expect(getRemark?.value, "Failed on getRemark.value")
            .that.is.a("string")
            .and.is.equal(phrase),
            expect(
              getRemark?.formattedValue,
              "Failed on getRemark.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase);
          const getBillToName = await uiObject?.getField("BillToName");
          expect(getBillToName?.value, "Failed on getBillToName.value")
            .that.is.a("string")
            .and.is.equal(name),
            expect(
              getBillToName?.formattedValue,
              "Failed on getBillToName.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(name);
          const getBillToStreet = await uiObject?.getField("BillToStreet");
          expect(getBillToStreet?.value, "Failed on getBillToStreet.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getBillToStreet?.formattedValue,
              "Failed on getBillToStreet.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getBillToZipCode = await uiObject?.getField("BillToZipCode");
          expect(getBillToZipCode?.value, "Failed on getBillToZipCode.value")
            .that.is.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getBillToZipCode?.formattedValue,
              "Failed on getBillToZipCode.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randZip.toString());
          const getBillToPhone = await uiObject?.getField("BillToPhone");
          expect(getBillToPhone?.value, "Failed on getBillToPhone.value")
            .that.is.a("string")
            .and.is.equal(randPhone),
            expect(
              getBillToPhone?.formattedValue,
              "Failed on getBillToPhone.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randPhone);
          const getBillToCity = await uiObject?.getField("BillToCity");
          expect(getBillToCity?.value, "Failed on getBillToCity.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getBillToCity?.formattedValue,
              "Failed on getBillToCity.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getDiscountPercentage = await uiObject?.getField(
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
          const getQuantitiesTotal = await uiObject?.getField(
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

          const getDeliveryDate = await uiObject?.getField("DeliveryDate");
          let formattedDateSystem = await service.dateFormatter(getDeliveryDate!.value);
          expect(formattedDateSystem, "Fell on getDeliveryDate")
            .to.be.a("string")
            .and.is.equal(dateOnly);
          const getStatus = await uiObject?.getField("Status");
          expect(getStatus?.value, "Failed on getStatus.value")
            .to.be.a("string")
            .and.is.equal(status.toString());
          expect(
            getStatus?.formattedValue,
            "Failed on getStatus.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal("Submitted");
          const getLat = await uiObject?.getField("SubmissionGeoCodeLAT");
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat?.value, "Failed on getLat.value")
            .to.be.a("string")
            .and.is.equal(latToNum.toString());
          expect(getLat?.formattedValue, "Failed on getLat.formattedValue")
            .to.be.a("string")
            .and.is.equal(latToNum.toFixed(2));
          const getLng = await uiObject?.getField("SubmissionGeoCodeLNG");
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

          const getShipToName = await uiObject?.getField("ShipToName");
          expect(getShipToName?.value, "Failed on getShipToName.value")
            .to.be.a("string")
            .and.is.equal(name),
            expect(
              getShipToName?.formattedValue,
              "Failed on getShipToName.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(name);
          const getShipToStreet = await uiObject?.getField("ShipToStreet");
          expect(getShipToStreet?.value, "Failed on getShipToStreet.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getShipToStreet?.formattedValue,
              "Failed on getShipToStreet.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getShipToCity = await uiObject?.getField("ShipToCity");
          expect(getShipToCity?.value, "Failed on getShipToCity.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getShipToCity?.formattedValue,
              "Failed on getShipToCity.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getShipToZipCode = await uiObject?.getField("ShipToZipCode");
          expect(getShipToZipCode?.value, "Failed on getShipToZipCode.value")
            .to.be.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getShipToZipCode?.formattedValue,
              "Failed on getShipToZipCode.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randZip.toString());
          const getSubTotal = await uiObject?.getField("SubTotal");
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
          const getSubTotalAfterItemsDiscount = await uiObject?.getField(
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
          const getGrandTotal = await uiObject?.getField("GrandTotal");
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
        it("CRUD testing on Transaction Details UIObject - UIField Accessors", async () => {
          console.log(
            "%cDetails - Accessors - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          //need to add uiobject.dataviews
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
            expect(
              TrnDetailsUIPage.type,
              "DI-18307 UIPage.Type returns wrong values"
            )
              .to.be.a("string")
              .that.is.equal("Details").that.is.not.null.and.is.not.empty,
            expect(
              TrnDetailsUIPage.key,
              "failed on TrnDetailsUIPage.key"
            ).to.be.a("string").that.is.not.null.and.is.not.empty;
          //===============================UIObject================================
          //===============================Accessors===============================
          try {
            uiObject.backgroundColor = bgColor;
            uiObject.readonly = false;
          } catch (err) {
            console.log(err);
          }
          const readonly = uiObject.readonly;
          expect(uiObject.backgroundColor, "failed on uiObject.backgroundColor")
            .to.be.a("string")
            .and.to.be.equal(bgColor).and.is.not.null.and.is.not.empty,
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
          //===============================getField=================================
          //let emptyObject: boolean = false;
          //const uiFieldsMap = await getFields(uiObject);
          //console.log(uiFieldsMap);
          // if (uiFieldsMap === undefined) {
          //   emptyObject = true;
          // }
          // expect(emptyObject, "Failed getting UIFields from getFields function")
          //   .to.be.false;
          //===========================SystemFields================================
          let setExternalID = await uiObject.getField("ExternalID");
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
          let getExternalID = await uiObject.getField("ExternalID");
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
          let setDiscountPercentage = await uiObject.getField(
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
          let getDiscountPercentage = await uiObject.getField(
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
          let setAccExID = await uiObject.getField("AccountExternalID");
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
          let getAccExID = await uiObject.getField("AccountExternalID");
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
          let setAccountName = await uiObject.getField("AccountName");
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
          let getAccountName = await uiObject.getField("AccountName");
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
          let setWrntyID = await uiObject.getField("WrntyID");
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
          let getWrntyID = await uiObject.getField("WrntyID");
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
          let setActionDateTime = await uiObject.getField("ActionDateTime");
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
          let getActionDateTime = await uiObject.getField("ActionDateTime");
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
          let setAgentName = await uiObject.getField("AgentName");
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
          let getAgentName = await uiObject.getField("AgentName");
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
          let setCurrency = await uiObject.getField("Currency");
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
          let getCurrency = await uiObject.getField("Currency");
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
          let setDeliveryDate = await uiObject.getField("DeliveryDate");
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
          let getDeliveryDate = await uiObject.getField("DeliveryDate");
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
          let setRemark = await uiObject.getField("Remark");
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
          let getRemark = await uiObject.getField("Remark");
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
          let setBillToPhone = await uiObject.getField("BillToPhone");
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
          let getBillToPhone = await uiObject.getField("BillToPhone");
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
          let setBillToCountryIso = await uiObject.getField("BillToCountryIso");
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
          let getBillToCountryIso = await uiObject.getField("BillToCountryIso");
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
          let setBillToStreet = await uiObject.getField("BillToStreet");
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
          let getBillToStreet = await uiObject.getField("BillToStreet");
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
          let setBillToCity = await uiObject.getField("BillToCity");
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
          let getBillToCity = await uiObject.getField("BillToCity");
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
          let setBillToZipCode = await uiObject.getField("BillToZipCode");
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
          let getBillToZipCode = await uiObject.getField("BillToZipCode");
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
          let setBillToName = await uiObject.getField("BillToName");
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
          let getBillToName = await uiObject.getField("BillToName");
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
          let setSubTotalAfterItemsDiscount = await uiObject.getField(
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
          let getSubTotalAfterItemsDiscount = await uiObject.getField(
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
          let setQuantitiesTotal = await uiObject.getField("QuantitiesTotal");
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
          let getQuantitiesTotal = await uiObject.getField("QuantitiesTotal");
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
          let setTSASingleLineText = await uiObject.getField(
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
          let getTSASingleLineText = await uiObject.getField(
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
          let setTSALimitedLineText = await uiObject.getField(
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
          let getTSALimitedLineText = await uiObject.getField(
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
          let setTSAParagraphText = await uiObject.getField("TSAParagraphText");
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
          let getTSAParagraphText = await uiObject.getField("TSAParagraphText");
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
          let setTSADateField = await uiObject.getField("TSADateField");
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
          let getTSADateField = await uiObject.getField("TSADateField");
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
          let setTSADateTimeField = await uiObject.getField("TSADateTimeField");
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
          let getTSADateTimeField = await uiObject.getField("TSADateTimeField");
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
          let setTSACheckboxField = await uiObject.getField("TSACheckboxField");
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
          let getTSACheckboxField = await uiObject.getField("TSACheckboxField");
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
          let setTSACurrencyField = await uiObject.getField("TSACurrencyField");
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
          let getTSACurrencyField = await uiObject.getField("TSACurrencyField");
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
          let setTSADecimalField = await uiObject.getField("TSADecimalField");
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
          let getTSADecimalField = await uiObject.getField("TSADecimalField");
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
          let setTSANumberField = await uiObject.getField("TSANumberField");
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
          let getTSANumberField = await uiObject.getField("TSANumberField");
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
          let setTSAEmailField = await uiObject.getField("TSAEmailField");
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
          let getTSAEmailField = await uiObject.getField("TSAEmailField");
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
          let setTSAPhoneField = await uiObject.getField("TSAPhoneField");
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
          let getTSAPhoneField = await uiObject.getField("TSAPhoneField");
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
          let setTSALinkField = await uiObject.getField("TSALinkField");
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
          let getTSALinkField = await uiObject.getField("TSALinkField");
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
          let setTSAHTMLField = await uiObject.getField("TSAHTMLField");
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
          let getTSAHTMLField = await uiObject.getField("TSAHTMLField");
          expect(
            getTSAHTMLField!,
            "failed on TSAHTMLField field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLField?.type, "failed on TSAHTMLField.type field")
              .to.be.a("string")
              .that.is.equal("RichTextHTML").that.is.not.null.and.is.not
              .undefined,
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
          await TrnDetailsUIPage.rebuild();
          uiObject = TrnDetailsUIPage.uiObject;
          //===========================SET=========================================
          //========================TSA's===========================================
          //setting new values for the recalculate to work
          await dataObject?.setFieldValue(
            "TSASingleLineText",
            phrase + randDays
          );
          await dataObject?.setFieldValue(
            "TSALimitedLineText",
            phrase + randDays
          );
          await dataObject?.setFieldValue(
            "TSAParagraphText",
            phrase + randDays
          );
          //const dateOnly = await dateFormatter("27-07-1990T07:45:00Z"); // returns 1990-07-27
          await dataObject?.setFieldValue("TSADateField", "1990-07-27");
          await dataObject?.setFieldValue(
            "TSADateTimeField",
            "1990-07-27T07:45:00Z"
          );
          await dataObject?.setFieldValue(
            "TSADecimalField",
            randZip.toFixed(6)
          );
          await dataObject?.setFieldValue(
            "TSANumberField",
            randDays.toString()
          );
          await dataObject?.setFieldValue(
            "TSACurrencyField",
            randDays.toString()
          );
          await dataObject?.setFieldValue(
            "TSACheckboxField",
            (!randBool).toString()
          );
          await dataObject?.setFieldValue(
            "TSAEmailField",
            "dor.s@cpinodetest.com"
          );
          await dataObject?.setFieldValue("TSAPhoneField", randZip.toString());
          await dataObject?.setFieldValue(
            "TSALinkField",
            "https://en.wikipedia.org/wiki/Iron_Man"
          );
          await dataObject?.setFieldValue(
            "TSAHTMLField",
            HTML + "<br/><h1>this is a change</h1>"
          );
          //===================================SystemFields=================================
          const status = 2;
          await dataObject?.setFieldValue("ExternalID", name);
          await dataObject?.setFieldValue("Remark", ExID);
          await dataObject?.setFieldValue(
            "DiscountPercentage",
            randDays.toString()
          );
          await dataObject?.setFieldValue("BillToName", phrase);
          await dataObject?.setFieldValue(
            "BillToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await dataObject?.setFieldValue(
            "BillToCity",
            accounDataArr[accountGeoIndex].City
          );
          await dataObject?.setFieldValue("BillToZipCode", randDays.toString());
          await dataObject?.setFieldValue("BillToPhone", randZip.toString());
          await dataObject?.setFieldValue(
            "QuantitiesTotal",
            randDays.toString()
          );
          await dataObject?.setFieldValue("DeliveryDate", "1990-07-27");
          await dataObject?.setFieldValue("Status", (status + 1).toString());
          await dataObject?.setFieldValue(
            "SubmissionGeoCodeLAT",
            accounDataArr[accountGeoIndex].Latitude!.toString()
          );
          await dataObject?.setFieldValue(
            "SubmissionGeoCodeLNG",
            accounDataArr[accountGeoIndex].Longtitude!.toString()
          );
          await dataObject?.setFieldValue("ShipToName", phrase);
          await dataObject?.setFieldValue(
            "ShipToStreet",
            accounDataArr[accountGeoIndex].Street
          );
          await dataObject?.setFieldValue(
            "ShipToCity",
            accounDataArr[accountGeoIndex].City
          );
          await dataObject?.setFieldValue("ShipToZipCode", randDays.toString());
          await dataObject?.setFieldValue("SubTotal", randDays.toString());
          await dataObject?.setFieldValue(
            "SubTotalAfterItemsDiscount",
            (randZip * randDays).toString()
          );
          await dataObject?.setFieldValue(
            "GrandTotal",
            (randZip * randDays * quantitiesTotal).toString()
          );
          //pushes all updates from dataObject into the UIObject
          await uiObject.recalculate();

          //=============================GET======================================
          const getTSASingleLineText = await uiObject?.getField(
            "TSASingleLineText"
          );
          expect(getTSASingleLineText?.value, "fell on TSASingleLineText.value")
            .that.is.a("string")
            .and.is.equal(phrase + randDays),
            expect(
              getTSASingleLineText?.formattedValue,
              "fell on TSASingleLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDays);
          const getTSALimitedLineText = await uiObject?.getField(
            "TSALimitedLineText"
          );
          expect(
            getTSALimitedLineText?.value,
            "fell on getTSALimitedLineText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDays),
            expect(
              getTSALimitedLineText?.formattedValue,
              "fell on getTSALimitedLineText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDays);
          const getTSAParagraphText = await uiObject?.getField(
            "TSAParagraphText"
          );
          expect(
            getTSAParagraphText?.value,
            "fell on getTSAParagraphText.value"
          )
            .that.is.a("string")
            .and.is.equal(phrase + randDays),
            expect(
              getTSAParagraphText?.formattedValue,
              "fell on getTSAParagraphText.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase + randDays);
          //the below works according to M/d/yyyy h:mm tt
          const getTSADateField = await uiObject?.getField("TSADateField");
          expect(getTSADateField?.formattedValue, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal("07/27/1990");
          const getTSADateTimeField = await uiObject?.getField(
            "TSADateTimeField"
          );
          expect(
            getTSADateTimeField?.formattedValue,
            "Failed on getTSADateTimeField"
          )
            .to.be.a("string")
            .and.is.equal("07/27/1990 07:45 AM");
          const getTSADecimalField = await uiObject?.getField(
            "TSADecimalField"
          );
          const formattedDecimal = formatterUS.format(randZip);
          expect(getTSADecimalField?.value, "fell on getTSADecimalField.value")
            .to.be.a("string")
            .and.is.equal(randZip.toFixed(6)),
            expect(
              getTSADecimalField?.formattedValue,
              "fell on getTSADecimalField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(formattedDecimal);
          const getTSANumberField = await uiObject?.getField("TSANumberField");
          expect(getTSANumberField?.value, "fell on getTSANumberField.value")
            .to.be.a("string")
            .and.is.equal(randDays.toString()),
            expect(
              getTSANumberField?.formattedValue,
              "fell on getTSANumberField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randDays.toString());
          const getTSACurrencyField = await uiObject?.getField(
            "TSACurrencyField"
          );
          const strCur = formatter.format(randDays);
          const resultCur = strCur.substr(1) + strCur.substr(0, 1);
          expect(
            getTSACurrencyField?.value,
            "fell on getTSACurrencyField.value"
          )
            .to.be.a("string")
            .and.is.equal(randDays.toString());
          expect(
            getTSACurrencyField?.formattedValue,
            "fell on getTSACurrencyField.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal(resultCur);
          const getTSACheckboxField = await uiObject?.getField(
            "TSACheckboxField"
          );
          expect(
            getTSACheckboxField?.value,
            "fell on getTSACheckboxField.value"
          )
            .to.be.a("string")
            .and.is.equal((!randBool).toString()),
            expect(
              getTSACheckboxField?.formattedValue,
              "fell on getTSACheckboxField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal((!randBool).toString());
          const getTSAEmailField = await uiObject?.getField("TSAEmailField");
          expect(getTSAEmailField?.value, "fell on getTSAEmailField.value")
            .to.be.a("string")
            .and.is.equal("dor.s@cpinodetest.com"),
            expect(
              getTSAEmailField?.formattedValue,
              "fell on getTSAEmailField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal("dor.s@cpinodetest.com");
          const getTSAPhoneField = await uiObject?.getField("TSAPhoneField");
          expect(getTSAPhoneField?.value, "fell on getTSAPhoneField.value")
            .to.be.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getTSAPhoneField?.formattedValue,
              "fell on getTSAPhoneField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randZip.toString());
          const getTSALinkField = await uiObject?.getField("TSALinkField");
          expect(getTSALinkField?.value, "fell on getTSALinkField.value")
            .to.be.a("string")
            .and.is.equal("https://en.wikipedia.org/wiki/Iron_Man"),
            expect(
              getTSALinkField?.formattedValue,
              "fell on getTSALinkField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal("https://en.wikipedia.org/wiki/Iron_Man");
          const getTSAHTMLField = await uiObject?.getField("TSAHTMLField");
          expect(getTSAHTMLField?.value, "fell on getTSAHTMLField.value")
            .to.be.a("string")
            .and.is.equal(HTML + "<br/><h1>this is a change</h1>"),
            expect(
              getTSAHTMLField?.formattedValue,
              "fell on getTSAHTMLField.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML + "<br/><h1>this is a change</h1>");
          const getExID = await uiObject?.getField("ExternalID");
          expect(getExID?.value, "Failed on getExID.value")
            .that.is.a("string")
            .and.is.equal(name),
            expect(getExID?.formattedValue, "Failed on getExID.formattedValue")
              .that.is.a("string")
              .and.is.equal(name);
          const getRemark = await uiObject?.getField("Remark");
          expect(getRemark?.value, "Failed on getRemark.value")
            .that.is.a("string")
            .and.is.equal(ExID),
            expect(
              getRemark?.formattedValue,
              "Failed on getRemark.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(ExID);
          const getBillToName = await uiObject?.getField("BillToName");
          expect(getBillToName?.value, "Failed on getBillToName.value")
            .that.is.a("string")
            .and.is.equal(phrase),
            expect(
              getBillToName?.formattedValue,
              "Failed on getBillToName.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(phrase);
          const getBillToStreet = await uiObject?.getField("BillToStreet");
          expect(getBillToStreet?.value, "Failed on getBillToStreet.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getBillToStreet?.formattedValue,
              "Failed on getBillToStreet.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getBillToZipCode = await uiObject?.getField("BillToZipCode");
          expect(getBillToZipCode?.value, "Failed on getBillToZipCode.value")
            .that.is.a("string")
            .and.is.equal(randDays.toString()),
            expect(
              getBillToZipCode?.formattedValue,
              "Failed on getBillToZipCode.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randDays.toString());
          const getBillToPhone = await uiObject?.getField("BillToPhone");
          expect(getBillToPhone?.value, "Failed on getBillToPhone.value")
            .that.is.a("string")
            .and.is.equal(randZip.toString()),
            expect(
              getBillToPhone?.formattedValue,
              "Failed on getBillToPhone.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randZip.toString());
          const getBillToCity = await uiObject?.getField("BillToCity");
          expect(getBillToCity?.value, "Failed on getBillToCity.value")
            .that.is.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getBillToCity?.formattedValue,
              "Failed on getBillToCity.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getDiscountPercentage = await uiObject?.getField(
            "DiscountPercentage"
          );
          expect(
            parseFloat(getDiscountPercentage!.value).toFixed(6),
            "Failed on getDiscountPercentage.value"
          )
            .that.is.a("string")
            .and.is.equal(randDays.toFixed(6)),
            expect(
              getDiscountPercentage!.formattedValue,
              "Failed on getDiscountPercentage.formattedValue"
            )
              .that.is.a("string")
              .and.is.equal(randDays + "%");
          const getQuantitiesTotal = await uiObject?.getField(
            "QuantitiesTotal"
          );
          expect(
            parseFloat(getQuantitiesTotal!.value).toFixed(0),
            "Failed on getQuantitiesTotal.value"
          )
            .that.is.a("string")
            .and.is.equal(randDays.toString());
          expect(
            parseFloat(getQuantitiesTotal!.formattedValue).toFixed(2),
            "Failed on getQuantitiesTotal.formattedValue"
          )
            .that.is.a("string")
            .and.is.equal(randDays.toFixed(2));

          const getDeliveryDate = await uiObject?.getField("DeliveryDate");
          expect(
            getDeliveryDate!.formattedValue,
            "Fell on getDeliveryDate.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal("07/27/1990");
          const getStatus = await uiObject?.getField("Status");
          expect(getStatus?.value, "Failed on getStatus.value")
            .to.be.a("string")
            .and.is.equal((status + 1).toString());
          expect(
            getStatus?.formattedValue,
            "Failed on getStatus.formattedValue"
          )
            .to.be.a("string")
            .and.is.equal("In Progress");
          const getLat = await uiObject?.getField("SubmissionGeoCodeLAT");
          const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
          expect(getLat?.value, "Failed on getLat.value")
            .to.be.a("string")
            .and.is.equal(latToNum.toString());
          expect(getLat?.formattedValue, "Failed on getLat.formattedValue")
            .to.be.a("string")
            .and.is.equal(latToNum.toFixed(2));
          const getLng = await uiObject?.getField("SubmissionGeoCodeLNG");
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
          const getShipToName = await uiObject?.getField("ShipToName");
          expect(getShipToName?.value, "Failed on getShipToName.value")
            .to.be.a("string")
            .and.is.equal(phrase),
            expect(
              getShipToName?.formattedValue,
              "Failed on getShipToName.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(phrase);
          const getShipToStreet = await uiObject?.getField("ShipToStreet");
          expect(getShipToStreet?.value, "Failed on getShipToStreet.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].Street),
            expect(
              getShipToStreet?.formattedValue,
              "Failed on getShipToStreet.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].Street);
          const getShipToCity = await uiObject?.getField("ShipToCity");
          expect(getShipToCity?.value, "Failed on getShipToCity.value")
            .to.be.a("string")
            .and.is.equal(accounDataArr[accountGeoIndex].City),
            expect(
              getShipToCity?.formattedValue,
              "Failed on getShipToCity.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(accounDataArr[accountGeoIndex].City);
          const getShipToZipCode = await uiObject?.getField("ShipToZipCode");
          expect(getShipToZipCode?.value, "Failed on getShipToZipCode.value")
            .to.be.a("string")
            .and.is.equal(randDays.toString()),
            expect(
              getShipToZipCode?.formattedValue,
              "Failed on getShipToZipCode.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(randDays.toString());
          const getSubTotal = await uiObject?.getField("SubTotal");
          const strST = formatter.format(randDays);
          const resultST = strST.substr(1) + strST.substr(0, 1);
          expect(
            parseFloat(getSubTotal!.value).toFixed(2),
            "Failed on getSubTotal.value"
          )
            .to.be.a("string")
            .that.is.equal(randDays.toFixed(2));
          expect(
            getSubTotal!.formattedValue,
            "Failed on getSubTotal.formattedValue"
          )
            .to.be.a("string")
            .that.is.equal(resultST);
          const getSubTotalAfterItemsDiscount = await uiObject?.getField(
            "SubTotalAfterItemsDiscount"
          );
          const strSTAD = formatter.format(randZip * randDays);
          const resultSTAD = strSTAD.substr(1) + strSTAD.substr(0, 1);
          expect(
            parseFloat(getSubTotalAfterItemsDiscount!.value).toFixed(4),
            "Failed on getSubTotalAfterItemsDiscount.value"
          )
            .to.be.a("string")
            .that.is.equal((randZip * randDays).toFixed(4)),
            expect(
              getSubTotalAfterItemsDiscount!.formattedValue,
              "Failed on getSubTotalAfterItemsDiscount.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultSTAD);
          const getGrandTotal = await uiObject?.getField("GrandTotal");
          const strGT = formatter.format(randZip * randDays * quantitiesTotal);
          const resultGT = strGT.substr(1) + strGT.substr(0, 1);
          expect(
            parseFloat(getGrandTotal!.value).toFixed(4),
            "Failed on getGrandTotal.value"
          )
            .to.be.a("string")
            .that.is.equal((randZip * randDays * quantitiesTotal).toFixed(4)),
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
          const formattedDate = await service.dateFormatter(getTSADateField);
          expect(formattedDate, "fell on getTSADateField")
            .to.be.a("string")
            .and.is.equal("2005-07-27");

          const getTSADateTimeField = await dataObject?.getFieldValue(
            "TSADateTimeField"
          );
          expect(getTSADateTimeField, "Failed on getTSADateTimeField")
            .to.be.a("string")
            .and.is.equal("2005-07-27T01:00:00Z");

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
          ); // negative
          expect(getQuantitiesTotal, "Failed on getQuantitiesTotal")
            .that.is.a("number")
            .and.is.equal(quantitiesTotal);

          const getDeliveryDate = await dataObject?.getFieldValue(
            "DeliveryDate"
          ); //currently not working
          let formattedDate2 = await service.dateFormatter(getDeliveryDate);
          // expect(getDeliveryDate, "Fell on getDeliveryDate")
          //   .to.be.a("string")
          //   .and.is.equal("27-07-2005");

          const getStatus = await dataObject?.getFieldValue("Status");
          expect(getStatus, "Failed on getStatus")
            .to.be.a("number")
            .and.is.equal(status); //negative

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
            .that.is.equal(+randZip.toFixed(2)); //negative

          const getSubTotalAfterItemsDiscount = await dataObject?.getFieldValue(
            "SubTotalAfterItemsDiscount"
          );
          expect(
            getSubTotalAfterItemsDiscount,
            "Failed on getSubTotalAfterItemsDiscount"
          )
            .to.be.a("number")
            .that.is.equal(+(randZip * randDiscount).toFixed(4)); //negative
          //due to lines data currently not in use - negative
          //const getGrandTotal = await dataObject?.getFieldValue("GrandTotal");
          // expect(getGrandTotal, "Failed on getGrandTotal")
          //   .to.be.a("number")
          //   .that.is.equal(
          //     +(randZip * randDiscount * quantitiesTotal).toFixed(4)
          //   );

          console.log(
            "%cDetails - Save - UIObject Finished CRUD testing!",
            "color: #bada55"
          );
        });

        it("CRUD testing on Account Details UIObject - SetFieldValue", async () => {
          console.log(
            "%cDetails - Accounts - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          AccDetailsUIPage.rebuild();
          accUIObject = AccDetailsUIPage.uiObject;

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
          const getTSACheckboxAcc = await accUIObject?.getField(
            "TSACheckboxAcc"
          );
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

          const getTSACurrencyAcc = await accUIObject?.getField(
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

          const getTSANumberAcc = await accUIObject?.getField("TSANumberAcc");
          const formattedNumber = formatter.format(randZip);
          const resultFormatted = formattedNumber.substr(1).split(".");
          expect(getTSANumberAcc?.value, "Failed on getTSANumberAcc.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSANumberAcc?.formattedValue,
              "Failed on getTSANumberAcc.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(resultFormatted[0]).and.is.not.null.and.is.not
              .undefined;

          const getTSADateAcc = await accUIObject?.getField("TSADateAcc");
          const formattedDate = await service.dateFormatter(getTSADateAcc!.value);
          expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is
            .not.null.and.is.not.undefined;

          const getTSADateTimeAcc = await accUIObject?.getField(
            "TSADateTimeAcc"
          );
          let formattedDateTime: any = await service.dateFormatter(
            getTSADateTimeAcc!.value,
            true,
            true
          );
          const formattedTrimmed = formattedDateTime.split(".");
          const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
          expect(formattedTrimmed[0], "Failed on getTSADateTimeAcc")
            .to.be.a("string")
            .and.is.equal(expectedDateTimeValue);

          const getTSADecimalAcc = await accUIObject?.getField("TSADecimalAcc");
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

          const getTSAEmailAcc = await accUIObject?.getField("TSAEmailAcc");
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

          const getTSAHTMLAcc = await accUIObject?.getField("TSAHTMLAcc");
          expect(getTSAHTMLAcc?.value, "fell on TSAHTMLAcc.value")
            .to.be.a("string")
            .and.is.equal(HTML + HTML).and.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc?.formattedValue,
              "fell on TSAHTMLAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal(HTML + HTML).and.is.not.null.and.is.not.undefined;

          const getTSASingleLineTextAcc = await accUIObject?.getField(
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

          const getTSALimitedLineTextAcc = await accUIObject?.getField(
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

          const getTSAParagraphTextAcc = await accUIObject?.getField(
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

          const getTSALinkAcc = await accUIObject?.getField("TSALinkAcc");
          expect(getTSALinkAcc?.value, "fell on getTSALinkAcc.value")
            .to.be.a("string")
            .and.is.equal("https://www.google.com").and.is.not.null.and.is.not
            .undefined,
            expect(
              getTSALinkAcc?.formattedValue,
              "fell on getTSALinkAcc.formattedValue"
            )
              .to.be.a("string")
              .and.is.equal("https://www.google.com").and.is.not.null.and.is.not
              .undefined;

          const getTSAPhoneAcc = await accUIObject?.getField("TSAPhoneAcc");
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

          const getExID = await accUIObject?.getField("ExternalID");
          expect(getExID?.value, "Failed on ExternalID.value")
            .to.be.a("string")
            .that.is.equal(name).and.is.not.null.and.is.not.undefined,
            expect(
              getExID?.formattedValue,
              "Failed on ExternalID.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal(name).and.is.not.null.and.is.not.undefined;

          const getName = await accUIObject?.getField("Name");
          expect(getName?.value, "Failed on Name.value")
            .to.be.a("string")
            .that.is.equal(phrase).and.is.not.null.and.is.not.undefined,
            expect(getName?.formattedValue, "Failed on Name.formattedValue")
              .to.be.a("string")
              .that.is.equal(phrase).and.is.not.null.and.is.not.undefined;

          const getNote = await accUIObject?.getField("Note");
          expect(getNote?.value, "Failed on Note.value")
            .to.be.a("string")
            .that.is.equal(phrase + randDays).and.is.not.null.and.is.not
            .undefined,
            expect(getNote?.formattedValue, "Failed on Note.formattedValue")
              .to.be.a("string")
              .that.is.equal(phrase + randDays).and.is.not.null.and.is.not
              .undefined;

          const getZipCode = await accUIObject?.getField("ZipCode");
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

          const getCity = await accUIObject?.getField("City");
          expect(getCity?.value, "Failed on City.value")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null
            .and.is.not.undefined,
            expect(getCity?.formattedValue, "Failed on City.formattedValue")
              .to.be.a("string")
              .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not
              .null.and.is.not.undefined;

          const getStreet = await accUIObject?.getField("Street");
          expect(getStreet?.value, "Failed on Street.value")
            .to.be.a("string")
            .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not
            .null.and.is.not.undefined,
            expect(getStreet?.formattedValue, "Failed on Street.formattedValue")
              .to.be.a("string")
              .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not
              .null.and.is.not.undefined;

          const getDiscount = await accUIObject?.getField("Discount");
          const formattedDisc = parseFloat(getDiscount?.value!);
          const newValue = randDiscount + 0.5;
          expect(formattedDisc.toFixed(4), "Failed on Discount.value")
            .to.be.a("string")
            .that.is.equal(newValue.toFixed(4)).and.is.not.null.and.is.not
            .undefined,
            expect(
              getDiscount?.formattedValue,
              "Failed on Discount.formattedValue"
            )
              .to.be.a("string")
              .that.is.equal((randDiscount + 0.5).toFixed(2) + "%").and.is.not
              .null.and.is.not.undefined;

          const getFax = await accUIObject?.getField("Fax");
          expect(getFax?.value, "Failed on Fax.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(getFax?.formattedValue, "Failed on Fax.formattedValue")
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getPhone = await accUIObject?.getField("Phone");
          expect(getPhone?.value, "Failed on Phone.value")
            .to.be.a("string")
            .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
            .undefined,
            expect(getPhone?.formattedValue, "Failed on Phone.formattedValue")
              .to.be.a("string")
              .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
              .undefined;

          const getMobile = await accUIObject?.getField("Fax");
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

        it("CRUD testing on Account Details UIObject - Accessors", async () => {
          console.log(
            "%cDetails - Accounts - Accessors - UIObject Starting CRUD testing!",
            "color: #bada55"
          );
          //=======================UIDetailsPage====================================
          try {
            AccDetailsUIPage.title = phrase;
            AccDetailsUIPage.subTitle = phrase;
          } catch (err) {
            console.log(err);
            console.log(
              `%uiDetails CRUD test failed! error: ${err}`,
              "color: #FF0000"
            );
          }

          expect(AccDetailsUIPage.title, "Failed on AccDetailsUIPage.title")
            .to.be.a("string")
            .that.is.equal(phrase),
            expect(
              AccDetailsUIPage.subTitle,
              "Failed on AccDetailsUIPage.subTitle"
            )
              .to.be.a("string")
              .that.is.equal(phrase);
          expect(
            AccDetailsUIPage.dataObject,
            "Failed on AccDetailsUIPage.dataObject"
          ).to.be.an("object").that.is.not.empty.and.is.not.null.and.is.not
            .undefined;
          expect(AccDetailsUIPage.type, "Failed on AccDetailsUIPage.type")
            .to.be.a("string")
            .that.is.equal("Details");
          expect(
            AccDetailsUIPage.key,
            "Failed on AccDetailsUIPage.key"
          ).to.be.a("string").that.is.not.null.and.is.not.undefined;
          expect(
            AccDetailsUIPage.uiObject,
            "Failed on AccDetailsUIPage.uiObject"
          ).to.be.an("object").that.is.not.empty.and.is.not.null.and.is.not
            .undefined;
          //===================================================UIObject=====================================================================
          console.log(accUIObject);

          try {
            accUIObject.backgroundColor = bgColor;
            accUIObject.readonly = false;
          } catch (err) {
            console.log(err);
          }
          const readonly = accUIObject.readonly;
          expect(
            accUIObject.backgroundColor,
            "failed on accUIObject.backgroundColor"
          )
            .to.be.a("string")
            .and.to.be.equal(bgColor).and.is.not.null.and.is.not.empty,
            expect(readonly, "failed on accUIObject.readonly").to.be.a(
              "boolean"
            ).and.to.be.false.and.is.not.null.and.is.not.undefined,
            expect(
              accUIObject.dataObject,
              "failed on accUIObject.dataObject"
            ).to.be.an("object").and.is.not.null.and.is.not.empty.and.is.not
              .undefined,
            expect(accUIObject.key, "failed on accUIObject.key").to.be.a(
              "string"
            ).and.is.not.null.and.is.not.empty.and.is.not.undefined,
            expect(
              accUIObject.context,
              "failed on accUIObject.context"
            ).to.be.an("object").and.is.not.null.and.is.not.empty.and.is.not
              .undefined,
            expect(
              accUIObject.context.Name,
              "failed on accUIObject.context.Name"
            )
              .to.be.a("string")
              .and.is.equal("AccountForm").and.is.not.null.and.is.not.empty.and
              .is.not.undefined,
            expect(
              accUIObject.context.ScreenSize,
              "failed on accUIObject.context.ScreenSize"
            )
              .to.be.a("string")
              .and.is.equal(screenSize[accUIObject.context.ScreenSize]).and.is
              .not.null.and.is.not.empty.and.is.not.undefined,
            expect(
              accUIObject.context.Object?.InternalID,
              "failed on accUIObject.Object?.InternalID"
            )
              .to.be.a("number")
              .that.is.above(0).and.is.not.null.and.is.not.undefined,
            expect(
              accUIObject.context.Object?.Resource,
              "failed on accUIObject.Object?.Resource"
            )
              .to.be.a("string")
              .that.is.equal("accounts").and.is.not.null.and.is.not.empty.and.is
              .not.undefined,
            expect(
              accUIObject.context.Profile.InternalID,
              "failed on accUIObject.Profile?.InternalID"
            )
              .to.be.a("number")
              .that.is.above(-0.1).and.is.not.null.and.is.not.undefined;

          //DI-18839 - Acc UIPage.UIObject.dataViews has fields that return undefind
          //when they fix it will add dataviews tests

          //===============================UIFields==================================
          let setName = await accUIObject.getField("Name");

          try {
            setName!.accessory = randAcessory;
            setName!.backgroundColor = bgColor;
            setName!.decimalDigits = 3;
            setName!.highlighted = true;
            setName!.mandatory = true;
            setName!.readonly = false;
            setName!.textColor = color;
            setName!.title = phrase;
            setName!.visible = true;
            setName!.value = ExID + name + randPhone;
            setName!.formattedValue = ExID + randPhone + name;
          } catch (err) {
            console.log(err);
          }

          let getName = await accUIObject.getField("Name");
          expect(getName, "failed on Name field object").to.be.an("object").that
            .is.not.null.and.is.not.undefined,
            expect(getName!.type, "failed on Name.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getName!.value, "failed on Name.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(
              getName!.formattedValue,
              "failed on Name.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is
              .not.undefined,
            expect(getName!.accessory, "failed on Name.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getName!.backgroundColor,
              "failed on Name.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(getName!.decimalDigits, "failed on Name.decimalDigits field")
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getName!.highlighted,
              "failed on Name.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getName!.mandatory,
              "failed on Name.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(getName!.readonly, "failed on Name.readonly field").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(getName!.textColor, "failed on Name.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getName!.title, "failed on Name.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getName!.visible, "failed on Name.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setExternalID = await accUIObject.getField("ExternalID");

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
            setExternalID!.formattedValue = ExID + randPhone + name;
          } catch (err) {
            console.log(err);
          }

          let getExternalID = await accUIObject.getField("ExternalID");

          expect(getExternalID, "failed on ExternalID field object").to.be.an(
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
              getExternalID!.formattedValue,
              "failed on ExternalID.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is
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

          let setPhone = await accUIObject.getField("Phone");

          try {
            setPhone!.accessory = randAcessory;
            setPhone!.backgroundColor = bgColor;
            setPhone!.decimalDigits = 3;
            setPhone!.highlighted = true;
            setPhone!.mandatory = true;
            setPhone!.readonly = false;
            setPhone!.textColor = color;
            setPhone!.title = phrase;
            setPhone!.visible = true;
            setPhone!.value = ExID + name + randPhone;
            setPhone!.formattedValue = ExID + randPhone + name;
          } catch (err) {
            console.log(err);
          }

          let getPhone = await accUIObject.getField("Phone");

          expect(getPhone, "failed on Phone field object").to.be.an("object")
            .that.is.not.null.and.is.not.undefined,
            expect(getPhone!.type, "failed on Phone.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getPhone!.value, "failed on Phone.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(
              getPhone!.formattedValue,
              "failed on Phone.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is
              .not.undefined,
            expect(getPhone!.accessory, "failed on Phone.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getPhone!.backgroundColor,
              "failed on Phone.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getPhone!.decimalDigits,
              "failed on Phone.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getPhone!.highlighted,
              "failed on Phone.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getPhone!.mandatory,
              "failed on Phone.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getPhone!.readonly,
              "failed on Phone.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getPhone!.textColor, "failed on Phone.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getPhone!.title, "failed on Phone.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getPhone!.visible, "failed on Phone.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setFax = await accUIObject.getField("Fax");

          try {
            setFax!.accessory = randAcessory;
            setFax!.backgroundColor = bgColor;
            setFax!.decimalDigits = 3;
            setFax!.highlighted = true;
            setFax!.mandatory = true;
            setFax!.readonly = false;
            setFax!.textColor = color;
            setFax!.title = phrase;
            setFax!.visible = true;
            setFax!.value = ExID + name + randPhone;
            setFax!.formattedValue = ExID + randPhone + name;
          } catch (err) {
            console.log(err);
          }

          let getFax = await accUIObject.getField("Fax");

          expect(getFax, "failed on Fax field object").to.be.an("object").that
            .is.not.null.and.is.not.undefined,
            expect(getFax!.type, "failed on Fax.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getFax!.value, "failed on Fax.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is
              .not.undefined,
            expect(getFax!.formattedValue, "failed on Fax.formattedValue field")
              .to.be.a("string")
              .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is
              .not.undefined,
            expect(getFax!.accessory, "failed on Fax.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getFax!.backgroundColor,
              "failed on Fax.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(getFax!.decimalDigits, "failed on Fax.decimalDigits field")
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getFax!.highlighted,
              "failed on Fax.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(getFax!.mandatory, "failed on Fax.mandatory field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined,
            expect(getFax!.readonly, "failed on Fax.readonly field").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(getFax!.textColor, "failed on Fax.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getFax!.title, "failed on Fax.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getFax!.visible, "failed on Fax.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setEmail = await accUIObject.getField("Email");

          try {
            setEmail!.accessory = randAcessory;
            setEmail!.backgroundColor = bgColor;
            setEmail!.decimalDigits = 3;
            setEmail!.highlighted = true;
            setEmail!.mandatory = true;
            setEmail!.readonly = false;
            setEmail!.textColor = color;
            setEmail!.title = phrase;
            setEmail!.visible = true;
            setEmail!.value = "dor.s@pepperi.com";
            setEmail!.formattedValue = "dor.s@pepperitest.com";
          } catch (err) {
            console.log(err);
          }

          let getEmail = await accUIObject.getField("Email");

          expect(getEmail, "failed on Email field object").to.be.an("object")
            .that.is.not.null.and.is.not.undefined,
            expect(getEmail!.type, "failed on Email.type field")
              .to.be.a("string")
              .that.is.equal("Email").that.is.not.null.and.is.not.undefined,
            expect(getEmail!.value, "failed on Email.value field")
              .to.be.a("string")
              .and.to.be.equal("dor.s@pepperi.com").that.is.not.null.and.is.not
              .undefined,
            expect(
              getEmail!.formattedValue,
              "failed on Email.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal("dor.s@pepperitest.com").that.is.not.null.and.is
              .not.undefined,
            expect(getEmail!.accessory, "failed on Email.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getEmail!.backgroundColor,
              "failed on Email.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getEmail!.decimalDigits,
              "failed on Email.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getEmail!.highlighted,
              "failed on Email.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getEmail!.mandatory,
              "failed on Email.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getEmail!.readonly,
              "failed on Email.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getEmail!.textColor, "failed on Email.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getEmail!.title, "failed on Email.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getEmail!.visible, "failed on Email.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setDiscount = await accUIObject.getField("Discount");

          try {
            setDiscount!.accessory = randAcessory;
            setDiscount!.backgroundColor = bgColor;
            setDiscount!.decimalDigits = 3;
            setDiscount!.highlighted = true;
            setDiscount!.mandatory = true;
            setDiscount!.readonly = false;
            setDiscount!.textColor = color;
            setDiscount!.title = phrase;
            setDiscount!.visible = true;
            setDiscount!.value = randDiscount.toString();
            setDiscount!.formattedValue = (randDiscount + 0.1).toString();
          } catch (err) {
            console.log(err);
          }

          let getDiscount = await accUIObject.getField("Discount");

          expect(getDiscount, "failed on Discount field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getDiscount!.type, "failed on Discount.type field")
              .to.be.a("string")
              .that.is.equal("Percentage").that.is.not.null.and.is.not
              .undefined,
            expect(getDiscount!.value, "failed on Discount.value field")
              .to.be.a("string")
              .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getDiscount!.formattedValue,
              "failed on Discount.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal((randDiscount + 0.1).toString()).that.is.not.null
              .and.is.not.undefined,
            expect(getDiscount!.accessory, "failed on Discount.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscount!.backgroundColor,
              "failed on Discount.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscount!.decimalDigits,
              "failed on Discount.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscount!.highlighted,
              "failed on Discount.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscount!.mandatory,
              "failed on Discount.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getDiscount!.readonly,
              "failed on Discount.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getDiscount!.textColor, "failed on Discount.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getDiscount!.title, "failed on Discount.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getDiscount!.visible,
              "failed on Discount.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setNote = await accUIObject.getField("Note");

          try {
            setNote!.accessory = randAcessory;
            setNote!.backgroundColor = bgColor;
            setNote!.decimalDigits = 3;
            setNote!.highlighted = true;
            setNote!.mandatory = true;
            setNote!.readonly = false;
            setNote!.textColor = color;
            setNote!.title = phrase;
            setNote!.visible = true;
            setNote!.value = ExID + phrase;
            setNote!.formattedValue = name + phrase;
          } catch (err) {
            console.log(err);
          }

          let getNote = await accUIObject.getField("Note");

          expect(getNote, "failed on Note field object").to.be.an("object").that
            .is.not.null.and.is.not.undefined,
            expect(getNote!.type, "failed on Note.type field")
              .to.be.a("string")
              .that.is.equal("TextArea").that.is.not.null.and.is.not.undefined,
            expect(getNote!.value, "failed on Note.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(
              getNote!.formattedValue,
              "failed on Note.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(getNote!.accessory, "failed on Note.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getNote!.backgroundColor,
              "failed on Note.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(getNote!.decimalDigits, "failed on Note.decimalDigits field")
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getNote!.highlighted,
              "failed on Note.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getNote!.mandatory,
              "failed on Note.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(getNote!.readonly, "failed on Note.readonly field").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(getNote!.textColor, "failed on Note.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getNote!.title, "failed on Note.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getNote!.visible, "failed on Note.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setWrntyID = await accUIObject.getField("WrntyID");

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
            setWrntyID!.value = ExID + phrase;
            setWrntyID!.formattedValue = name + phrase;
          } catch (err) {
            console.log(err);
          }

          let getWrntyID = await accUIObject.getField("WrntyID");

          expect(getWrntyID, "failed on WrntyID field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getWrntyID!.type, "failed on WrntyID.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getWrntyID!.value, "failed on WrntyID.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(
              getWrntyID!.formattedValue,
              "failed on WrntyID.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase).that.is.not.null.and.is.not
              .undefined,
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

          let setStreet = await accUIObject.getField("Street");

          try {
            setStreet!.accessory = randAcessory;
            setStreet!.backgroundColor = bgColor;
            setStreet!.decimalDigits = 3;
            setStreet!.highlighted = true;
            setStreet!.mandatory = true;
            setStreet!.readonly = false;
            setStreet!.textColor = color;
            setStreet!.title = phrase;
            setStreet!.visible = true;
            setStreet!.value = ExID + phrase;
            setStreet!.formattedValue = name + phrase;
          } catch (err) {
            console.log(err);
          }

          let getStreet = await accUIObject.getField("Street");

          expect(getStreet, "failed on Street field object").to.be.an("object")
            .that.is.not.null.and.is.not.undefined,
            expect(getStreet!.type, "failed on Street.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getStreet!.value, "failed on Street.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(
              getStreet!.formattedValue,
              "failed on Street.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(getStreet!.accessory, "failed on Street.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getStreet!.backgroundColor,
              "failed on Street.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getStreet!.decimalDigits,
              "failed on Street.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getStreet!.highlighted,
              "failed on Street.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getStreet!.mandatory,
              "failed on Street.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getStreet!.readonly,
              "failed on Street.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getStreet!.textColor, "failed on Street.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getStreet!.title, "failed on Street.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getStreet!.visible,
              "failed on Street.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setCity = await accUIObject.getField("City");

          try {
            setCity!.accessory = randAcessory;
            setCity!.backgroundColor = bgColor;
            setCity!.decimalDigits = 3;
            setCity!.highlighted = true;
            setCity!.mandatory = true;
            setCity!.readonly = false;
            setCity!.textColor = color;
            setCity!.title = phrase;
            setCity!.visible = true;
            setCity!.value = ExID + phrase;
            setCity!.formattedValue = name + phrase;
          } catch (err) {
            console.log(err);
          }

          let getCity = await accUIObject.getField("City");

          expect(getCity, "failed on City field object").to.be.an("object").that
            .is.not.null.and.is.not.undefined,
            expect(getCity!.type, "failed on City.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getCity!.value, "failed on City.value field")
              .to.be.a("string")
              .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(
              getCity!.formattedValue,
              "failed on City.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase).that.is.not.null.and.is.not
              .undefined,
            expect(getCity!.accessory, "failed on City.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getCity!.backgroundColor,
              "failed on City.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(getCity!.decimalDigits, "failed on City.decimalDigits field")
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getCity!.highlighted,
              "failed on City.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getCity!.mandatory,
              "failed on City.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(getCity!.readonly, "failed on City.readonly field").to.be.a(
              "boolean"
            ).that.is.false.and.that.is.not.null.and.is.not.undefined,
            expect(getCity!.textColor, "failed on City.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getCity!.title, "failed on City.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(getCity!.visible, "failed on City.visible field").to.be.a(
              "boolean"
            ).that.is.true.and.that.is.not.null.and.is.not.undefined;

          let setZipCode = await accUIObject.getField("ZipCode");

          try {
            setZipCode!.accessory = randAcessory;
            setZipCode!.backgroundColor = bgColor;
            setZipCode!.decimalDigits = 3;
            setZipCode!.highlighted = true;
            setZipCode!.mandatory = true;
            setZipCode!.readonly = false;
            setZipCode!.textColor = color;
            setZipCode!.title = phrase;
            setZipCode!.visible = true;
            setZipCode!.value = randZip.toString();
            setZipCode!.formattedValue = randDays.toString();
          } catch (err) {
            console.log(err);
          }

          let getZipCode = await accUIObject.getField("ZipCode");

          expect(getZipCode, "failed on ZipCode field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getZipCode!.type, "failed on ZipCode.type field")
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(getZipCode!.value, "failed on ZipCode.value field")
              .to.be.a("string")
              .and.to.be.equal(randZip.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getZipCode!.formattedValue,
              "failed on ZipCode.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(randDays.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(getZipCode!.accessory, "failed on ZipCode.accessory field")
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getZipCode!.backgroundColor,
              "failed on ZipCode.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getZipCode!.decimalDigits,
              "failed on ZipCode.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getZipCode!.highlighted,
              "failed on ZipCode.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getZipCode!.mandatory,
              "failed on ZipCode.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getZipCode!.readonly,
              "failed on ZipCode.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(getZipCode!.textColor, "failed on ZipCode.textColor field")
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getZipCode!.title, "failed on ZipCode.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getZipCode!.visible,
              "failed on ZipCode.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSASingleLineTextAcc = await accUIObject.getField(
            "TSASingleLineTextAcc"
          );

          try {
            setTSASingleLineTextAcc!.accessory = randAcessory;
            setTSASingleLineTextAcc!.backgroundColor = bgColor;
            setTSASingleLineTextAcc!.decimalDigits = 3;
            setTSASingleLineTextAcc!.highlighted = true;
            setTSASingleLineTextAcc!.mandatory = true;
            setTSASingleLineTextAcc!.readonly = false;
            setTSASingleLineTextAcc!.textColor = color;
            setTSASingleLineTextAcc!.title = phrase;
            setTSASingleLineTextAcc!.visible = true;
            setTSASingleLineTextAcc!.value = name + phrase + randDays;
            setTSASingleLineTextAcc!.formattedValue =
              name + phrase + randDiscount;
          } catch (err) {
            console.log(err);
          }

          let getTSASingleLineTextAcc = await accUIObject.getField(
            "TSASingleLineTextAcc"
          );

          expect(
            getTSASingleLineTextAcc,
            "failed on TSASingleLineTextAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.type,
              "failed on TSASingleLineTextAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.value,
              "failed on TSASingleLineTextAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSASingleLineTextAcc!.formattedValue,
              "failed on TSASingleLineTextAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDiscount).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.accessory,
              "failed on TSASingleLineTextAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineTextAcc!.backgroundColor,
              "failed on TSASingleLineTextAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.decimalDigits,
              "failed on TSASingleLineTextAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.highlighted,
              "failed on TSASingleLineTextAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineTextAcc!.mandatory,
              "failed on TSASingleLineTextAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineTextAcc!.readonly,
              "failed on TSASingleLineTextAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSASingleLineTextAcc!.textColor,
              "failed on TSASingleLineTextAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.title,
              "failed on TSASingleLineTextAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSASingleLineTextAcc!.visible,
              "failed on TSASingleLineTextAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSALimitedLineTextAcc = await accUIObject.getField(
            "TSALimitedLineTextAcc"
          );

          try {
            setTSALimitedLineTextAcc!.accessory = randAcessory;
            setTSALimitedLineTextAcc!.backgroundColor = bgColor;
            setTSALimitedLineTextAcc!.decimalDigits = 3;
            setTSALimitedLineTextAcc!.highlighted = true;
            setTSALimitedLineTextAcc!.mandatory = true;
            setTSALimitedLineTextAcc!.readonly = false;
            setTSALimitedLineTextAcc!.textColor = color;
            setTSALimitedLineTextAcc!.title = phrase;
            setTSALimitedLineTextAcc!.visible = true;
            setTSALimitedLineTextAcc!.value = name + phrase + randDays;
            setTSALimitedLineTextAcc!.formattedValue =
              name + phrase + randDiscount;
          } catch (err) {
            console.log(err);
          }

          let getTSALimitedLineTextAcc = await accUIObject.getField(
            "TSALimitedLineTextAcc"
          );

          expect(
            getTSALimitedLineTextAcc,
            "failed on TSALimitedLineTextAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.type,
              "failed on TSALimitedLineTextAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("LimitedLengthTextBox").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineTextAcc!.value,
              "failed on TSALimitedLineTextAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSALimitedLineTextAcc!.formattedValue,
              "failed on TSALimitedLineTextAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDiscount).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.accessory,
              "failed on TSALimitedLineTextAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineTextAcc!.backgroundColor,
              "failed on TSALimitedLineTextAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.decimalDigits,
              "failed on TSALimitedLineTextAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.highlighted,
              "failed on TSALimitedLineTextAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineTextAcc!.mandatory,
              "failed on TSALimitedLineTextAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineTextAcc!.readonly,
              "failed on TSALimitedLineTextAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALimitedLineTextAcc!.textColor,
              "failed on TSALimitedLineTextAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.title,
              "failed on TSALimitedLineTextAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALimitedLineTextAcc!.visible,
              "failed on TSALimitedLineTextAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSAParagraphTextAcc = await accUIObject.getField(
            "TSAParagraphTextAcc"
          );

          try {
            setTSAParagraphTextAcc!.accessory = randAcessory;
            setTSAParagraphTextAcc!.backgroundColor = bgColor;
            setTSAParagraphTextAcc!.decimalDigits = 3;
            setTSAParagraphTextAcc!.highlighted = true;
            setTSAParagraphTextAcc!.mandatory = true;
            setTSAParagraphTextAcc!.readonly = false;
            setTSAParagraphTextAcc!.textColor = color;
            setTSAParagraphTextAcc!.title = phrase;
            setTSAParagraphTextAcc!.visible = true;
            setTSAParagraphTextAcc!.value = name + phrase + randDays;
            setTSAParagraphTextAcc!.formattedValue =
              name + phrase + randDiscount;
          } catch (err) {
            console.log(err);
          }

          let getTSAParagraphTextAcc = await accUIObject.getField(
            "TSAParagraphTextAcc"
          );

          expect(
            getTSAParagraphTextAcc,
            "failed on TSAParagraphTextAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.type,
              "failed on TSAParagraphTextAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("TextArea").that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.value,
              "failed on TSAParagraphTextAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSAParagraphTextAcc!.formattedValue,
              "failed on TSAParagraphTextAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(name + phrase + randDiscount).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.accessory,
              "failed on TSAParagraphTextAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphTextAcc!.backgroundColor,
              "failed on TSAParagraphTextAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.decimalDigits,
              "failed on TSAParagraphTextAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.highlighted,
              "failed on TSAParagraphTextAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphTextAcc!.mandatory,
              "failed on TSAParagraphTextAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphTextAcc!.readonly,
              "failed on TSAParagraphTextAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAParagraphTextAcc!.textColor,
              "failed on TSAParagraphTextAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.title,
              "failed on TSAParagraphTextAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAParagraphTextAcc!.visible,
              "failed on TSAParagraphTextAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSADateAcc = await accUIObject.getField("TSADateAcc");

          try {
            setTSADateAcc!.accessory = randAcessory;
            setTSADateAcc!.backgroundColor = bgColor;
            setTSADateAcc!.decimalDigits = 3;
            setTSADateAcc!.highlighted = true;
            setTSADateAcc!.mandatory = true;
            setTSADateAcc!.readonly = false;
            setTSADateAcc!.textColor = color;
            setTSADateAcc!.title = phrase;
            setTSADateAcc!.visible = true;
            setTSADateAcc!.value = "2021-07-27";
            setTSADateAcc!.formattedValue = "2020-07-27";
          } catch (err) {
            console.log(err);
          }

          let getTSADateAcc = await accUIObject.getField("TSADateAcc");

          expect(getTSADateAcc, "failed on TSADateAcc field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getTSADateAcc!.type, "failed on TSADateAcc.type field")
              .to.be.a("string")
              .that.is.equal("Date").that.is.not.null.and.is.not.undefined,
            expect(getTSADateAcc!.value, "failed on TSADateAcc.value field")
              .to.be.a("string")
              .and.to.be.equal("2021-07-27").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.formattedValue,
              "failed on TSADateAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal("2020-07-27").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.accessory,
              "failed on TSADateAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.backgroundColor,
              "failed on TSADateAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateAcc!.decimalDigits,
              "failed on TSADateAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateAcc!.highlighted,
              "failed on TSADateAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.mandatory,
              "failed on TSADateAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.readonly,
              "failed on TSADateAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateAcc!.textColor,
              "failed on TSADateAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSADateAcc!.title, "failed on TSADateAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateAcc!.visible,
              "failed on TSADateAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSADateTimeAcc = await accUIObject.getField("TSADateTimeAcc");

          try {
            setTSADateTimeAcc!.accessory = randAcessory;
            setTSADateTimeAcc!.backgroundColor = bgColor;
            setTSADateTimeAcc!.decimalDigits = 3;
            setTSADateTimeAcc!.highlighted = true;
            setTSADateTimeAcc!.mandatory = true;
            setTSADateTimeAcc!.readonly = false;
            setTSADateTimeAcc!.textColor = color;
            setTSADateTimeAcc!.title = phrase;
            setTSADateTimeAcc!.visible = true;
            setTSADateTimeAcc!.value = "2021-07-27T09:09:09.000Z";
            setTSADateTimeAcc!.formattedValue = "2020-07-27 09:09 AM";
          } catch (err) {
            console.log(err);
          }

          let getTSADateTimeAcc = await accUIObject.getField("TSADateTimeAcc");

          expect(
            getTSADateTimeAcc,
            "failed on TSADateTimeAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeAcc!.type,
              "failed on TSADateTimeAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("DateAndTime").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeAcc!.value,
              "failed on TSADateTimeAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal("2021-07-27T09:09:09.000Z").that.is.not.null.and
              .is.not.undefined,
            expect(
              getTSADateTimeAcc!.formattedValue,
              "failed on TSADateTimeAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal("2020-07-27 09:09 AM").that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSADateTimeAcc!.accessory,
              "failed on TSADateTimeAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeAcc!.backgroundColor,
              "failed on TSADateTimeAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeAcc!.decimalDigits,
              "failed on TSADateTimeAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeAcc!.highlighted,
              "failed on TSADateTimeAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeAcc!.mandatory,
              "failed on TSADateTimeAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeAcc!.readonly,
              "failed on TSADateTimeAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADateTimeAcc!.textColor,
              "failed on TSADateTimeAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeAcc!.title,
              "failed on TSADateTimeAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADateTimeAcc!.visible,
              "failed on TSADateTimeAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSANumberAcc = await accUIObject.getField("TSANumberAcc");

          try {
            setTSANumberAcc!.accessory = randAcessory;
            setTSANumberAcc!.backgroundColor = bgColor;
            setTSANumberAcc!.decimalDigits = 3;
            setTSANumberAcc!.highlighted = true;
            setTSANumberAcc!.mandatory = true;
            setTSANumberAcc!.readonly = false;
            setTSANumberAcc!.textColor = color;
            setTSANumberAcc!.title = phrase;
            setTSANumberAcc!.visible = true;
            setTSANumberAcc!.value = randDays.toString();
            setTSANumberAcc!.formattedValue = randZip.toString();
          } catch (err) {
            console.log(err);
          }

          let getTSANumberAcc = await accUIObject.getField("TSANumberAcc");

          expect(
            getTSANumberAcc,
            "failed on TSANumberAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getTSANumberAcc!.type, "failed on TSANumberAcc.type field")
              .to.be.a("string")
              .that.is.equal("NumberInteger").that.is.not.null.and.is.not
              .undefined,
            expect(getTSANumberAcc!.value, "failed on TSANumberAcc.value field")
              .to.be.a("string")
              .and.to.be.equal(randDays.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.formattedValue,
              "failed on TSANumberAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(randZip.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.accessory,
              "failed on TSANumberAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.backgroundColor,
              "failed on TSANumberAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberAcc!.decimalDigits,
              "failed on TSANumberAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberAcc!.highlighted,
              "failed on TSANumberAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.mandatory,
              "failed on TSANumberAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.readonly,
              "failed on TSANumberAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSANumberAcc!.textColor,
              "failed on TSANumberAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSANumberAcc!.title, "failed on TSANumberAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSANumberAcc!.visible,
              "failed on TSANumberAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSADecimalAcc = await accUIObject.getField("TSADecimalAcc");

          try {
            setTSADecimalAcc!.accessory = randAcessory;
            setTSADecimalAcc!.backgroundColor = bgColor;
            setTSADecimalAcc!.decimalDigits = 3;
            setTSADecimalAcc!.highlighted = true;
            setTSADecimalAcc!.mandatory = true;
            setTSADecimalAcc!.readonly = false;
            setTSADecimalAcc!.textColor = color;
            setTSADecimalAcc!.title = phrase;
            setTSADecimalAcc!.visible = true;
            setTSADecimalAcc!.value = (randDiscount * 2).toString();
            setTSADecimalAcc!.formattedValue = randDiscount.toString();
          } catch (err) {
            console.log(err);
          }

          let getTSADecimalAcc = await accUIObject.getField("TSADecimalAcc");

          expect(
            getTSADecimalAcc,
            "failed on TSADecimalAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(getTSADecimalAcc!.type, "failed on TSADecimalAcc.type field")
              .to.be.a("string")
              .that.is.equal("NumberReal").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalAcc!.value,
              "failed on TSADecimalAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randDiscount * 2).toString()).that.is.not.null
              .and.is.not.undefined,
            expect(
              getTSADecimalAcc!.formattedValue,
              "failed on TSADecimalAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSADecimalAcc!.accessory,
              "failed on TSADecimalAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalAcc!.backgroundColor,
              "failed on TSADecimalAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalAcc!.decimalDigits,
              "failed on TSADecimalAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalAcc!.highlighted,
              "failed on TSADecimalAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalAcc!.mandatory,
              "failed on TSADecimalAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalAcc!.readonly,
              "failed on TSADecimalAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSADecimalAcc!.textColor,
              "failed on TSADecimalAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalAcc!.title,
              "failed on TSADecimalAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSADecimalAcc!.visible,
              "failed on TSADecimalAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSACurrencyAcc = await accUIObject.getField("TSACurrencyAcc");

          try {
            setTSACurrencyAcc!.accessory = randAcessory;
            setTSACurrencyAcc!.backgroundColor = bgColor;
            setTSACurrencyAcc!.decimalDigits = 3;
            setTSACurrencyAcc!.highlighted = true;
            setTSACurrencyAcc!.mandatory = true;
            setTSACurrencyAcc!.readonly = false;
            setTSACurrencyAcc!.textColor = color;
            setTSACurrencyAcc!.title = phrase;
            setTSACurrencyAcc!.visible = true;
            setTSACurrencyAcc!.value = (randDays * 2).toString();
            setTSACurrencyAcc!.formattedValue = randDays.toString();
          } catch (err) {
            console.log(err);
          }

          let getTSACurrencyAcc = await accUIObject.getField("TSACurrencyAcc");

          expect(
            getTSACurrencyAcc,
            "failed on TSACurrencyAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.type,
              "failed on TSACurrencyAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("Currency").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.value,
              "failed on TSACurrencyAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal((randDays * 2).toString()).that.is.not.null.and
              .is.not.undefined,
            expect(
              getTSACurrencyAcc!.formattedValue,
              "failed on TSACurrencyAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(randDays.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyAcc!.accessory,
              "failed on TSACurrencyAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyAcc!.backgroundColor,
              "failed on TSACurrencyAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.decimalDigits,
              "failed on TSACurrencyAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.highlighted,
              "failed on TSACurrencyAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyAcc!.mandatory,
              "failed on TSACurrencyAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyAcc!.readonly,
              "failed on TSACurrencyAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACurrencyAcc!.textColor,
              "failed on TSACurrencyAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.title,
              "failed on TSACurrencyAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACurrencyAcc!.visible,
              "failed on TSACurrencyAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSACheckboxAcc = await accUIObject.getField("TSACheckboxAcc");

          try {
            setTSACheckboxAcc!.accessory = randAcessory;
            setTSACheckboxAcc!.backgroundColor = bgColor;
            setTSACheckboxAcc!.decimalDigits = 3;
            setTSACheckboxAcc!.highlighted = true;
            setTSACheckboxAcc!.mandatory = true;
            setTSACheckboxAcc!.readonly = false;
            setTSACheckboxAcc!.textColor = color;
            setTSACheckboxAcc!.title = phrase;
            setTSACheckboxAcc!.visible = true;
            setTSACheckboxAcc!.value = randBool.toString();
            setTSACheckboxAcc!.formattedValue = (!randBool).toString();
          } catch (err) {
            console.log(err);
          }

          let getTSACheckboxAcc = await accUIObject.getField("TSACheckboxAcc");

          expect(
            getTSACheckboxAcc,
            "failed on TSACheckboxAcc field object"
          ).to.be.an("object").that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxAcc!.type,
              "failed on TSACheckboxAcc.type field"
            )
              .to.be.a("string")
              .that.is.equal("BooleanText").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.value,
              "failed on TSACheckboxAcc.value field"
            )
              .to.be.a("string")
              .and.to.be.equal(randBool.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.formattedValue,
              "failed on TSACheckboxAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSACheckboxAcc!.accessory,
              "failed on TSACheckboxAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.backgroundColor,
              "failed on TSACheckboxAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxAcc!.decimalDigits,
              "failed on TSACheckboxAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxAcc!.highlighted,
              "failed on TSACheckboxAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.mandatory,
              "failed on TSACheckboxAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.readonly,
              "failed on TSACheckboxAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSACheckboxAcc!.textColor,
              "failed on TSACheckboxAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxAcc!.title,
              "failed on TSACheckboxAcc.title field"
            )
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSACheckboxAcc!.visible,
              "failed on TSACheckboxAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSAPhoneAcc = await accUIObject.getField("TSAPhoneAcc");

          try {
            setTSAPhoneAcc!.accessory = randAcessory;
            setTSAPhoneAcc!.backgroundColor = bgColor;
            setTSAPhoneAcc!.decimalDigits = 3;
            setTSAPhoneAcc!.highlighted = true;
            setTSAPhoneAcc!.mandatory = true;
            setTSAPhoneAcc!.readonly = false;
            setTSAPhoneAcc!.textColor = color;
            setTSAPhoneAcc!.title = phrase;
            setTSAPhoneAcc!.visible = true;
            setTSAPhoneAcc!.value = randDays.toString();
            setTSAPhoneAcc!.formattedValue = (randDays * 2).toString();
          } catch (err) {
            console.log(err);
          }

          let getTSAPhoneAcc = await accUIObject.getField("TSAPhoneAcc");

          expect(getTSAPhoneAcc, "failed on TSAPhoneAcc field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getTSAPhoneAcc!.type, "failed on TSAPhoneAcc.type field")
              .to.be.a("string")
              .that.is.equal("Phone").that.is.not.null.and.is.not.undefined,
            expect(getTSAPhoneAcc!.value, "failed on TSAPhoneAcc.value field")
              .to.be.a("string")
              .and.to.be.equal(randDays.toString()).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneAcc!.formattedValue,
              "failed on TSAPhoneAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal((randDays * 2).toString()).that.is.not.null.and
              .is.not.undefined,
            expect(
              getTSAPhoneAcc!.accessory,
              "failed on TSAPhoneAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneAcc!.backgroundColor,
              "failed on TSAPhoneAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneAcc!.decimalDigits,
              "failed on TSAPhoneAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneAcc!.highlighted,
              "failed on TSAPhoneAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneAcc!.mandatory,
              "failed on TSAPhoneAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneAcc!.readonly,
              "failed on TSAPhoneAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAPhoneAcc!.textColor,
              "failed on TSAPhoneAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSAPhoneAcc!.title, "failed on TSAPhoneAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAPhoneAcc!.visible,
              "failed on TSAPhoneAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSALinkAcc = await accUIObject.getField("TSALinkAcc");

          try {
            setTSALinkAcc!.accessory = randAcessory;
            setTSALinkAcc!.backgroundColor = bgColor;
            setTSALinkAcc!.decimalDigits = 3;
            setTSALinkAcc!.highlighted = true;
            setTSALinkAcc!.mandatory = true;
            setTSALinkAcc!.readonly = false;
            setTSALinkAcc!.textColor = color;
            setTSALinkAcc!.title = phrase;
            setTSALinkAcc!.visible = true;
            setTSALinkAcc!.value = link;
            setTSALinkAcc!.formattedValue = "www.google.com";
          } catch (err) {
            console.log(err);
          }

          let getTSALinkAcc = await accUIObject.getField("TSALinkAcc");

          expect(getTSALinkAcc, "failed on TSALinkAcc field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getTSALinkAcc!.type, "failed on TSALinkAcc.type field")
              .to.be.a("string")
              .that.is.equal("Link").that.is.not.null.and.is.not.undefined,
            expect(getTSALinkAcc!.value, "failed on TSALinkAcc.value field")
              .to.be.a("string")
              .and.to.be.equal(link).that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkAcc!.formattedValue,
              "failed on TSALinkAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal("www.google.com").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkAcc!.accessory,
              "failed on TSALinkAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkAcc!.backgroundColor,
              "failed on TSALinkAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkAcc!.decimalDigits,
              "failed on TSALinkAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkAcc!.highlighted,
              "failed on TSALinkAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkAcc!.mandatory,
              "failed on TSALinkAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkAcc!.readonly,
              "failed on TSALinkAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSALinkAcc!.textColor,
              "failed on TSALinkAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSALinkAcc!.title, "failed on TSALinkAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSALinkAcc!.visible,
              "failed on TSALinkAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSAHTMLAcc = await accUIObject.getField("TSAHTMLAcc");

          try {
            setTSAHTMLAcc!.accessory = randAcessory;
            setTSAHTMLAcc!.backgroundColor = bgColor;
            setTSAHTMLAcc!.decimalDigits = 3;
            setTSAHTMLAcc!.highlighted = true;
            setTSAHTMLAcc!.mandatory = true;
            setTSAHTMLAcc!.readonly = false;
            setTSAHTMLAcc!.textColor = color;
            setTSAHTMLAcc!.title = phrase;
            setTSAHTMLAcc!.visible = true;
            setTSAHTMLAcc!.value = HTML;
            setTSAHTMLAcc!.formattedValue = HTML + HTML;
          } catch (err) {
            console.log(err);
          }

          let getTSAHTMLAcc = await accUIObject.getField("TSAHTMLAcc");

          expect(getTSAHTMLAcc, "failed on TSAHTMLAcc field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLAcc!.type, "failed on TSAHTMLAcc.type field")
              .to.be.a("string")
              .that.is.equal("RichTextHTML").that.is.not.null.and.is.not
              .undefined,
            expect(getTSAHTMLAcc!.value, "failed on TSAHTMLAcc.value field")
              .to.be.a("string")
              .and.to.be.equal(HTML).that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc!.formattedValue,
              "failed on TSAHTMLAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal(HTML + HTML).that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLAcc!.accessory,
              "failed on TSAHTMLAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLAcc!.backgroundColor,
              "failed on TSAHTMLAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc!.decimalDigits,
              "failed on TSAHTMLAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc!.highlighted,
              "failed on TSAHTMLAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLAcc!.mandatory,
              "failed on TSAHTMLAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLAcc!.readonly,
              "failed on TSAHTMLAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAHTMLAcc!.textColor,
              "failed on TSAHTMLAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSAHTMLAcc!.title, "failed on TSAHTMLAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAHTMLAcc!.visible,
              "failed on TSAHTMLAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;

          let setTSAEmailAcc = await accUIObject.getField("TSAEmailAcc");

          try {
            setTSAEmailAcc!.accessory = randAcessory;
            setTSAEmailAcc!.backgroundColor = bgColor;
            setTSAEmailAcc!.decimalDigits = 3;
            setTSAEmailAcc!.highlighted = true;
            setTSAEmailAcc!.mandatory = true;
            setTSAEmailAcc!.readonly = false;
            setTSAEmailAcc!.textColor = color;
            setTSAEmailAcc!.title = phrase;
            setTSAEmailAcc!.visible = true;
            setTSAEmailAcc!.value = "dor.s@pepperi.com";
            setTSAEmailAcc!.formattedValue = "dor.s@pepperitest.com";
          } catch (err) {
            console.log(err);
          }

          let getTSAEmailAcc = await accUIObject.getField("TSAEmailAcc");

          expect(getTSAEmailAcc, "failed on TSAEmailAcc field object").to.be.an(
            "object"
          ).that.is.not.null.and.is.not.undefined,
            expect(getTSAEmailAcc!.type, "failed on TSAEmailAcc.type field")
              .to.be.a("string")
              .that.is.equal("Email").that.is.not.null.and.is.not.undefined,
            expect(getTSAEmailAcc!.value, "failed on TSAEmailAcc.value field")
              .to.be.a("string")
              .and.to.be.equal("dor.s@pepperi.com").that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailAcc!.formattedValue,
              "failed on TSAEmailAcc.formattedValue field"
            )
              .to.be.a("string")
              .and.to.be.equal("dor.s@pepperitest.com").that.is.not.null.and.is
              .not.undefined,
            expect(
              getTSAEmailAcc!.accessory,
              "failed on TSAEmailAcc.accessory field"
            )
              .to.be.a("string")
              .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailAcc!.backgroundColor,
              "failed on TSAEmailAcc.backgroundColor field"
            )
              .to.be.a("string")
              .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailAcc!.decimalDigits,
              "failed on TSAEmailAcc.decimalDigits field"
            )
              .to.be.a("number")
              .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailAcc!.highlighted,
              "failed on TSAEmailAcc.highlighted field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailAcc!.mandatory,
              "failed on TSAEmailAcc.mandatory field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailAcc!.readonly,
              "failed on TSAEmailAcc.readonly field"
            ).to.be.a("boolean").that.is.false.and.that.is.not.null.and.is.not
              .undefined,
            expect(
              getTSAEmailAcc!.textColor,
              "failed on TSAEmailAcc.textColor field"
            )
              .to.be.a("string")
              .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
            expect(getTSAEmailAcc!.title, "failed on TSAEmailAcc.title field")
              .to.be.a("string")
              .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
            expect(
              getTSAEmailAcc!.visible,
              "failed on TSAEmailAcc.visible field"
            ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
              .undefined;
          console.log(
            "%cDetails - Accounts - Accessors - UIObject Finished CRUD testing!",
            "color: #bada55"
          );
        });
      });
      break;
    }
    //===========================Neagative==========================================
    case "Negative": {
      describe("Item DataObject Basic Negative CRUD test", async () => {
        it("Basic Negative CRUD for SetFieldValue and GetFieldValue", async () => {
          //=================================SET=====================================
          //SET for TSA's
          try {
            await itemDataObject?.setFieldValue(
              "TSASingleLineText",
              phrase + randDiscount
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSASingleLineText with value: ${
                    phrase + randDiscount
                  }, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue(
              "TSALimitedLineText",
              phrase + randDiscount
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSALimitedLineText with value: ${
                    phrase + randDiscount
                  }, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue(
              "TSAParagraphText",
              phrase + randDiscount
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSAParagraphText with value: ${
                    phrase + randDiscount
                  }, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSADate", dateOnly);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADate with value: ${dateOnly}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSADateTime", date);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADateTime with value: ${date}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue(
              "TSADecimal",
              randDiscount.toFixed(6)
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADecimal with value: ${randDiscount.toFixed(
                    6
                  )}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSANumber", quantitiesTotal);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSANumber with value: ${quantitiesTotal}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSACurrency", quantitiesTotal);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACurrency with value: ${quantitiesTotal}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSACheckbox", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACheckbox with value: ${randBool}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSAEmail", userEmail);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSAEmail with value: ${userEmail}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSAPhone", randPhone);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSAPhone with value: ${randPhone}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSALink", link);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSALink with value: ${link}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("TSAHTML", HTML);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSAHTML with value: ${HTML}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("UPC", ExID);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field UPC with value: ${ExID}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("LongDescription", name);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field LongDescription with value: ${name}, Item is not editable`
                );
            }
          }

          try {
            await itemDataObject?.setFieldValue("Price", quantitiesTotal);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field Price with value: ${quantitiesTotal}, Item is not editable`
                );
            }
          }

          //=================================GET=====================================
          const getTSASingleLineText = await itemDataObject?.getFieldValue(
            "TSASingleLineText"
          );

          expect(
            getTSASingleLineText,
            "Failed on getTSASingleLineText"
          ).that.is.not.equal(phrase + randDiscount);

          const getTSALimitedLineText = await itemDataObject?.getFieldValue(
            "TSALimitedLineText"
          );

          expect(
            getTSALimitedLineText,
            "Failed on getTSALimitedLineText"
          ).that.is.not.equal(phrase + randDiscount);

          const getTSAParagrathText = await itemDataObject?.getFieldValue(
            "TSAParagraphText"
          );

          expect(
            getTSAParagrathText,
            "Failed on getTSAParagrathText"
          ).that.is.not.equal(phrase + randDiscount);

          const getTSADate = await itemDataObject?.getFieldValue("TSADate");

          expect(getTSADate, "Failed on getTSADate").that.is.not.equal(
            dateOnly
          );

          const getTSADT = await itemDataObject?.getFieldValue("TSADateTime");

          expect(getTSADT, "Failed on getTSADateTime").that.is.not.equal(
            dateOnly
          );

          const getTSADecimal = await itemDataObject?.getFieldValue(
            "TSADecimal"
          );

          expect(getTSADecimal, "Failed on getTSADecimal").that.is.not.equal(
            +randDiscount.toFixed(3)
          );

          const getTSANumber = await itemDataObject?.getFieldValue("TSANumber");

          expect(getTSANumber, "Failed on getTSANumber").that.is.not.equal(
            quantitiesTotal
          );

          const getTSACurrency = await itemDataObject?.getFieldValue(
            "TSACurrency"
          );

          expect(getTSACurrency, "Failed on getTSACurrency").that.is.not.equal(
            quantitiesTotal
          );

          const getTSACheckbox = await itemDataObject?.getFieldValue(
            "TSACheckbox"
          );

          expect(getTSACheckbox, "Failed on getTSACheckbox").that.is.not.equal(
            randBool
          );

          const getTSAEmail = await itemDataObject?.getFieldValue("TSAEmail");

          expect(getTSAEmail, "Failed on getTSAEmail").that.is.not.equal(
            userEmail
          );

          const getTSAPhone = await itemDataObject?.getFieldValue("TSAPhone");

          expect(getTSAPhone, "Failed on getTSAPhone").that.is.not.equal(
            randPhone
          );

          const getTSALink = await itemDataObject?.getFieldValue("TSALink");

          expect(getTSALink, "Failed on getTSALink").that.is.not.equal(link);

          const getTSAHTML = await itemDataObject?.getFieldValue("TSAHTML");

          expect(getTSAHTML, "Failed on getTSAHTML").that.is.not.equal(HTML);

          const getUPC = await itemDataObject?.getFieldValue("UPC");

          expect(getUPC, "Failed on getUPC").that.is.not.equal(ExID);

          const getName = await itemDataObject?.getFieldValue("Name");

          expect(getName, "Failed on getName").that.is.not.equal(name);

          const getLngDesc = await itemDataObject?.getFieldValue(
            "LongDescription"
          );

          expect(getLngDesc, "Failed on getLngDesc").that.is.not.equal(name);

          const getPrice = await itemDataObject?.getFieldValue("Price");

          expect(getPrice, "Failed on getPrice").that.is.not.equal(
            quantitiesTotal
          );
        });
        it("Basic CRUD for Items DataObject Accessors", async () => {
          const ExternalID = itemDataObject?.externalID;
          const hidden = itemDataObject?.hidden;
          const internalID = itemDataObject?.internalID;
          const resource = itemDataObject?.resource;
          const typeDef = itemDataObjectTypeDef?.typeDefinition; // CG2 special item with ATDID Sales Order
          const uuid = itemDataObject?.uuid;

          expect(hidden, "Failed on hidden accessor").to.be.a("boolean").that.is
            .false.and.is.not.null.and.is.not.undefined;

          expect(ExternalID, "Failed on ExternalID accessor").to.be.a("string")
            .and.is.not.null.and.is.not.undefined;

          expect(resource, "Failed on resource accessor")
            .to.be.a("string")
            .that.is.equal("items").and.is.not.null.and.is.not.undefined;

          expect(internalID, "Failed on internalID accessor")
            .to.be.a("number")
            .that.is.above(1).and.is.not.null.and.is.not.undefined;

          expect(uuid, "Failed on uuid accessor")
            .to.be.a("string")
            .that.has.lengthOf(36).and.is.not.null.and.is.not.undefined;

          expect(
            typeDef?.hidden,
            "failed on typeDef.hidden accessor being true"
          ).to.be.a("boolean").that.is.false;
          expect(typeDef?.internalID, "failed on typeDef.internalID accessor")
            .to.be.a("number")
            .that.is.above(1);
          expect(
            typeDef?.name,
            "failed on typeDef.name accessor not being Sales Order"
          )
            .to.be.a("string")
            .and.is.equal("Sales Order");
          expect(
            typeDef?.resource,
            "failed on typeDef.resource accessor not being types"
          )
            .to.be.a("string")
            .and.is.equal("types");
          expect(
            typeDef?.type,
            "failed on typeDef.type accessor not being transactions"
          )
            .to.be.a("string")
            .and.is.equal("transactions");
          expect(typeDef?.uuid, "Failed on typeDef.uuid accessor")
            .to.be.a("string")
            .that.has.lengthOf(36).and.is.not.null.and.is.not.undefined;
        });
      });
      describe("Inserted Values Negative CRUD test", async () => {
        it("Activity dataObject Negative CRUD for SetFieldValue", async () => {
          try {
            await actDataObject?.setFieldValue(
              "TSADateTimeACT",
              "random crap" /// DI-18925 - dataObject.setFieldValue allows to insert alphabetical string into a date formatted field
            );
          } catch (err) {
            console.log(err);
            if (err instanceof Error) {
              // expect(err.message)
              //   .to.be.a("string")
              //   .that.is.equal(
              //     `Error setting field TSASingleLineText with value: ${
              //       phrase + randDiscount
              //     }, Item is not editable`
              //   );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSANumberACT", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSANumberACT with value: ${phrase}, Error: Setting value for field: TSANumberACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSANumberACT", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSANumberACT with value: ${randBool}, Error: Setting value for field: TSANumberACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSADecimalACT", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADecimalACT with value: ${phrase}, Error: Setting value for field: TSADecimalACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSADecimalACT", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADecimalACT with value: ${randBool}, Error: Setting value for field: TSADecimalACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSACurrencyACT", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACurrencyACT with value: ${phrase}, Error: Setting value for field: TSACurrencyACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSACurrencyACT", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACurrencyACT with value: ${randBool}, Error: Setting value for field: TSACurrencyACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSACheckboxACT", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACheckboxACT with value: ${phrase}, Error: Setting value for field: TSACheckboxACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("TSACheckboxACT", randZip);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSACheckboxACT with value: ${randZip}, Error: Setting value for field: TSACheckboxACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          //currently no validation firing for the below
          try {
            await actDataObject?.setFieldValue("TSADateACT", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSADateACT with value: ${randBool}, Error: Setting value for field: TSADateACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          let longString = "";
          for (let i = 0; i < 250; i++) {
            longString = longString + name + phrase;
          }
          //currently no validation firing for the below
          try {
            await actDataObject?.setFieldValue(
              "TSALimitedLineTextACT",
              longString
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field TSASingleLineTextACT with value: ${longString}, Error: Setting value for field: TSASingleLineTextACT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("PlannedDuration", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field PlannedDuration with value: ${phrase}, Error: Setting value for field: PlannedDuration failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("PlannedDuration", randBool);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field PlannedDuration with value: ${randBool}, Error: Setting value for field: PlannedDuration failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue(
              "SubmissionGeoCodeLAT",
              randBool
            );
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field SubmissionGeoCodeLAT with value: ${randBool}, Error: Setting value for field: SubmissionGeoCodeLAT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("SubmissionGeoCodeLAT", name);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field SubmissionGeoCodeLAT with value: ${name}, Error: Setting value for field: SubmissionGeoCodeLAT failed with error: ILLEGAL_VALUE`
                );
            }
          }

          try {
            await actDataObject?.setFieldValue("x", name);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field x with value: ${name}, Error: Setting value for field: x failed with error: APINAME_DOES_NOT_EXIST`
                );
            }
          }
        });
        it("Transaction header UIObject Negative CRUD for SetFieldValue", async () => {
          const uiObject = TrnDetailsUIPage.uiObject;

          //DI-18940 - uiObject.setFieldValue with incorrect APIName returns no exception
          try {
            await uiObject?.setFieldValue("x", phrase);
          } catch (err) {
            if (err instanceof Error) {
              expect(err.message)
                .to.be.a("string")
                .that.is.equal(
                  `Error setting field x with value: ${phrase}, Error: Setting value for field: x failed with error: ILLEGAL_VALUE`
                );
            }
          }
        });
      });
      break;
    }
    //===========================Error handling=====================================
    case "error": {
      console.log(
        "%cThe test name you've inserted does not exist,try again with 'Data','UI1/2' or 'Negative'",
        "color: #FF0000"
      );
      break;
    }
  }
  const testResult = await run();
  res.json(testResult);
});
//setup routers for AddonAPI automation tests
router.get("/addon-api/get", (req, res) => {
  console.log("AddonAPI test currently on CPISide - GET with query params");
  const queryString = req.query.q;
  if (
    queryString === "queryParam" &&
    queryString !== null &&
    queryString !== undefined
  ) {
    res.json({
      result: "success",
      params: queryString,
    });
  }
  res.json({ result: "failure" });
});
router.post("/addon-api/post", async (req, res) => {
  console.log("AddonAPI test currently on CPISide - POST with body params");
  const bodyParams = req.body.a;
  if (
    bodyParams === "bodyParam" &&
    bodyParams !== null &&
    bodyParams !== undefined
  ) {
    res.json({
      result: "success",
      params: bodyParams,
    });
  }
  res.json({ result: "failure" });
});
router.use("/addon-api/:v/use", async (req, res, next) => {
  console.log("AddonAPI test currently on CPISide - USE with params");
  const params = req.params.v;
  try {
    if (params === "param" && params !== null && params !== undefined) {
      res.json({
        result: "success",
        params: params,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ result: "failure", error: err });
  }
});
//Recalculate trigger for interceptors test
router.get("/recalculate/:UUID/trigger", async (req, res, next) => {
  const accountUUID = req.params.UUID;
  if (accountUUID === null || accountUUID === undefined || accountUUID === "") {
    res.json({
      result: "failure - no UUID was passed",
    });
  }
  let accDataObject = await pepperi.DataObject.Get("accounts", accountUUID);
  let accDetailsUIPage;
  if (accDataObject!) {
    try {
      accDetailsUIPage = await pepperi.UIPage.Create("Details", accDataObject!);
      await accDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
      res.json({
        result: "failure - failed on creating UIObject",
      });
    }
  }
  res.json({
    result: "success",
  });
});
//==============================/ClientAPI/ADAL=======================================
router.get("/ClientAPI/ADAL", async (req, res, next) => {
  const { describe, it, expect, run } = Tester("My test");
  describe("ClientAPI/ADAL Automation Test", async () => {
    it("Negative ADAL.get() test", async () => {
      //negative with invalid key
      try {
        const negativeGet1 = await pepperi.api.adal.get({
          addon: addonUUID,
          table: adalTableName,
          key: "negativeKey",
        });
      } catch (err) {
        if (err instanceof Error) {
          expect(
            err.message,
            "Negative get1 returned the wrong message"
          ).to.be.equal(
            "Could not find object with key: 'negativeKey' on table: 'Load_Test'"
          ).and.is.not.null;
          expect(
            err.name,
            "Negative get1 returned the wrong exception name"
          ).to.be.equal("ClientApiError").and.is.not.null;
        }
      }
      //negative with invalid table
      try {
        const negativeGet2 = await pepperi.api.adal.get({
          addon: addonUUID,
          table: "randomTableName",
          key: "testKey1",
        });
      } catch (err) {
        if (err instanceof Error) {
          expect(
            err.message,
            "Negative get2 returned the wrong message"
          ).to.be.equal(
            "Could not find object with key: 'testKey1' on table: 'randomTableName'"
          ).and.is.not.null;
          expect(
            err.name,
            "Negative get2 returned the wrong exception name"
          ).to.be.equal("ClientApiError").and.is.not.null;
        }
      }

      //negative with invalid  addonUUID
      try {
        const negativeGet3 = await pepperi.api.adal.get({
          addon: "random-uuid-for-this-test",
          table: adalTableName,
          key: "testKey1",
        });
      } catch (err) {
        if (err instanceof Error) {
          expect(
            err.message,
            "Negative get3 returned the wrong message"
          ).to.be.equal(
            "Could not find object with key: 'testKey1' on table: 'Load_Test'"
          ).and.is.not.null;
          expect(
            err.name,
            "Negative get3 returned the wrong exception name"
          ).to.be.equal("ClientApiError").and.is.not.null;
        }
      }
    });
    it("Positive ADAL.get() test", async () => {
      //positive with valid key
      const get = await pepperi.api.adal.get({
        addon: addonUUID,
        table: adalTableName,
        key: "testKey2",
      });

      expect(get.object.Key, "ADAL returned the wrong key").that.is.equal(
        "testKey2"
      ).and.is.not.null;
      expect(
        get.object.Name,
        "ADAL string returned the wrong value"
      ).that.is.equal("ADALTest").and.is.not.null;
      expect(
        get.object.object.Array,
        "ADAL returned the wrong array value"
      ).to.eql([1, 2, 3, 4, 5]).and.is.not.null;
      expect(
        get.object.object.String,
        "ADAL string returned the wrong String value"
      ).that.is.equal("Red pill or Blue pill?").and.is.not.null;
      expect(
        get.object.object.object.string,
        "ADAL returned the wrong object string value"
      ).that.is.equal("random string").and.is.not.null;
      expect(
        get.object.object.object.number,
        "ADAL string returned the wrong object number value"
      ).that.is.equal(27).and.is.not.null;
      expect(
        get.object.object.object.boolean,
        "ADAL string returned the wrong object boolean value"
      ).that.is.equal(true).and.is.not.null;
    });

    it("Negative ADAL.getList() test", async () => {
      //negative to a list that does not exist
      //no addon uuid
      const getListNegative1 = await pepperi.api.adal.getList({
        addon: "random-uuid-for-this-test",
        table: adalTableName,
      });
      expect(
        getListNegative1.objects,
        "getList Negative test returned the wrong number of values"
      )
        .that.is.an("Array")
        .that.has.lengthOf(0);
      //no tableName
      const getListNegative2 = await pepperi.api.adal.getList({
        addon: addonUUID,
        table: "randomTableName",
      });
      expect(
        getListNegative2.objects,
        "getList Negative test returned the wrong number of values"
      )
        .that.is.an("Array")
        .that.has.lengthOf(0);
    });
    it("Positive ADAL.getList() test", async () => {
      //positive with correct list name
      const getList = await pepperi.api.adal.getList({
        addon: addonUUID,
        table: adalTableName,
      });
      console.log(getList.objects);
      expect(getList.objects, "ADAL array had returned the wrong value")
        .that.is.an("array")
        .that.has.lengthOf(4).and.is.not.null;
      expect(
        getList.objects[1].Key,
        "First ADAL key returned the incorrect result"
      ).that.is.equal("testKey1").and.is.not.null;
      expect(
        getList.objects[2].Key,
        "Second ADAL key returned the incorrect result"
      ).that.is.equal("testKey2").and.is.not.null;
      expect(
        getList.objects[1].Name,
        "First ADAL name returned the incorrect result"
      ).that.is.equal("Load_Test").and.is.not.null;
      expect(
        getList.objects[2].Name,
        "Second ADAL name returned the incorrect result"
      ).that.is.equal("ADALTest").and.is.not.null;
      expect(
        getList.objects[3].Name,
        "Third ADAL name returned the incorrect result"
      ).that.is.equal("PerformenceTest").and.is.not.null;
      expect(
        getList.objects[1].InterceptorsTestActive,
        "First boolean failed on first record"
      ).that.is.equal(false).and.is.not.null;
      expect(
        getList.objects[1].TestActive,
        "Second boolean failed on first record"
      ).that.is.equal(false).and.is.not.null;
      expect(
        getList.objects[1].TestRunCounter,
        "First number failed on first record"
      ).that.is.equal(0).and.is.not.null;
      expect(
        getList.objects[2].object,
        "Failed on second ADAL object returned the incorrect result"
      ).that.is.an("object").and.is.not.null;
      expect(
        getList.objects[2].object.Array,
        "Failed on returning the wrong value for an array"
      )
        .to.be.an("array")
        .and.that.is.eql([1, 2, 3, 4, 5]).and.is.not.null;
      expect(
        getList.objects[2].object.String,
        "Second ADAL object's string returned the wrong value"
      ).that.is.equal("Red pill or Blue pill?").and.is.not.null;
      expect(
        getList.objects[2].object.object,
        "Failed on second ADAL object returned the incorrect result"
      ).that.is.an("object").and.is.not.null;
      expect(
        getList.objects[2].object.object.string,
        "Failed on second ADAL object returned the incorrect string result"
      ).that.is.equal("random string").and.is.not.null;
      expect(
        getList.objects[2].object.object.number,
        "Failed on second ADAL object returned the incorrect number result"
      ).that.is.equal(27).and.is.not.null;
      expect(
        getList.objects[2].object.object.boolean,
        "Failed on second ADAL object returned the incorrect boolean result"
      ).that.is.equal(true).and.is.not.null,
        expect(
          getList.objects[3].Key,
          "Third ADAL key returned the incorrect result"
        ).that.is.equal("testKey3").and.is.not.null,
        expect(
          getList.objects[0].Key,
          "Third ADAL key returned the incorrect result"
        ).that.is.equal("JWTKey1").and.is.not.null,
        expect(
          getList.objects[0].Name,
          "fourth ADAL key.Name returned wrong value"
        )
          .to.be.a("string")
          .and.that.is.equal("JWTExpiryTest"),
        expect(
          getList.objects[0].Token,
          "fourth ADAL key.Token returned a value shorter then expected"
        )
          .to.be.a("string")
          .and.has.lengthOf.above(1000);
    });
  });
  const testResult = await run();
  res.json(testResult);
});
//===========================Performence/Stress tests================================
router.get("/PerformenceTest", async (req, res, next) => {
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

  let apiResPerf = await pepperi.app.transactions.add({
    type: { Name: "DorS CPINode Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  const transactionUUID = apiRes.id;
  const perfTransactionUUID = apiResPerf.id;

  let dataObject = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let perfDataObject = await pepperi.DataObject.Get(
    "transactions",
    perfTransactionUUID
  );

  let TrnDetailsUIPage;
  if (dataObject) {
    try {
      TrnDetailsUIPage = await pepperi.UIPage.Create("Details", dataObject!);
      TrnDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }
  //setup UI object to get field names dynamically
  let fields!: UIField[];
  let fieldNames: string[] = [];
  if (TrnDetailsUIPage) {
    fields = TrnDetailsUIPage.uiObject.fields;
  }

  if (fields) {
    fields?.forEach((field) => {
      if (field.fieldID!) {
        fieldNames.push(field.fieldID);
      }
    });
  }
  console.log(
    "PerformenceTester::Performence - dataObject Starting CRUD testing!"
  );

  let startTime = performance.now();

  for (let i = 0; i < 3000; i++) {
    // should finish at 3K as the crash happens above
    try {
      if (fieldNames!) {
        fieldNames.forEach((name) => {
          if (
            name! &&
            name !== "GeneralInformation" &&
            name !== "OrderInformation"
          ) {
            perfDataObject?.setFieldValue(name, i);
            perfDataObject?.getFieldValue(name);
            dataObject?.setFieldValue(name, i);
            dataObject?.getFieldValue(name);
          }
        });
      }
      if (i % 100 === 0) {
        const thisTime = performance.now();
        console.log(
          `PerformenceTester::Test is on the ${i} loop and took ${
            thisTime - startTime
          } so far`
        );
      }
    } catch (err) {
      let endTime = performance.now();
      console.log(
        `PerformenceTester::Test failed after the ${i} loop and took ${
          endTime - startTime
        } and failed due to the following error: ${err}`
      );
    }
  }

  let endTime = performance.now();
  const perfResults = endTime - startTime;

  console.log(
    `PerformenceTester::Performence - dataObject Finished CRUD testing! - test took ${perfResults}`
  );

  res.json({
    currentResults: perfResults,
  });
});
//==========================TransactionScope tests===================================
router.get("/TransactionScope", async (req, res, next) => {
  console.log(
    "TransactionScopeTester:: Started TransactionScope automation test"
  );
  const { describe, it, expect, run } = Tester("My test");
  //setting up objects
  let accRes = await pepperi.app.accounts.add({
    type: { Name: "Customer" },
    object: {
      ExternalID: ExID,
      Name: ExID,
    },
  });

  const accountUUID = accRes.id;

  let apiRes = await pepperi.app.transactions.add({
    type: { Name: "Transaction Scope Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  const transactionUUID = apiRes.id;
  let DataObject: Transaction | undefined = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );
  console.log("TransactionScopeTester:: got transaction dataobject section");

  const preLoadTrnScope = DataObject?.transactionScope; //-> suppose to be undefined -> if OC not loaded should return undefined

  let itemRes = await pepperi.api.items.get({
    key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
    fields: ["InternalID", "ExternalID", "UUID"],
  });
  //isInTransition -> if its in a middle of transition
  //AvailableTransition -> should return possible transition

  let itemUUID = itemRes.object.UUID;

  let itemDataObject: Item | undefined = await pepperi.DataObject.Get(
    "items",
    itemUUID
  );

  const TrnScope = await pepperi.TransactionScope.Get(
    DataObject as Transaction
  ); // supposed to be equal to transaction.TrnScope after the load
  console.log("TransactionScopeTester:: got transaction scope");

  //object for OnLoadTransactionScope itself after load
  const onLoadTrnScope = DataObject?.transactionScope; //-> suppose to be equal to TrnScope

  const onLoadgetLine = await onLoadTrnScope?.getLine(itemDataObject as Item);

  const onLoadgetLines = await onLoadTrnScope?.getLines();

  const getLine = await TrnScope.getLine(itemDataObject as Item);

  const getLines = await TrnScope.getLines();

  const inTransition = await DataObject?.inTransition();

  const availableTransition = await DataObject?.availableTransitions();
  console.log(
    "TransactionScopeTester:: got all tests objects,iniating mocha.."
  );

  describe("TransactionScope automation test", async () => {
    console.log("TransactionScopeTester:: Started mocha section");

    it("preLoad Transaction Scope and Triggers sequence", async () => {
      expect(
        preLoadTrnScope,
        "Failed on TransactionScope returning a value before it loaded"
      ).to.be.equal(undefined);
      expect(interceptorArr, "Failed on TrnScope interceptors sequence")
        .to.be.an("array")
        .with.lengthOf(2)
        .and.eql([0, 1]);
    });

    it("onLoad Transaction Scope - getLine and getLines", async () => {
      expect(TrnScope, "Failed on TrnScope that was brought via Get").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined;
      expect(
        TrnScope,
        "Failed on TrnScope not equals onLoadTrnScope"
      ).to.be.deep.equal(onLoadTrnScope);
      //=====================getLine======================
      expect(getLine, "Failed on getLine returning empty").to.be.an("object")
        .that.is.not.null.and.is.not.undefined;
      expect(getLine?.children, "Failed on getLine.children returning a value")
        .to.be.an("array")
        .with.lengthOf(0);
      expect(
        getLine?.hidden,
        "Failed on getLine.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLine?.internalID,
        "Failed on getLine.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        getLine?.parent,
        "Failed on getLine.parent returning a value"
      ).to.be.equal(undefined);
      expect(getLine?.resource, "Failed on resource returning the wrong value")
        .to.be.a("string")
        .that.is.equal("transaction_lines");
      expect(getLine?.uuid, "Failed on getLine.UUID retruning the wrong value")
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLine?.transaction,
        "Failed on getLine.Transaction returning empty"
      ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
      expect(
        getLine?.item.hidden,
        "Failed on getLine.item.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLine?.item.uuid,
        "Failed on getLine.item.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLine?.item.resource,
        "Failed on getLine.item.resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("items");
      expect(
        getLine?.item.internalID,
        "Failed on getLine.item.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(1);
      //=====================getLines======================
      expect(getLines, "Failed on getLines returning wrong array length")
        .to.be.an("array")
        .that.has.lengthOf(109);
      expect(getLines[0], "Failed on getLines returning empty").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined;
      expect(
        getLines[0]?.children,
        "Failed on getLines.children returning a value"
      )
        .to.be.an("array")
        .with.lengthOf(6);
      expect(
        getLines[0]?.hidden,
        "Failed on getLines.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLines[0]?.internalID,
        "Failed on getLines.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        getLines[0]?.parent,
        "Failed on getLines.parent returning a value"
      ).to.be.equal(undefined);
      expect(
        getLines[0]?.resource,
        "Failed on getLinesresource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("transaction_lines");
      expect(
        getLines[0]?.uuid,
        "Failed on getLines.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLines[0]?.transaction,
        "Failed on getLines.Transaction returning empty"
      ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
      expect(
        getLines[0]?.item.hidden,
        "Failed on getLines.item.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLines[0]?.item.uuid,
        "Failed on getLines.item.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLines[0]?.item.resource,
        "Failed on getLines.item.resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("items");
      expect(
        getLines[0]?.item.internalID,
        "Failed on getLines.item.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(1);

      expect(getLines[1], "Failed on getLines returning empty").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined;
      expect(
        getLines[1]?.children,
        "Failed on getLines.children returning a value"
      )
        .to.be.an("array")
        .with.lengthOf(6);
      expect(
        getLines[1]?.hidden,
        "Failed on getLines.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLines[1]?.internalID,
        "Failed on getLines.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        getLines[1]?.parent,
        "Failed on getLines.parent returning a value"
      ).to.be.equal(undefined);
      expect(
        getLines[1]?.resource,
        "Failed on getLinesresource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("transaction_lines");
      expect(
        getLines[1]?.uuid,
        "Failed on getLines.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLines[1]?.transaction,
        "Failed on getLines.Transaction returning empty"
      ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
      expect(
        getLines[1]?.item.hidden,
        "Failed on getLines.item.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        getLines[1]?.item.uuid,
        "Failed on getLines.item.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        getLines[1]?.item.resource,
        "Failed on getLines.item.resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("items");
      expect(
        getLines[1]?.item.internalID,
        "Failed on getLines.item.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(1);
      //========================onLoadedTrnScope.getLine==========================
      expect(
        onLoadTrnScope,
        "Failed on TrnScope that was brought via Get"
      ).to.be.an("object").that.is.not.null.and.is.not.undefined;
      expect(
        onLoadgetLine,
        "Failed on onLoadgetLine getLine returning empty"
      ).to.be.an("object").that.is.not.null.and.is.not.undefined;
      expect(
        onLoadgetLine?.children,
        "Failed on onLoadgetLine getLine.children returning a value"
      )
        .to.be.an("array")
        .with.lengthOf(0);
      expect(
        onLoadgetLine?.hidden,
        "Failed on onLoadgetLine getLine.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        onLoadgetLine?.internalID,
        "Failed on onLoadgetLine getLine.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        onLoadgetLine?.parent,
        "Failed on onLoadgetLine getLine.parent returning a value"
      ).to.be.equal(undefined);
      expect(
        onLoadgetLine?.resource,
        "Failed on onLoadgetLine resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("transaction_lines");
      expect(
        onLoadgetLine?.uuid,
        "Failed on onLoadgetLine getLine.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        onLoadgetLine?.transaction,
        "Failed on onLoadgetLine getLine.Transaction returning empty"
      ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
      expect(
        onLoadgetLine?.item.hidden,
        "Failed on onLoadgetLine getLine.item.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        onLoadgetLine?.item.uuid,
        "Failed on onLoadgetLine getLine.item.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        onLoadgetLine?.item.resource,
        "Failed on onLoadgetLine getLine.item.resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("items");
      expect(
        onLoadgetLine?.item.internalID,
        "Failed on onLoadgetLine getLine.item.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(1);
      //=====================onLoadedTrnScope.getLines======================
      expect(onLoadgetLines, "Failed on getLines returning wrong array length")
        .to.be.an("array")
        .that.has.lengthOf(109);
      if (onLoadgetLines) {
        expect(
          onLoadgetLines[0],
          "Failed on onLoadgetLines getLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadgetLines[0]?.children,
          "Failed on onLoadgetLines getLines.children returning a value"
        )
          .to.be.an("array")
          .with.lengthOf(6);
        expect(
          onLoadgetLines[0]?.hidden,
          "Failed on onLoadgetLines getLines.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadgetLines[0]?.internalID,
          "Failed on onLoadgetLines getLines.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(-1);
        expect(
          onLoadgetLines[0]?.parent,
          "Failed on onLoadgetLines getLines.parent returning a value"
        ).to.be.equal(undefined);
        expect(
          onLoadgetLines[0]?.resource,
          "Failed on onLoadgetLines getLinesresource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("transaction_lines");
        expect(
          onLoadgetLines[0]?.uuid,
          "Failed on onLoadgetLines getLines.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadgetLines[0]?.transaction,
          "Failed on  onLoadgetLinesgetLines.Transaction returning empty"
        ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
        expect(
          onLoadgetLines[0]?.item.hidden,
          "Failed on onLoadgetLines getLines.item.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadgetLines[0]?.item.uuid,
          "Failed on onLoadgetLines getLines.item.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadgetLines[0]?.item.resource,
          "Failed on onLoadgetLines getLines.item.resource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("items");
        expect(
          onLoadgetLines[0]?.item.internalID,
          "Failed on onLoadgetLines getLines.item.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(1);

        expect(
          onLoadgetLines[1],
          "Failed on onLoadgetLines getLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadgetLines[1]?.children,
          "Failed on onLoadgetLines getLines.children returning a value"
        )
          .to.be.an("array")
          .with.lengthOf(6);
        expect(
          onLoadgetLines[1]?.hidden,
          "Failed on onLoadgetLines getLines.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadgetLines[1]?.internalID,
          "Failed on onLoadgetLines getLines.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(-1);
        expect(
          onLoadgetLines[1]?.parent,
          "Failed on onLoadgetLines getLines.parent returning a value"
        ).to.be.equal(undefined);
        expect(
          onLoadgetLines[1]?.resource,
          "Failed on onLoadgetLines getLinesresource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("transaction_lines");
        expect(
          onLoadgetLines[1]?.uuid,
          "Failed on onLoadgetLines getLines.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadgetLines[1]?.transaction,
          "Failed on onLoadgetLines getLines.Transaction returning empty"
        ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
        expect(
          onLoadgetLines[1]?.item.hidden,
          "Failed on onLoadgetLines getLines.item.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadgetLines[1]?.item.uuid,
          "Failed on onLoadgetLines getLines.item.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadgetLines[1]?.item.resource,
          "Failed on onLoadgetLines getLines.item.resource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("items");
        expect(
          onLoadgetLines[1]?.item.internalID,
          "Failed on onLoadgetLines getLines.item.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(1);
      }
    });

    it("preLoad Transaction Scope - Interceptors", async () => {
      expect(
        preLoadGetLine,
        "Failed on preLoadGetLine having data"
      ).to.be.equal(undefined);
      expect(
        preLoadGetLines,
        "Failed on preLoadGetLines returning an array with data"
      )
        .that.is.an("array")
        .with.lengthOf(0)
        .that.is.eql([]);
    });

    it("onLoad Transaction Scope - Interceptors", async () => {
      //=====================getLine======================
      expect(onLoadGetLine, "Failed on onLoadGetLine returning empty").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined;
      expect(
        onLoadGetLine?.children,
        "Failed on onLoadGetLine.children returning a value"
      )
        .to.be.an("array")
        .with.lengthOf(0);
      expect(
        onLoadGetLine?.hidden,
        "Failed on onLoadGetLine.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        onLoadGetLine?.internalID,
        "Failed on onLoadGetLine.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        onLoadGetLine?.parent,
        "Failed on onLoadGetLine.parent returning a value"
      ).to.be.equal(undefined);
      expect(
        onLoadGetLine?.resource,
        "Failed on resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("transaction_lines");
      expect(
        onLoadGetLine?.uuid,
        "Failed on onLoadGetLine.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        onLoadGetLine?.transaction,
        "Failed on onLoadGetLine.Transaction returning empty"
      ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
      expect(
        onLoadGetLine?.item.hidden,
        "Failed on onLoadGetLine.item.hidden returning true"
      ).to.be.a("boolean").that.is.false;
      expect(
        onLoadGetLine?.item.uuid,
        "Failed on onLoadGetLine.item.UUID retruning the wrong value"
      )
        .to.be.a("string")
        .that.has.lengthOf(36);
      expect(
        onLoadGetLine?.item.resource,
        "Failed on onLoadGetLine.item.resource returning the wrong value"
      )
        .to.be.a("string")
        .that.is.equal("items");
      expect(
        onLoadGetLine?.item.internalID,
        "Failed on onLoadGetLine.item.internalID returning wrong value"
      )
        .to.be.a("number")
        .that.is.above(1);
      //=====================onLoadGetLines======================
      expect(
        onLoadGetLines,
        "Failed on onLoadGetLines returning wrong array length"
      )
        .to.be.an("array")
        .that.has.lengthOf(109);
      if (onLoadGetLines) {
        expect(
          onLoadGetLines[0],
          "Failed on onLoadGetLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadGetLines[0]?.children,
          "Failed on onLoadGetLines.children returning a value"
        )
          .to.be.an("array")
          .with.lengthOf(6);
        expect(
          onLoadGetLines[0]?.hidden,
          "Failed on onLoadGetLines.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadGetLines[0]?.internalID,
          "Failed on onLoadGetLines.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(-1);
        expect(
          onLoadGetLines[0]?.parent,
          "Failed on onLoadGetLines.parent returning a value"
        ).to.be.equal(undefined);
        expect(
          onLoadGetLines[0]?.resource,
          "Failed on onLoadGetLinesresource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("transaction_lines");
        expect(
          onLoadGetLines[0]?.uuid,
          "Failed on onLoadGetLines.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadGetLines[0]?.transaction,
          "Failed on onLoadGetLines.Transaction returning empty"
        ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
        expect(
          onLoadGetLines[0]?.item.hidden,
          "Failed on onLoadGetLines.item.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadGetLines[0]?.item.uuid,
          "Failed on onLoadGetLines.item.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadGetLines[0]?.item.resource,
          "Failed on onLoadGetLines.item.resource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("items");
        expect(
          onLoadGetLines[0]?.item.internalID,
          "Failed on onLoadGetLines.item.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(1);

        expect(
          onLoadGetLines[1],
          "Failed on onLoadGetLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadGetLines[1]?.children,
          "Failed on onLoadGetLines.children returning a value"
        )
          .to.be.an("array")
          .with.lengthOf(6);
        expect(
          onLoadGetLines[1]?.hidden,
          "Failed on onLoadGetLines.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadGetLines[1]?.internalID,
          "Failed on onLoadGetLines.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(-1);
        expect(
          onLoadGetLines[1]?.parent,
          "Failed on onLoadGetLines.parent returning a value"
        ).to.be.equal(undefined);
        expect(
          onLoadGetLines[1]?.resource,
          "Failed on onLoadGetLinesresource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("transaction_lines");
        expect(
          onLoadGetLines[1]?.uuid,
          "Failed on onLoadGetLines.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadGetLines[1]?.transaction,
          "Failed on onLoadGetLines.Transaction returning empty"
        ).to.be.an("object").that.is.not.undefined.and.is.not.empty;
        expect(
          onLoadGetLines[1]?.item.hidden,
          "Failed on onLoadGetLines.item.hidden returning true"
        ).to.be.a("boolean").that.is.false;
        expect(
          onLoadGetLines[1]?.item.uuid,
          "Failed on onLoadGetLines.item.UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
        expect(
          onLoadGetLines[1]?.item.resource,
          "Failed on onLoadGetLines.item.resource returning the wrong value"
        )
          .to.be.a("string")
          .that.is.equal("items");
        expect(
          onLoadGetLines[1]?.item.internalID,
          "Failed on onLoadGetLines.item.internalID returning wrong value"
        )
          .to.be.a("number")
          .that.is.above(1);
      }
    });

    it("inTransitions and availableTransition", async () => {
      expect(inTransition, "Failed on inTransition returning false").to.be.a(
        "boolean"
      ).that.is.true;
      expect(
        availableTransition,
        "Failed on availableTransition returning emoty object"
      ).to.be.an("array").that.is.not.null.and.is.not.empty;
      if (availableTransition) {
        expect(
          availableTransition[0].Title,
          "Failed on available transition's wrong title"
        )
          .to.be.a("string")
          .that.is.equal("Create");
        expect(
          availableTransition[0].UUID,
          "Failed on available transition's UUID retruning the wrong value"
        )
          .to.be.a("string")
          .that.has.lengthOf(36);
      }
    });

    it("Negative Trnasaction Scope tests", async () => {
      //1.load hidden item from transaction scope
      //2.Load hidden transaction to transaction scope
      //
      let negativeDataObject = {};
      try {
      } catch {}
    });
    console.log("TransactionScopeTester:: Finished mocha section");
  });
  //runs the following tests:
  //Test getLine() before load -> should return undefined - done
  //Test getLines() before load -> should return empty array - done
  //Test getLine() after load -> should return search scope item - done
  //Test getLines() after load -> should return scoped items - done
  console.log(
    "TransactionScopeTester:: Finished TransactionScope automation test"
  );
  const testResult = await run();
  res.json(testResult);
});
//===========================JWT from CPISide========================================
router.get("/JWT", async (req, res, next) => {
  try {
    const JWT = await pepperi.auth.getAccessToken();
    console.log(`JWTTester:: JWT output: ${JWT}`);
    res.json({
      JWT: JWT,
      err: "None",
    });
  } catch (err) {
    console.log(
      `JWTTester:: Failed Getting JWT from CPISide with the following error: ${err}`
    );
    res.json({
      JWT: "None",
      err: err,
    });
  }
});

