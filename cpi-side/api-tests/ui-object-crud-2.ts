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
  accounDataArr,
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
export async function secondUIObjectCrud(testParams?: any) {
  console.log("secondUIObjectCrud::Started test");
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

  let formatterUS = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 6, // (this suffices for whole numbers, but will print 2500.10 as $2,500.100000)
  });

  let formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const bgColor: string = "#659DBD";
  const color: string = "#FBEEC1";
  const accessories: string[] = ["#", "$", "%", "€", "£"];
  const randAcessory: string =
    accessories[Math.floor(Math.random() * accessories.length)];

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

  let dataObject = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let accDataObject = await pepperi.DataObject.Get("accounts", accountUUID);

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
  console.log("secondUIObjectCrud::Got all objects,starting test run");

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
      await dataObject?.setFieldValue("TSASingleLineText", phrase + randDays);
      await dataObject?.setFieldValue("TSALimitedLineText", phrase + randDays);
      await dataObject?.setFieldValue("TSAParagraphText", phrase + randDays);
      //const dateOnly = await dateFormatter("27-07-1990T07:45:00Z"); // returns 1990-07-27
      await dataObject?.setFieldValue("TSADateField", "1990-07-27");
      await dataObject?.setFieldValue(
        "TSADateTimeField",
        "1990-07-27T07:45:00Z"
      );
      await dataObject?.setFieldValue("TSADecimalField", randZip.toFixed(6));
      await dataObject?.setFieldValue("TSANumberField", randDays.toString());
      await dataObject?.setFieldValue("TSACurrencyField", randDays.toString());
      await dataObject?.setFieldValue(
        "TSACheckboxField",
        (!randBool).toString()
      );
      await dataObject?.setFieldValue("TSAEmailField", "dor.s@cpinodetest.com");
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
      await dataObject?.setFieldValue("QuantitiesTotal", randDays.toString());
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
      const getTSAParagraphText = await uiObject?.getField("TSAParagraphText");
      expect(getTSAParagraphText?.value, "fell on getTSAParagraphText.value")
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
      const getTSADateTimeField = await uiObject?.getField("TSADateTimeField");
      expect(
        getTSADateTimeField?.formattedValue,
        "Failed on getTSADateTimeField"
      )
        .to.be.a("string")
        .and.is.equal("07/27/1990 07:45 AM");
      const getTSADecimalField = await uiObject?.getField("TSADecimalField");
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
      const getTSACurrencyField = await uiObject?.getField("TSACurrencyField");
      const strCur = formatter.format(randDays);
      const resultCur = strCur.substr(1) + strCur.substr(0, 1);
      expect(getTSACurrencyField?.value, "fell on getTSACurrencyField.value")
        .to.be.a("string")
        .and.is.equal(randDays.toString());
      expect(
        getTSACurrencyField?.formattedValue,
        "fell on getTSACurrencyField.formattedValue"
      )
        .to.be.a("string")
        .and.is.equal(resultCur);
      const getTSACheckboxField = await uiObject?.getField("TSACheckboxField");
      expect(getTSACheckboxField?.value, "fell on getTSACheckboxField.value")
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
        expect(getRemark?.formattedValue, "Failed on getRemark.formattedValue")
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
      const getQuantitiesTotal = await uiObject?.getField("QuantitiesTotal");
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
      expect(getStatus?.formattedValue, "Failed on getStatus.formattedValue")
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
      await uiObject?.setFieldValue("TSAParagraphText", phrase + randZip, true);
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
      await uiObject?.setFieldValue("TSANumberField", randZip.toString(), true);
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
      await uiObject?.setFieldValue("TSAEmailField", "dor.s@pepperi.com", true);
      await uiObject?.setFieldValue("TSAPhoneField", randZip.toString(), true);
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
      await uiObject?.setFieldValue("BillToZipCode", randDays.toString(), true);
      await uiObject?.setFieldValue("BillToPhone", randZip.toString(), true);
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
      await uiObject?.setFieldValue("Status", (status + 2).toString(), true);
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
      await uiObject?.setFieldValue("ShipToZipCode", randDays.toString(), true);
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

      const getTSADateField = await dataObject?.getFieldValue("TSADateField");
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

      const getTSAEmailField = await dataObject?.getFieldValue("TSAEmailField");
      expect(getTSAEmailField, "fell on getTSAEmailField")
        .to.be.a("string")
        .and.is.equal("dor.s@pepperi.com");

      const getTSAPhoneField = await dataObject?.getFieldValue("TSAPhoneField");
      expect(getTSAPhoneField, "fell on getTSAPhoneField")
        .to.be.a("string")
        .and.is.equal(randZip.toString());

      const getTSALinkField = await dataObject?.getFieldValue("TSALinkField");
      expect(getTSALinkField, "fell on getTSALinkField")
        .to.be.a("string")
        .and.is.equal("www.google.com");

      const getTSAHTMLField = await dataObject?.getFieldValue("TSAHTMLField");
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

      const getBillToStreet = await dataObject?.getFieldValue("BillToStreet");
      expect(getBillToStreet, "Failed on getBillToStreet")
        .that.is.a("string")
        .and.is.equal(accounDataArr[accountGeoIndex].Street);

      const getBillToZipCode = await dataObject?.getFieldValue("BillToZipCode");
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

      const getDeliveryDate = await dataObject?.getFieldValue("DeliveryDate"); //currently not working
      let formattedDate2 = await service.dateFormatter(getDeliveryDate);
      // expect(getDeliveryDate, "Fell on getDeliveryDate")
      //   .to.be.a("string")
      //   .and.is.equal("27-07-2005");

      const getStatus = await dataObject?.getFieldValue("Status");
      expect(getStatus, "Failed on getStatus")
        .to.be.a("number")
        .and.is.equal(status); //negative

      const getLat = await dataObject?.getFieldValue("SubmissionGeoCodeLAT");
      const latToNum = +accounDataArr[accountGeoIndex].Latitude!.toFixed(4);
      expect(getLat, "Failed on getLat")
        .to.be.a("number")
        .and.is.equal(latToNum);

      const getLng = await dataObject?.getFieldValue("SubmissionGeoCodeLNG");
      const lngToNum = +accounDataArr[accountGeoIndex].Longtitude!.toFixed(4);
      expect(getLng, "Failed on getLng")
        .to.be.a("number")
        .and.is.equal(lngToNum);

      const getShipToName = await dataObject?.getFieldValue("ShipToName");
      expect(getShipToName, "Failed on getShipToName")
        .to.be.a("string")
        .and.is.equal(phrase);

      const getShipToStreet = await dataObject?.getFieldValue("ShipToStreet");
      expect(getShipToStreet, "Failed on getShipToStreet")
        .to.be.a("string")
        .and.is.equal(accounDataArr[accountGeoIndex].Street);

      const getShipToCity = await dataObject?.getFieldValue("ShipToCity");
      expect(getShipToCity, "Failed on getShipToCity")
        .to.be.a("string")
        .and.is.equal(accounDataArr[accountGeoIndex].City);

      const getShipToZipCode = await dataObject?.getFieldValue("ShipToZipCode");
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
      await accUIObject?.setFieldValue("TSACurrencyAcc", randZip.toString());
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
      await accUIObject?.setFieldValue("TSAParagraphTextAcc", phrase + randZip);
      await accUIObject?.setFieldValue(
        "TSASingleLineTextAcc",
        phrase + randZip
      );
      await accUIObject?.setFieldValue("TSALinkAcc", "https://www.google.com");
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
      const getTSACheckboxAcc = await accUIObject?.getField("TSACheckboxAcc");
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

      const getTSACurrencyAcc = await accUIObject?.getField("TSACurrencyAcc");
      const strCur = formatter.format(randZip);
      const resultCur = strCur.substr(1) + strCur.substr(0, 1);
      expect(getTSACurrencyAcc?.value, "Failed on getTSACurrencyAcc.value")
        .to.be.a("string")
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
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
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
        expect(
          getTSANumberAcc?.formattedValue,
          "Failed on getTSANumberAcc.formattedValue"
        )
          .to.be.a("string")
          .that.is.equal(resultFormatted[0]).and.is.not.null.and.is.not
          .undefined;

      const getTSADateAcc = await accUIObject?.getField("TSADateAcc");
      const formattedDate = await service.dateFormatter(getTSADateAcc!.value);
      expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is.not
        .null.and.is.not.undefined;

      const getTSADateTimeAcc = await accUIObject?.getField("TSADateTimeAcc");
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
        .and.is.equal((randDiscount + quantitiesTotal).toFixed(6)).and.is.not
        .null.and.is.not.undefined,
        expect(
          getTSADecimalAcc?.formattedValue,
          "fell on getTSADecimalAcc.formattedValue"
        )
          .to.be.a("string")
          .and.is.equal((randDiscount + quantitiesTotal).toFixed(6)).and.is.not
          .null.and.is.not.undefined;

      const getTSAEmailAcc = await accUIObject?.getField("TSAEmailAcc");
      expect(getTSAEmailAcc?.value, "fell on TSAEmailAcc.value")
        .to.be.a("string")
        .and.is.equal("dor.s@pepperi.com").and.is.not.null.and.is.not.undefined,
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
        .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined,
        expect(
          getTSASingleLineTextAcc?.formattedValue,
          "fell on TSASingleLineTextAcc.formattedValue"
        )
          .to.be.is.a("string")
          .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined;

      const getTSALimitedLineTextAcc = await accUIObject?.getField(
        "TSALimitedLineTextAcc"
      );
      expect(
        getTSALimitedLineTextAcc?.value,
        "fell on TSALimitedLineTextAcc.value"
      )
        .to.be.a("string")
        .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined,
        expect(
          getTSALimitedLineTextAcc?.formattedValue,
          "fell on TSALimitedLineTextAcc.formattedValue"
        )
          .to.be.a("string")
          .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined;

      const getTSAParagraphTextAcc = await accUIObject?.getField(
        "TSAParagraphTextAcc"
      );
      expect(getTSAParagraphTextAcc?.value, "fell on TSAParagraphTextAcc.value")
        .to.be.a("string")
        .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined,
        expect(
          getTSAParagraphTextAcc?.formattedValue,
          "fell on TSAParagraphTextAcc.formattedValue"
        )
          .to.be.a("string")
          .and.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined;

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
        .and.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
        expect(
          getTSAPhoneAcc?.formattedValue,
          "fell on getTSAPhoneAcc.formattedValue"
        )
          .to.be.a("string")
          .and.is.equal(randZip.toString()).and.is.not.null.and.is.not
          .undefined;

      const getExID = await accUIObject?.getField("ExternalID");
      //expect(getExID?.value, "Failed on ExternalID.value")
        // .to.be.a("string")
        // .that.is.equal(name).and.is.not.null.and.is.not.undefined,
        // expect(getExID?.formattedValue, "Failed on ExternalID.formattedValue")
        //   .to.be.a("string")
        //   .that.is.equal(name).and.is.not.null.and.is.not.undefined;

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
        .that.is.equal(phrase + randDays).and.is.not.null.and.is.not.undefined,
        expect(getNote?.formattedValue, "Failed on Note.formattedValue")
          .to.be.a("string")
          .that.is.equal(phrase + randDays).and.is.not.null.and.is.not
          .undefined;

      const getZipCode = await accUIObject?.getField("ZipCode");
      expect(getZipCode?.value, "Failed on ZipCode.value")
        .to.be.a("string")
        .that.is.equal(randDays.toString()).and.is.not.null.and.is.not
        .undefined,
        expect(getZipCode?.formattedValue, "Failed on ZipCode.formattedValue")
          .to.be.a("string")
          .that.is.equal(randDays.toString()).and.is.not.null.and.is.not
          .undefined;

      const getCity = await accUIObject?.getField("City");
      expect(getCity?.value, "Failed on City.value")
        .to.be.a("string")
        .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null.and
        .is.not.undefined,
        expect(getCity?.formattedValue, "Failed on City.formattedValue")
          .to.be.a("string")
          .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null
          .and.is.not.undefined;

      const getStreet = await accUIObject?.getField("Street");
      expect(getStreet?.value, "Failed on Street.value")
        .to.be.a("string")
        .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not.null
        .and.is.not.undefined,
        expect(getStreet?.formattedValue, "Failed on Street.formattedValue")
          .to.be.a("string")
          .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not.null
          .and.is.not.undefined;

      const getDiscount = await accUIObject?.getField("Discount");
      const formattedDisc = parseFloat(getDiscount?.value!);
      const newValue = randDiscount + 0.5;
      expect(formattedDisc.toFixed(4), "Failed on Discount.value")
        .to.be.a("string")
        .that.is.equal(newValue.toFixed(4)).and.is.not.null.and.is.not
        .undefined,
        expect(getDiscount?.formattedValue, "Failed on Discount.formattedValue")
          .to.be.a("string")
          .that.is.equal((randDiscount + 0.5).toFixed(2) + "%").and.is.not.null
          .and.is.not.undefined;

      const getFax = await accUIObject?.getField("Fax");
      expect(getFax?.value, "Failed on Fax.value")
        .to.be.a("string")
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
        expect(getFax?.formattedValue, "Failed on Fax.formattedValue")
          .to.be.a("string")
          .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
          .undefined;

      const getPhone = await accUIObject?.getField("Phone");
      expect(getPhone?.value, "Failed on Phone.value")
        .to.be.a("string")
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
        expect(getPhone?.formattedValue, "Failed on Phone.formattedValue")
          .to.be.a("string")
          .that.is.equal(randZip.toString()).and.is.not.null.and.is.not
          .undefined;

      const getMobile = await accUIObject?.getField("Fax");
      expect(getMobile?.value, "Failed on Mobile.value")
        .to.be.a("string")
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined,
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
        expect(AccDetailsUIPage.subTitle, "Failed on AccDetailsUIPage.subTitle")
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
      expect(AccDetailsUIPage.key, "Failed on AccDetailsUIPage.key").to.be.a(
        "string"
      ).that.is.not.null.and.is.not.undefined;
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
        expect(readonly, "failed on accUIObject.readonly").to.be.a("boolean")
          .and.to.be.false.and.is.not.null.and.is.not.undefined,
        expect(
          accUIObject.dataObject,
          "failed on accUIObject.dataObject"
        ).to.be.an("object").and.is.not.null.and.is.not.empty.and.is.not
          .undefined,
        expect(accUIObject.key, "failed on accUIObject.key").to.be.a("string")
          .and.is.not.null.and.is.not.empty.and.is.not.undefined,
        expect(accUIObject.context, "failed on accUIObject.context").to.be.an(
          "object"
        ).and.is.not.null.and.is.not.empty.and.is.not.undefined,
        expect(accUIObject.context.Name, "failed on accUIObject.context.Name")
          .to.be.a("string")
          .and.is.equal("AccountForm").and.is.not.null.and.is.not.empty.and.is
          .not.undefined,
        expect(
          accUIObject.context.ScreenSize,
          "failed on accUIObject.context.ScreenSize"
        )
          .to.be.a("string")
          .and.is.equal(screenSize[accUIObject.context.ScreenSize]).and.is.not
          .null.and.is.not.empty.and.is.not.undefined,
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
          .that.is.equal("accounts").and.is.not.null.and.is.not.empty.and.is.not
          .undefined,
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
      expect(getName, "failed on Name field object").to.be.an("object").that.is
        .not.null.and.is.not.undefined,
        expect(getName!.type, "failed on Name.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getName!.value, "failed on Name.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
        expect(getName!.formattedValue, "failed on Name.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is.not
          .undefined,
        expect(getName!.accessory, "failed on Name.accessory field")
          .to.be.a("string")
          .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
          .undefined,
        expect(getName!.backgroundColor, "failed on Name.backgroundColor field")
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
        expect(getName!.mandatory, "failed on Name.mandatory field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
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
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
        expect(
          getExternalID!.formattedValue,
          "failed on ExternalID.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is.not
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

      expect(getPhone, "failed on Phone field object").to.be.an("object").that
        .is.not.null.and.is.not.undefined,
        expect(getPhone!.type, "failed on Phone.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getPhone!.value, "failed on Phone.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
        expect(getPhone!.formattedValue, "failed on Phone.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is.not
          .undefined,
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
        expect(getPhone!.decimalDigits, "failed on Phone.decimalDigits field")
          .to.be.a("number")
          .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
        expect(
          getPhone!.highlighted,
          "failed on Phone.highlighted field"
        ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
          .undefined,
        expect(getPhone!.mandatory, "failed on Phone.mandatory field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
        expect(getPhone!.readonly, "failed on Phone.readonly field").to.be.a(
          "boolean"
        ).that.is.false.and.that.is.not.null.and.is.not.undefined,
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

      expect(getFax, "failed on Fax field object").to.be.an("object").that.is
        .not.null.and.is.not.undefined,
        expect(getFax!.type, "failed on Fax.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getFax!.value, "failed on Fax.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + name + randPhone).that.is.not.null.and.is.not
          .undefined,
        expect(getFax!.formattedValue, "failed on Fax.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal(ExID + randPhone + name).that.is.not.null.and.is.not
          .undefined,
        expect(getFax!.accessory, "failed on Fax.accessory field")
          .to.be.a("string")
          .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
          .undefined,
        expect(getFax!.backgroundColor, "failed on Fax.backgroundColor field")
          .to.be.a("string")
          .that.is.equal(bgColor).and.that.is.not.null.and.is.not.undefined,
        expect(getFax!.decimalDigits, "failed on Fax.decimalDigits field")
          .to.be.a("number")
          .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
        expect(getFax!.highlighted, "failed on Fax.highlighted field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
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

      expect(getEmail, "failed on Email field object").to.be.an("object").that
        .is.not.null.and.is.not.undefined,
        expect(getEmail!.type, "failed on Email.type field")
          .to.be.a("string")
          .that.is.equal("Email").that.is.not.null.and.is.not.undefined,
        expect(getEmail!.value, "failed on Email.value field")
          .to.be.a("string")
          .and.to.be.equal("dor.s@pepperi.com").that.is.not.null.and.is.not
          .undefined,
        expect(getEmail!.formattedValue, "failed on Email.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal("dor.s@pepperitest.com").that.is.not.null.and.is.not
          .undefined,
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
        expect(getEmail!.decimalDigits, "failed on Email.decimalDigits field")
          .to.be.a("number")
          .that.is.equal(3).and.that.is.not.null.and.is.not.undefined,
        expect(
          getEmail!.highlighted,
          "failed on Email.highlighted field"
        ).to.be.a("boolean").that.is.true.and.that.is.not.null.and.is.not
          .undefined,
        expect(getEmail!.mandatory, "failed on Email.mandatory field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
        expect(getEmail!.readonly, "failed on Email.readonly field").to.be.a(
          "boolean"
        ).that.is.false.and.that.is.not.null.and.is.not.undefined,
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

      expect(getDiscount, "failed on Discount field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
        expect(getDiscount!.type, "failed on Discount.type field")
          .to.be.a("string")
          .that.is.equal("Percentage").that.is.not.null.and.is.not.undefined,
        expect(getDiscount!.value, "failed on Discount.value field")
          .to.be.a("string")
          .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is.not
          .undefined,
        expect(
          getDiscount!.formattedValue,
          "failed on Discount.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal((randDiscount + 0.1).toString()).that.is.not.null.and
          .is.not.undefined,
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

      expect(getNote, "failed on Note field object").to.be.an("object").that.is
        .not.null.and.is.not.undefined,
        expect(getNote!.type, "failed on Note.type field")
          .to.be.a("string")
          .that.is.equal("TextArea").that.is.not.null.and.is.not.undefined,
        expect(getNote!.value, "failed on Note.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not.undefined,
        expect(getNote!.formattedValue, "failed on Note.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal(name + phrase).that.is.not.null.and.is.not.undefined,
        expect(getNote!.accessory, "failed on Note.accessory field")
          .to.be.a("string")
          .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
          .undefined,
        expect(getNote!.backgroundColor, "failed on Note.backgroundColor field")
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
        expect(getNote!.mandatory, "failed on Note.mandatory field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
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

      expect(getWrntyID, "failed on WrntyID field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
        expect(getWrntyID!.type, "failed on WrntyID.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getWrntyID!.value, "failed on WrntyID.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not.undefined,
        expect(
          getWrntyID!.formattedValue,
          "failed on WrntyID.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(name + phrase).that.is.not.null.and.is.not.undefined,
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

      expect(getStreet, "failed on Street field object").to.be.an("object").that
        .is.not.null.and.is.not.undefined,
        expect(getStreet!.type, "failed on Street.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getStreet!.value, "failed on Street.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not.undefined,
        expect(
          getStreet!.formattedValue,
          "failed on Street.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(name + phrase).that.is.not.null.and.is.not.undefined,
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
        expect(getStreet!.decimalDigits, "failed on Street.decimalDigits field")
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
        expect(getStreet!.readonly, "failed on Street.readonly field").to.be.a(
          "boolean"
        ).that.is.false.and.that.is.not.null.and.is.not.undefined,
        expect(getStreet!.textColor, "failed on Street.textColor field")
          .to.be.a("string")
          .that.is.equal(color).and.that.is.not.null.and.is.not.undefined,
        expect(getStreet!.title, "failed on Street.title field")
          .to.be.a("string")
          .that.is.equal(phrase).and.that.is.not.null.and.is.not.undefined,
        expect(getStreet!.visible, "failed on Street.visible field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined;

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

      expect(getCity, "failed on City field object").to.be.an("object").that.is
        .not.null.and.is.not.undefined,
        expect(getCity!.type, "failed on City.type field")
          .to.be.a("string")
          .that.is.equal("TextBox").that.is.not.null.and.is.not.undefined,
        expect(getCity!.value, "failed on City.value field")
          .to.be.a("string")
          .and.to.be.equal(ExID + phrase).that.is.not.null.and.is.not.undefined,
        expect(getCity!.formattedValue, "failed on City.formattedValue field")
          .to.be.a("string")
          .and.to.be.equal(name + phrase).that.is.not.null.and.is.not.undefined,
        expect(getCity!.accessory, "failed on City.accessory field")
          .to.be.a("string")
          .that.is.equal(randAcessory).and.that.is.not.null.and.is.not
          .undefined,
        expect(getCity!.backgroundColor, "failed on City.backgroundColor field")
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
        expect(getCity!.mandatory, "failed on City.mandatory field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined,
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

      expect(getZipCode, "failed on ZipCode field object").to.be.an("object")
        .that.is.not.null.and.is.not.undefined,
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
        expect(getZipCode!.visible, "failed on ZipCode.visible field").to.be.a(
          "boolean"
        ).that.is.true.and.that.is.not.null.and.is.not.undefined;

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
        setTSASingleLineTextAcc!.formattedValue = name + phrase + randDiscount;
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
          .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is.not
          .undefined,
        expect(
          getTSASingleLineTextAcc!.formattedValue,
          "failed on TSASingleLineTextAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(name + phrase + randDiscount).that.is.not.null.and.is
          .not.undefined,
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
        setTSALimitedLineTextAcc!.formattedValue = name + phrase + randDiscount;
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
          .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is.not
          .undefined,
        expect(
          getTSALimitedLineTextAcc!.formattedValue,
          "failed on TSALimitedLineTextAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(name + phrase + randDiscount).that.is.not.null.and.is
          .not.undefined,
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
        setTSAParagraphTextAcc!.formattedValue = name + phrase + randDiscount;
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
          .and.to.be.equal(name + phrase + randDays).that.is.not.null.and.is.not
          .undefined,
        expect(
          getTSAParagraphTextAcc!.formattedValue,
          "failed on TSAParagraphTextAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(name + phrase + randDiscount).that.is.not.null.and.is
          .not.undefined,
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
          .and.to.be.equal("2021-07-27").that.is.not.null.and.is.not.undefined,
        expect(
          getTSADateAcc!.formattedValue,
          "failed on TSADateAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal("2020-07-27").that.is.not.null.and.is.not.undefined,
        expect(getTSADateAcc!.accessory, "failed on TSADateAcc.accessory field")
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
        expect(getTSADateAcc!.textColor, "failed on TSADateAcc.textColor field")
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
      console.log(setTSADateTimeAcc);
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
        expect(getTSADateTimeAcc!.type, "failed on TSADateTimeAcc.type field")
          .to.be.a("string")
          .that.is.equal("DateAndTime").that.is.not.null.and.is.not.undefined,
        expect(getTSADateTimeAcc!.value, "failed on TSADateTimeAcc.value field")
          .to.be.a("string")
          .and.to.be.equal("2021-07-27T09:09:09.000Z").that.is.not.null.and.is
          .not.undefined,
        expect(
          getTSADateTimeAcc!.formattedValue,
          "failed on TSADateTimeAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal("2020-07-27 09:09 AM").that.is.not.null.and.is.not
          .undefined,
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
        expect(getTSADateTimeAcc!.title, "failed on TSADateTimeAcc.title field")
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

      expect(getTSANumberAcc, "failed on TSANumberAcc field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getTSANumberAcc!.type, "failed on TSANumberAcc.type field")
          .to.be.a("string")
          .that.is.equal("NumberInteger").that.is.not.null.and.is.not.undefined,
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

      expect(getTSADecimalAcc, "failed on TSADecimalAcc field object").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined,
        expect(getTSADecimalAcc!.type, "failed on TSADecimalAcc.type field")
          .to.be.a("string")
          .that.is.equal("NumberReal").that.is.not.null.and.is.not.undefined,
        expect(getTSADecimalAcc!.value, "failed on TSADecimalAcc.value field")
          .to.be.a("string")
          .and.to.be.equal((randDiscount * 2).toString()).that.is.not.null.and
          .is.not.undefined,
        expect(
          getTSADecimalAcc!.formattedValue,
          "failed on TSADecimalAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(randDiscount.toString()).that.is.not.null.and.is.not
          .undefined,
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
        expect(getTSADecimalAcc!.title, "failed on TSADecimalAcc.title field")
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
        expect(getTSACurrencyAcc!.type, "failed on TSACurrencyAcc.type field")
          .to.be.a("string")
          .that.is.equal("Currency").that.is.not.null.and.is.not.undefined,
        expect(getTSACurrencyAcc!.value, "failed on TSACurrencyAcc.value field")
          .to.be.a("string")
          .and.to.be.equal((randDays * 2).toString()).that.is.not.null.and.is
          .not.undefined,
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
        expect(getTSACurrencyAcc!.title, "failed on TSACurrencyAcc.title field")
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
        expect(getTSACheckboxAcc!.type, "failed on TSACheckboxAcc.type field")
          .to.be.a("string")
          .that.includes("Boolean").that.is.not.null.and.is.not.undefined,
        expect(getTSACheckboxAcc!.value, "failed on TSACheckboxAcc.value field")
          .to.be.a("string")
          .and.to.be.equal(randBool.toString()).that.is.not.null.and.is.not
          .undefined,
        expect(
          getTSACheckboxAcc!.formattedValue,
          "failed on TSACheckboxAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal((!randBool).toString()).that.is.not.null.and.is.not
          .undefined,
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
        expect(getTSACheckboxAcc!.title, "failed on TSACheckboxAcc.title field")
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
          .and.to.be.equal((randDays * 2).toString()).that.is.not.null.and.is
          .not.undefined,
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
        expect(getTSALinkAcc!.accessory, "failed on TSALinkAcc.accessory field")
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
        expect(getTSALinkAcc!.textColor, "failed on TSALinkAcc.textColor field")
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
          .that.is.equal("RichTextHTML").that.is.not.null.and.is.not.undefined,
        expect(getTSAHTMLAcc!.value, "failed on TSAHTMLAcc.value field")
          .to.be.a("string")
          .and.to.be.equal(HTML).that.is.not.null.and.is.not.undefined,
        expect(
          getTSAHTMLAcc!.formattedValue,
          "failed on TSAHTMLAcc.formattedValue field"
        )
          .to.be.a("string")
          .and.to.be.equal(HTML + HTML).that.is.not.null.and.is.not.undefined,
        expect(getTSAHTMLAcc!.accessory, "failed on TSAHTMLAcc.accessory field")
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
        expect(getTSAHTMLAcc!.textColor, "failed on TSAHTMLAcc.textColor field")
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
          .and.to.be.equal("dor.s@pepperitest.com").that.is.not.null.and.is.not
          .undefined,
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

      await accDataObject?.setFieldValue("Hidden", true);
      await dataObject?.setFieldValue("Hidden", true);
    });
  });

  console.log("secondUIObjectCrud::Finished test");
  const testResult = await run();
  return testResult;
}
