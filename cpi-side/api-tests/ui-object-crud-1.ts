import "@pepperi-addons/cpi-node";
import {
  GeneralActivity,
  Item,
  TransactionLine,
  User,
  Account,
  Contact,
  Transaction,
} from "@pepperi-addons/cpi-node";
import Tester from "../tester";
import DataService, {
  screenSize,
  GENERIC_DATA_VIEWS,
  accounDataArr,
  fieldTypeObj,
} from "../services/data.service";
import generalService from "../services/general.service";

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
//relevant docs https://pepperi-addons.github.io/cpi-node/classes/app_entities.uiobject.html
export async function firstUIObjectCrud(testParms?: any) {
  console.log("firstUIObjectCrud::Started test");
  const dataService = new DataService();
  const service = new generalService();
  const { describe, it, expect, run } = Tester("My test");

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
  dateTime = await dataService.getDateTime(date, true);
  dateOnly = await dataService.getDateOnly(date);
  link = await dataService.getLink();
  HTML = await dataService.getHTML();
  randDays = await dataService.getRandDays();

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

  let accDataObject = await pepperi.DataObject.Get("accounts", accountUUID);

  let apiRes = await pepperi.app.transactions.add({
    type: { Name: "DorS CPINode Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  const transactionUUID = apiRes.id;

  let dataObject = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let TrnDetailsUIPage;
  if (dataObject!) {
    try {
      TrnDetailsUIPage = await pepperi.UIPage.Create("Details", dataObject!);
      TrnDetailsUIPage.rebuild();
    } catch (err) {
      console.log(err);
    }
  }
  console.log("firstUIObjectCrud::Got all objects,starting mocha test");

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
      expect(uiHomePage, "Failed on uiHomePage being null").to.be.an("object")
        .that.is.not.empty.and.that.is.not.null;
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
          .that.is.equal("UserHomePageQuickAction").and.that.is.not.null.and.is
          .not.undefined,
        expect(
          uiHomePage.quickAction.context.ScreenSize,
          "Failed on uiHomePage.quickAction.context.ScreenSize"
        )
          .to.be.a("string")
          .that.is.equal(screenSize[uiHomePage.quickAction.context.ScreenSize])
          .and.that.is.not.null.and.is.not.undefined,
        expect(
          uiHomePage.quickAction.context.Profile.InternalID,
          "Failed on uiHomePage.quickAction.context.Profile.InternalID"
        ).to.be.a("number").that.is.not.null;
      expect(
        uiHomePage.quickAction.dataView.Fields![0].FieldID,
        "Failed on uiHomePage.quickAction.dataView.Fields![0].FieldID"
      )
        .to.be.a("string")
        .that.is.equal("DorS CPINode Sales Order").and.that.is.not.null.and.is
        .not.undefined,
        expect(
          uiHomePage.quickAction.dataView.Fields![0].Title,
          "Failed on uiHomePage.quickAction.dataView.Fields![0].Title"
        )
          .to.be.a("string")
          .that.is.equal("CPINode test ATD - KEEP OUT").and.that.is.not.null.and
          .is.not.undefined,
        expect(
          uiHomePage.quickAction.dataView.Fields?.length,
          "Failed on uiHomePage.quickAction.dataView.Fields?.length"
        ).to.be.a("number").and.that.is.not.null.and.is.not.undefined,
        //===================================UIObject/UIPage.actions===========================================
        expect(uiObjectHP, "Failed on uiObjectHP being null").to.be.an("object")
          .that.is.not.empty.and.that.is.not.null;
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
          .that.is.equal(screenSize[uiObjectHP.context.ScreenSize]).and.is.not
          .null,
        expect(
          uiObjectHP.context.Name,
          "Failed on uiObject.context.Name being null/wrong value"
        ).to.be.equal(GENERIC_DATA_VIEWS[uiObjectHP.context.Name]).and.is.not
          .null,
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
      expect(uiFieldJson, "Failed on UIField.toJSON()").to.be.an("object").that
        .is.not.null.and.is.not.undefined,
        expect(uiField.type, "Failed on uiField.type")
          .to.be.a("string")
          .that.is.equal(fieldTypeObj[uiField.type]).and.is.not.null,
        expect(uiField.fieldID, "Failed on uiField.fieldID").to.be.a("string")
          .and.is.not.null,
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
      await uiObject?.setFieldValue("TSASingleLineText", phrase + randDiscount);
      await uiObject?.setFieldValue(
        "TSALimitedLineText",
        phrase + randDiscount
      );
      await uiObject?.setFieldValue("TSAParagraphText", phrase + randDiscount);
      await uiObject?.setFieldValue("TSADateField", dateOnly);
      await uiObject?.setFieldValue("TSADateTimeField", date);
      await uiObject?.setFieldValue("TSADecimalField", randDiscount.toFixed(6));
      await uiObject?.setFieldValue(
        "TSANumberField",
        quantitiesTotal.toString()
      );
      await uiObject?.setFieldValue(
        "TSACurrencyField",
        quantitiesTotal.toString()
      );
      await uiObject?.setFieldValue("TSACheckboxField", randBool.toString());
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
      const getTSAParagraphText = await uiObject?.getField("TSAParagraphText");
      expect(getTSAParagraphText?.value, "fell on getTSAParagraphText.value")
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
      const getTSADateTimeField = await uiObject?.getField("TSADateTimeField");
      let formattedDateTime: any = await service.dateFormatter(
        getTSADateTimeField!.value,
        true
      );
      const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
      expect(formattedDateTime, "Failed on getTSADateTimeField")
        .to.be.a("string")
        .and.is.equal(expectedDateTimeValue);
      const getTSADecimalField = await uiObject?.getField("TSADecimalField");
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
      const getTSACurrencyField = await uiObject?.getField("TSACurrencyField");
      const strCur = formatter.format(quantitiesTotal);
      const resultCur = strCur.substr(1) + strCur.substr(0, 1);
      expect(getTSACurrencyField?.value, "fell on getTSACurrencyField.value")
        .to.be.a("string")
        .and.is.equal(quantitiesTotal.toString());
      expect(
        getTSACurrencyField?.formattedValue,
        "fell on getTSACurrencyField.formattedValue"
      )
        .to.be.a("string")
        .and.is.equal(resultCur);
      const getTSACheckboxField = await uiObject?.getField("TSACheckboxField");
      expect(getTSACheckboxField?.value, "fell on getTSACheckboxField.value")
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
        expect(getRemark?.formattedValue, "Failed on getRemark.formattedValue")
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
      const getQuantitiesTotal = await uiObject?.getField("QuantitiesTotal");
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
      let formattedDateSystem = await service.dateFormatter(
        getDeliveryDate!.value
      );
      expect(formattedDateSystem, "Fell on getDeliveryDate")
        .to.be.a("string")
        .and.is.equal(dateOnly);
      const getStatus = await uiObject?.getField("Status");
      expect(getStatus?.value, "Failed on getStatus.value")
        .to.be.a("string")
        .and.is.equal(status.toString());
      expect(getStatus?.formattedValue, "Failed on getStatus.formattedValue")
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
      const lngToNum = +accounDataArr[accountGeoIndex].Longtitude!.toFixed(3);
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
      const strGT = formatter.format(randZip * randDiscount * quantitiesTotal);
      const resultGT = strGT.substr(1) + strGT.substr(0, 1);
      expect(
        parseFloat(getGrandTotal!.value).toFixed(4),
        "Failed on getGrandTotal.value"
      )
        .to.be.a("string")
        .that.is.equal((randZip * randDiscount * quantitiesTotal).toFixed(4)),
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
      expect(TrnDetailsUIPage.subTitle, "failed on TrnDetailsUIPage.subTitle")
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
        expect(TrnDetailsUIPage.key, "failed on TrnDetailsUIPage.key").to.be.a(
          "string"
        ).that.is.not.null.and.is.not.empty;
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
        expect(uiObject.dataObject, "failed on uiObject.dataObject").to.be.an(
          "object"
        ).and.is.not.null.and.is.not.empty.and.is.not.undefined,
        expect(uiObject.key, "failed on uiObject.key").to.be.a("string").and.is
          .not.null.and.is.not.empty.and.is.not.undefined,
        expect(uiObject.context, "failed on uiObject.context").to.be.an(
          "object"
        ).and.is.not.null.and.is.not.empty.and.is.not.undefined,
        expect(uiObject.context.Name, "failed on uiObject.context.Name")
          .to.be.a("string")
          .and.is.equal("OrderForm").and.is.not.null.and.is.not.empty.and.is.not
          .undefined,
        expect(
          uiObject.context.ScreenSize,
          "failed on uiObject.context.ScreenSize"
        )
          .to.be.a("string")
          .and.is.equal(screenSize[uiObject.context.ScreenSize]).and.is.not.null
          .and.is.not.empty.and.is.not.undefined,
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
          .that.is.equal("transactions").and.is.not.null.and.is.not.empty.and.is
          .not.undefined,
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
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
        expect(getExternalID!.accessory, "failed on ExternalID.accessory field")
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
        expect(getExternalID!.textColor, "failed on ExternalID.textColor field")
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
      let setDiscountPercentage = await uiObject.getField("DiscountPercentage");
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
      let getDiscountPercentage = await uiObject.getField("DiscountPercentage");
      expect(
        getDiscountPercentage!,
        "failed on DiscountPercentage field object"
      ).to.be.an("object").that.is.not.null.and.is.not.undefined,
        expect(
          getDiscountPercentage!.type,
          "failed on DiscountPercentage.type field"
        )
          .to.be.a("string")
          .that.is.equal("Percentage").that.is.not.null.and.is.not.undefined,
        expect(
          getDiscountPercentage!.value,
          "failed on DiscountPercentage.value field"
        )
          .to.be.a("string")
          .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is.not
          .undefined,
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
      expect(getAccExID!, "failed on AccExID field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
        expect(getAccExID!.type, "failed on AccExID.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getAccExID!.value, "failed on AccExID.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
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
        expect(getAccExID!.visible, "failed on AccExID.visible field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined;
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
      expect(getAccountName!, "failed on AccountName field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getAccountName?.type, "failed on AccountName.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getAccountName!.value, "failed on AccountName.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + name).that.is.not.null.and.is.not.undefined,
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
      expect(getWrntyID!, "failed on WrntyID field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
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
        expect(getWrntyID!.visible, "failed on WrntyID.visible field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined;
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
        expect(getActionDateTime?.type, "failed on ActionDateTime.type field")
          .to.be.a("string")
          .that.is.equal("DateAndTime").that.is.not.null.and.is.not.undefined,
        expect(getActionDateTime!.value, "failed on ActionDateTime.value field")
          .to.be.a("string")
          .and.to.be.equal("1990-07-27:00:00:00").that.is.not.null.and.is.not
          .undefined,
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
        expect(getActionDateTime!.title, "failed on ActionDateTime.title field")
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
        expect(getAgentName!.accessory, "failed on AgentName.accessory field")
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
        expect(getAgentName!.textColor, "failed on AgentName.textColor field")
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
      expect(getCurrency!, "failed on Currency field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
        expect(getCurrency?.type, "failed on Currency.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getCurrency!.value, "failed on Currency.value field")
          .to.be.a("string")
          .and.to.be.equal(randAcessory).that.is.not.null.and.is.not.undefined,
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
      expect(getDeliveryDate!, "failed on DeliveryDate field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getDeliveryDate?.type, "failed on DeliveryDate.type field")
          .to.be.a("string")
          .that.is.equal("Date").that.is.not.null.and.is.not.undefined,
        expect(getDeliveryDate!.value, "failed on DeliveryDate.value field")
          .to.be.a("string")
          .and.to.be.equal("1990-07-27").that.is.not.null.and.is.not.undefined,
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
          .and.to.be.equal(phrase + name).that.is.not.null.and.is.not.undefined,
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
        expect(getRemark!.decimalDigits, "failed on Remark.decimalDigits field")
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
        expect(getRemark!.readonly, "failed on Remark.readonly field").to.be.a(
          "boolean"
        ).that.is.false.and.that.is.not.null.and.is.not.undefined,
        expect(getRemark!.textColor, "failed on Remark.textColor field")
          .to.be.a("string")
          .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
        expect(getRemark!.title, "failed on Remark.title field")
          .to.be.a("string")
          .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
        expect(getRemark!.visible, "failed on Remark.visible field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined;
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
      expect(getBillToPhone!, "failed on BillToPhone field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getBillToPhone?.type, "failed on BillToPhone.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getBillToPhone!.value, "failed on BillToPhone.value field")
          .to.be.a("string")
          .and.to.be.equal(randPhone + randPhone).that.is.not.null.and.is.not
          .undefined,
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
          .that.is.equal("EmptyComboBox").that.is.not.null.and.is.not.undefined,
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
      expect(getBillToStreet!, "failed on BillToStreet field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getBillToStreet?.type, "failed on BillToStreet.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getBillToStreet!.value, "failed on BillToStreet.value field")
          .to.be.a("string")
          .and.to.be.equal("Dizingoff").that.is.not.null.and.is.not.undefined,
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
          .and.to.be.equal("Tel-Aviv").that.is.not.null.and.is.not.undefined,
        expect(getBillToCity!.accessory, "failed on BillToCity.accessory field")
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
        expect(getBillToCity!.textColor, "failed on BillToCity.textColor field")
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
        expect(getBillToZipCode!.value, "failed on BillToZipCode.value field")
          .to.be.a("string")
          .and.to.be.equal((randZip + randZip).toString()).that.is.not.null.and
          .is.not.undefined,
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
        expect(getBillToZipCode!.title, "failed on BillToZipCode.title field")
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
          .and.to.be.equal(name + ExID).that.is.not.null.and.is.not.undefined,
        expect(getBillToName!.accessory, "failed on BillToName.accessory field")
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
        expect(getBillToName!.textColor, "failed on BillToName.textColor field")
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
          .and.to.be.equal((randZip * randDiscount + 1).toString()).that.is.not
          .null.and.is.not.undefined,
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
        expect(getQuantitiesTotal?.type, "failed on QuantitiesTotal.type field")
          .to.be.a("string")
          .that.is.equal("NumberReal").that.is.not.null.and.is.not.undefined,
        expect(
          getQuantitiesTotal!.value,
          "failed on QuantitiesTotal.value field"
        )
          .to.be.a("string")
          .and.to.be.equal((quantitiesTotal * 2).toString()).that.is.not.null
          .and.is.not.undefined,
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
      let setTSASingleLineText = await uiObject.getField("TSASingleLineText");
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
      let getTSASingleLineText = await uiObject.getField("TSASingleLineText");
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
          .and.to.be.equal(phrase + randDiscount + name).that.is.not.null.and.is
          .not.undefined,
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
      let setTSALimitedLineText = await uiObject.getField("TSALimitedLineText");
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
      let getTSALimitedLineText = await uiObject.getField("TSALimitedLineText");
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
          .and.to.be.equal(phrase + randDiscount + name).that.is.not.null.and.is
          .not.undefined,
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
          .and.to.be.equal(phrase + randDiscount + name).that.is.not.null.and.is
          .not.undefined,
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
      expect(getTSADateField!, "failed on TSADateField field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getTSADateField?.type, "failed on getTSADateField.type field")
          .to.be.a("string")
          .that.is.equal("Date").that.is.not.null.and.is.not.undefined,
        expect(getTSADateField!.value, "failed on TSADateField.value field")
          .to.be.a("string")
          .and.to.be.equal("1990-07-27").that.is.not.null.and.is.not.undefined,
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
          .that.is.equal("DateAndTime").that.is.not.null.and.is.not.undefined,
        expect(
          getTSADateTimeField!.value,
          "failed on TSADateTimeField.value field"
        )
          .to.be.a("string")
          .and.to.be.equal("1990-07-27:00:00:00").that.is.not.null.and.is.not
          .undefined,
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
          .that.is.equal("BooleanText").that.is.not.null.and.is.not.undefined,
        expect(
          getTSACheckboxField!.value,
          "failed on TSACheckboxField.value field"
        )
          .to.be.a("string")
          .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is.not
          .undefined,
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
          .and.to.be.equal((randDiscount * 2).toString()).that.is.not.null.and
          .is.not.undefined,
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
          .that.is.equal("NumberReal").that.is.not.null.and.is.not.undefined,
        expect(
          getTSADecimalField!.value,
          "failed on TSADecimalField.value field"
        )
          .to.be.a("string")
          .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is.not
          .undefined,
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
          .that.is.equal("NumberInteger").that.is.not.null.and.is.not.undefined,
        expect(getTSANumberField!.value, "failed on TSANumberField.value field")
          .to.be.a("string")
          .and.to.be.equal((quantitiesTotal * 2).toString()).that.is.not.null
          .and.is.not.undefined,
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
        expect(getTSANumberField!.title, "failed on TSANumberField.title field")
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
        expect(getTSAEmailField?.type, "failed on getTSAEmailField.type field")
          .to.be.a("string")
          .that.is.equal("Email").that.is.not.null.and.is.not.undefined,
        expect(getTSAEmailField!.value, "failed on TSAEmailField.value field")
          .to.be.a("string")
          .and.to.be.equal(randDiscount + userEmail).that.is.not.null.and.is.not
          .undefined,
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
        expect(getTSAEmailField!.title, "failed on TSAEmailField.title field")
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
        expect(getTSAPhoneField?.type, "failed on getTSAPhoneField.type field")
          .to.be.a("string")
          .that.is.equal("Phone").that.is.not.null.and.is.not.undefined,
        expect(getTSAPhoneField!.value, "failed on TSAPhoneField.value field")
          .to.be.a("string")
          .and.to.be.equal((randPhone + randPhone).toString()).that.is.not.null
          .and.is.not.undefined,
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
        expect(getTSAPhoneField!.title, "failed on TSAPhoneField.title field")
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
      expect(getTSALinkField!, "failed on TSALinkField field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getTSALinkField?.type, "failed on getTSALinkField.type field")
          .to.be.a("string")
          .that.is.equal("Link").that.is.not.null.and.is.not.undefined,
        expect(getTSALinkField!.value, "failed on TSALinkField.value field")
          .to.be.a("string")
          .and.to.be.equal(userEmail + userEmail).that.is.not.null.and.is.not
          .undefined,
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
      expect(getTSAHTMLField!, "failed on TSAHTMLField field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getTSAHTMLField?.type, "failed on TSAHTMLField.type field")
          .to.be.a("string")
          .that.is.equal("RichTextHTML").that.is.not.null.and.is.not.undefined,
        expect(getTSAHTMLField!.value, "failed on TSAHTMLField.value field")
          .to.be.a("string")
          .and.to.be.equal(HTML + HTML).that.is.not.null.and.is.not.undefined,
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

      await dataObject?.setFieldValue("Hidden", true);
      await accDataObject?.setFieldValue("Hidden", true);
    });
  });

  console.log("firstUIObjectCrud::Finished test");
  const testResult = await run();
  return testResult;
}
