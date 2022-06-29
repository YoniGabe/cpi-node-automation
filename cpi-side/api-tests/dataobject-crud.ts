import "@pepperi-addons/cpi-node";
import Tester from "../tester";
import DataService, { accounDataArr } from "../services/data.service";
import {
  GeneralActivity,
  Item,
  TransactionLine,
  User,
  Account,
  Contact,
  Transaction,
} from "@pepperi-addons/cpi-node";
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

export async function dataObjectCrud(testOptions?: any) {
  console.log("dataObjectCrud::Started test");
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

  //   let itemRes = await pepperi.api.items.search({
  //     fields: ["UUID", "ExternalID", "InternalID"],
  //     filter: {
  //       ApiName: "ExternalID",
  //       FieldType: "String",
  //       Operation: "IsEqual",
  //       Values: ["AQ3"],
  //     },
  //   }); //AQ3

  //let itemUUID = itemRes.objects[0].UUID;

  let cnctRes = await pepperi.app.contacts.add({
    references: { account: { UUID: accountUUID } },
    object: { ExternalID: ExID },
  });

  const cnctUUID = cnctRes.id;

  //   let itemResTypeDef = await pepperi.api.items.search({
  //     fields: [ "UUID", "ExternalID" , "InternalID"] ,
  //     filter: {"ApiName":"ExternalID","FieldType":"String","Operation":"IsEqual","Values":["CG2"]}
  //     });

  //   let itemTypeDefUUID = itemResTypeDef.objects[0].UUID;

  //   let itemDataObjectTypeDef = await pepperi.DataObject.Get(
  //     "items",
  //     itemTypeDefUUID
  //   );

  let dataObject = await pepperi.DataObject.Get(
    "transactions",
    transactionUUID
  );

  let lineDataObject = await pepperi.DataObject.Get(
    "transaction_lines",
    lineUUID
  );

  //let itemDataObject = await pepperi.DataObject.Get("items", itemUUID);

  let accDataObject = await pepperi.DataObject.Get("accounts", accountUUID);

  const activityUUID = activityApiRes.id;

  let actDataObject = await pepperi.DataObject.Get("activities", activityUUID);

  let cnctDataObject = await pepperi.DataObject.Get("contacts", cnctUUID);

  let userRes = await pepperi.api.users.search({
    fields: ["UUID", "ExternalID", "InternalID"],
    filter: {
      ApiName: "ExternalID",
      FieldType: "String",
      Operation: "IsEqual",
      Values: ["TEST"],
    },
  });

  const userUUID = userRes.objects[0].UUID;

  let userDataObject = await pepperi.DataObject.Get("users", userUUID);
  console.log("dataObjectCrud::Got all objects,starting mocha test");
  //getting test and object
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
      expect(getUnitDiscountPercentage, "Failed on getUnitDiscountPercentage")
        .to.be.a("number")
        .that.is.equal(+randDiscount.toFixed(4)).and.is.not.null.and.is.not
        .undefined;
      const getUnitPriceAfterDiscount = await lineDataObject?.getFieldValue(
        "UnitPriceAfterDiscount"
      );
      expect(getUnitPriceAfterDiscount, "Failed on getUnitPriceAfterDiscount")
        .to.be.a("number")
        .that.is.equal(+(randZip * randDiscount).toFixed(4)).and.is.not.null.and
        .is.not.undefined;
      const getTotalUnitsPriceAfterDiscount =
        await lineDataObject?.getFieldValue("TotalUnitsPriceAfterDiscount");
      expect(
        getTotalUnitsPriceAfterDiscount,
        "Failed on getTotalUnitsPriceAfterDiscount"
      )
        .to.be.a("number")
        .that.is.equal(+(randDiscount * randZip * quantitiesTotal).toFixed(4))
        .and.is.not.null.and.is.not.undefined;
      const getDeliveryDate = await lineDataObject?.getFieldValue(
        "DeliveryDate"
      );
      const getDeliveryDateFormat = await service.dateFormatter(
        getDeliveryDate
      );
      expect(getDeliveryDateFormat, "Failed on getDeliveryDate")
        .to.be.a("string")
        .that.is.equal(dateOnly).and.is.not.null.and.is.not.undefined;
      const getLineNumber = await lineDataObject?.getFieldValue("LineNumber");
      expect(getLineNumber, "Failed on getLineNumber")
        .to.be.a("number")
        .that.is.equal(accountGeoIndex + 1).and.is.not.null.and.is.not
        .undefined;
      const getUnitsQuantity = await lineDataObject?.getFieldValue(
        "UnitsQuantity"
      );
      expect(getUnitsQuantity, "Failed on getUnitsQuantity")
        .to.be.a("number")
        .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not.undefined;
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
        .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not.undefined;
      const getTSADateLines = await lineDataObject?.getFieldValue(
        "TSADateLines"
      );
      const getTSADateLinesFormat = await service.dateFormatter(
        getTSADateLines
      );
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
        .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not.undefined;
      const getTSALimitedLineTextLines = await lineDataObject?.getFieldValue(
        "TSALimitedLineTextLines"
      );
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
      expect(getTSASingleLineTextLines, "Failed on getTSASingleLineTextLines")
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
      expect(item?.hidden, "Failed on item.hidden accessor").to.be.a("boolean")
        .that.is.false.and.is.not.null.and.is.not.undefined,
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
        expect(typeDef?.internalID, "Failed on typeDef?.internalID accessor")
          .to.be.a("number")
          .that.is.above(0).and.is.not.null.and.is.not.undefined,
        expect(typeDef?.resource, "Failed on typeDef?.resource accessor")
          .to.be.a("string")
          .that.is.equal("types").and.is.not.null.and.is.not.undefined,
        expect(typeDef?.type, "Failed on typeDef?.type")
          .to.be.a("string")
          .that.is.equal("transactions").and.is.not.null.and.is.not.undefined,
        expect(typeDef?.uuid, "Failed on typeDef?.UUID accessor")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null,
        expect(typeDef?.name, "Failed on typeDef?.name accessor")
          .to.be.a("string")
          .that.is.equal("DorS CPINode Sales Order").and.is.not.null.and.is.not
          .undefined;
      expect(
        transaction?.hidden,
        "Failed on transaction?.hidden accessor"
      ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not.undefined;
      expect(
        transaction?.internalID,
        "Failed on transaction?.internalID accessor"
      )
        .to.be.a("number")
        .that.is.below(0).and.is.not.null.and.is.not.undefined;
      expect(transaction?.resource, "Failed on transaction?.resource accessor")
        .to.be.a("string")
        .that.is.equal("transactions").and.is.not.null.and.is.not.undefined;
      expect(transaction?.uuid, "Failed on transaction?.UUID accessor")
        .to.be.a("string")
        .and.to.have.lengthOf(36).and.that.is.not.null;

      expect(
        transaction?.account.hidden,
        "Failed on transaction?.account.hidden accessor"
      ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not.undefined;
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
      ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not.undefined;
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
      ).to.be.a("boolean").that.is.false.and.is.not.null.and.is.not.undefined;
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

      const getTSADateField = await dataObject?.getFieldValue("TSADateField");
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
      const expectedDateTimeValue = await service.dateFormatter(dateTime, true);
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

      const getTSAEmailField = await dataObject?.getFieldValue("TSAEmailField");
      expect(getTSAEmailField, "fell on getTSAEmailField")
        .to.be.a("string")
        .and.is.equal(userEmail);

      const getTSAPhoneField = await dataObject?.getFieldValue("TSAPhoneField");
      expect(getTSAPhoneField, "fell on getTSAPhoneField")
        .to.be.a("string")
        .and.is.equal(randPhone);

      const getTSALinkField = await dataObject?.getFieldValue("TSALinkField");
      expect(getTSALinkField, "fell on getTSALinkField")
        .to.be.a("string")
        .and.is.equal(link);

      console.log(
        "Transaction - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
      );

      const getTSAHTMLField = await dataObject?.getFieldValue("TSAHTMLField");
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

      const getBillToStreet = await dataObject?.getFieldValue("BillToStreet");
      expect(getBillToStreet, "Failed on getBillToStreet")
        .that.is.a("string")
        .and.is.equal(accounDataArr[accountGeoIndex].Street);

      const getBillToZipCode = await dataObject?.getFieldValue("BillToZipCode");
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

      const getDeliveryDate = await dataObject?.getFieldValue("DeliveryDate");
      let formattedDate = await service.dateFormatter(getDeliveryDate);
      expect(formattedDate, "Fell on getDeliveryDate")
        .to.be.a("string")
        .and.is.equal(dateOnly);

      const getStatus = await dataObject?.getFieldValue("Status");
      expect(getStatus, "Failed on getStatus")
        .to.be.a("number")
        .and.is.equal(2);

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
        .and.is.equal(name);

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
        .that.is.equal(+(randZip * randDiscount * quantitiesTotal).toFixed(4));
    });

    it("Basic CRUD for Accessors and setAsignee", async () => {
      //=================================Accessors============================================
      console.log("Transaction - DataObject Starting Basic CRUD for Accessors");

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
      expect(asignee, "Failed on asignee accessor").to.be.an("object").that.is
        .not.empty,
        expect(asignee?.email, "Failed on asignee.email accessor")
          .to.be.a("string")
          .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
          .undefined;

      expect(actionDT, "Failed on actionDateTime accessor").to.be.a("string")
        .that.is.not.null.and.is.not.undefined;

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
        expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a("boolean")
          .that.is.false,
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
        expect(acc?.hidden, "Failed on Account.Hidden").to.be.a("boolean").to.be
          .false,
        expect(acc?.uuid, "Failed on Account.UUID")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null,
        expect(acc?.resource, "Failed on Account.resource")
          .to.be.a("string")
          .that.is.equal("accounts").that.is.not.null.and.is.not.undefined,
        expect(acc?.name, "Failed on Account.name")
          .to.be.a("string")
          .and.to.be.equal(name).that.is.not.null.and.is.not.undefined,
        expect(acc?.typeDefinition, "Failed on typeDefinition object").to.be.an(
          "object"
        ).that.is.not.null.and.is.not.undefined,
        expect(acc?.typeDefinition?.uuid, "Failed on typeDefinition.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not.undefined,
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
          .and.to.be.equal("types").and.that.is.not.null.and.is.not.undefined,
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
      expect(catalog, "Failed on Catalog object").to.be.an("object").that.is.not
        .null.and.is.not.undefined,
        expect(catalog?.hidden, "Failed on Catalog.hidden").to.be.a("boolean")
          .that.is.false.and.that.is.not.null.and.is.not.undefined,
        expect(catalog?.internalID, "Failed on Catalog.internalID")
          .to.be.a("number")
          .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
        expect(catalog?.uuid, "Failed on Catalog.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not.undefined,
        expect(catalog?.resource, "Failed on Catalog.resource")
          .to.be.a("string")
          .that.is.equal("catalogs").and.that.is.not.null.and.is.not.undefined,
        expect(creator, "Failed on creator object").to.be.an("object").that.is
          .not.null.and.is.not.undefined,
        expect(creator?.hidden, "Failed on creator.hidden").to.be.a("boolean")
          .that.is.false.and.that.is.not.null.and.is.not.undefined,
        expect(creator?.internalID, "Failed on creator.internalID")
          .to.be.a("number")
          .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
        expect(creator?.uuid, "Failed on creator.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not.undefined,
        expect(creator?.resource, "Failed on creator.resource")
          .to.be.a("string")
          .that.is.equal("users").and.that.is.not.null.and.is.not.undefined;
      console.log("Transaciton - DataObject Finished Basic CRUD for Accessors");
    });
    //test that performs calculations to other fields via triggering a specific participant field and the others calculate via rule engine
    it("Basic CRUD for SetFieldValue and doCalculations for TSA fields", async () => {
      console.log(
        "Transaction - DataObject Starting Basic CRUD for SetFieldValue and doCalculations for TSA fields"
      );
      //=====================Positive============================
      const insertedValue: number = await service.randGenerator(1, 9);

      await dataObject?.setFieldValue("TSAdoCalcTrigger", insertedValue, true);

      const getSingleLine = await dataObject?.getFieldValue(
        "TSAdoCalcSingleLine"
      );
      expect(getSingleLine, "failed on Single line doCalculation not firing")
        .to.be.a("string")
        .that.is.equal("Single Line Text" + insertedValue);

      const getDecimal = await dataObject?.getFieldValue("TSAdoCalcDecimal");
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
      expect(getParagraph, "failed on Paragraph Text doCalculation not firing")
        .to.be.a("string")
        .that.is.equal("Paragraph Text" + insertedValue);

      const getNumber = await dataObject?.getFieldValue("TSAdoCalcNumber");
      expect(getNumber, "failed on Number doCalculation not firing")
        .to.be.a("number")
        .that.is.equal(2 + insertedValue);

      const getCurrency = await dataObject?.getFieldValue("TSAdoCalcCurrency");
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

      const getDecimalNeg = await dataObject?.getFieldValue("TSAdoCalcDecimal");
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
      expect(getCBNeg, "failed on Checkbox negative doCalculation not firing")
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

      const getNumberNeg = await dataObject?.getFieldValue("TSAdoCalcNumber");
      expect(getNumberNeg, "failed on Number Negative doCalculation not firing")
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
      expect(getEmailNeg, "failed on email negative doCalculation not firing")
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
        .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not.undefined;

      const getTSANumberAcc = await accDataObject?.getFieldValue(
        "TSANumberAcc"
      );
      expect(getTSANumberAcc, "Failed on getTSANumberAcc")
        .to.be.a("number")
        .that.is.equal(quantitiesTotal).and.is.not.null.and.is.not.undefined;

      const getTSADateAcc = await accDataObject?.getFieldValue("TSADateAcc");
      const formattedDate = await service.dateFormatter(getTSADateAcc);
      expect(formattedDate).to.be.a("string").and.is.equal(dateOnly).and.is.not
        .null.and.is.not.undefined;

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

      const getTSAEmailAcc = await accDataObject?.getFieldValue("TSAEmailAcc");
      expect(getTSAEmailAcc, "fell on TSAEmailAcc")
        .to.be.a("string")
        .and.is.equal(userEmail).and.is.not.null.and.is.not.undefined;

      const getTSAHTMLAcc = await accDataObject?.getFieldValue("TSAHTMLAcc");
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

      const getTSALinkAcc = await accDataObject?.getFieldValue("TSALinkAcc");
      expect(getTSALinkAcc, "fell on getTSALinkAcc")
        .to.be.a("string")
        .and.is.equal(link).and.is.not.null.and.is.not.undefined;

      console.log(
        "Account - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
      );

      const getTSAPhoneAcc = await accDataObject?.getFieldValue("TSAPhoneAcc");
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
      expect(getName, "Failed on Name").to.be.a("string").that.is.equal(name)
        .and.is.not.null.and.is.not.undefined;

      const getNote = await accDataObject?.getFieldValue("Note");
      expect(getNote, "Failed on Note")
        .to.be.a("string")
        .that.is.equal(phrase + randZip).and.is.not.null.and.is.not.undefined;

      const getZipCode = await accDataObject?.getFieldValue("ZipCode");
      expect(getZipCode, "Failed on ZipCode")
        .to.be.a("string")
        .that.is.equal(randZip.toString()).and.is.not.null.and.is.not.undefined;

      const getCity = await accDataObject?.getFieldValue("City");
      expect(getCity, "Failed on City")
        .to.be.a("string")
        .that.is.equal(accounDataArr[accountGeoIndex].City).and.is.not.null.and
        .is.not.undefined;

      const getStreet = await accDataObject?.getFieldValue("Street");
      expect(getStreet, "Failed on Street")
        .to.be.a("string")
        .that.is.equal(accounDataArr[accountGeoIndex].Street).and.is.not.null
        .and.is.not.undefined;

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

      const getDebtAbove90 = await accDataObject?.getFieldValue("DebtsAbove90");
      expect(getDebtAbove90, "Failed on DebtAbove90")
        .to.be.a("number")
        .that.is.equal(randAbove).and.is.not.null.and.is.not.undefined;

      const getDiscount = await accDataObject?.getFieldValue("Discount");
      expect(getDiscount, "Failed on Discount")
        .to.be.a("number")
        .that.is.equal(+randDiscount.toFixed(4)).and.is.not.null.and.is.not
        .undefined;

      const getFax = await accDataObject?.getFieldValue("Fax");
      expect(getFax, "Failed on Fax").to.be.a("string").that.is.equal(randPhone)
        .and.is.not.null.and.is.not.undefined;

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
        .that.is.equal(+accounDataArr[accountGeoIndex].Longtitude!.toFixed(4))
        .and.is.not.null.and.is.not.undefined;

      console.log(
        "Account - DataObject Finished Basic CRUD for SetFieldValue and GetFieldValue for system fields"
      );

      const getLat = await accDataObject?.getFieldValue("Latitude");
      expect(getLat, "Failed on Latitue")
        .to.be.a("number")
        .that.is.equal(+accounDataArr[accountGeoIndex].Latitude!.toFixed(4)).and
        .is.not.null.and.is.not.undefined;
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
        expect(name).to.be.a("string").and.that.is.equal(name).and.that.is.not
          .null.and.not.undefined,
        expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a("boolean")
          .that.is.false,
        expect(typeDef?.name, "Failed on typeDef.name")
          .that.is.a("string")
          .and.to.be.equal("Customer")
          .and.length.is.above(0).and.that.is.not.null,
        expect(typeDef?.resource, "Failed on typeDef.resource")
          .to.be.a("string")
          .and.to.be.equal("types").and.that.is.not.null.and.not.undefined,
        expect(typeDef?.type, "Failed on typeDef.type")
          .to.be.a("string")
          .and.to.be.equal("accounts").and.that.is.not.null.and.not.undefined,
        expect(typeDef?.uuid, "Failed on typeDef.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null,
        expect(typeDef?.internalID, "Failed on typeDef.InternalID")
          .to.be.a("number")
          .that.is.above(0).and.that.is.not.null,
        expect(cntcs, "Failed on contacs").to.be.an("array").with.lengthOf(1);

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
      const getTSAEmailACT = await actDataObject?.getFieldValue("TSAEmailACT");
      expect(getTSAEmailACT, "fell on getTSAEmailACT")
        .to.be.a("string")
        .and.is.equal(userEmail);
      const getTSAPhoneACT = await actDataObject?.getFieldValue("TSAPhoneACT");
      expect(getTSAPhoneACT, "fell on getTSAPhoneACT")
        .to.be.a("string")
        .and.is.equal(randPhone);
      const getTSALinkACT = await actDataObject?.getFieldValue("TSALinkACT");
      expect(getTSALinkACT, "fell on getTSALinkACT")
        .to.be.a("string")
        .and.is.equal(link);
      console.log(
        "Activity - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue for TSA fields"
      );
      const getTSAHTMLACT = await actDataObject?.getFieldValue("TSAHTMLACT");
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
      expect(getExID, "Failed on getExID").to.be.a("string").that.is.equal(ExID)
        .and.is.not.null.and.is.not.undefined;
      const getStatus = await actDataObject?.getFieldValue("Status");
      expect(getStatus, "Failed on getStatus")
        .to.be.a("number")
        .that.is.equal(2).and.is.not.null.and.is.not.undefined;
      const getLAT = await actDataObject?.getFieldValue("SubmissionGeoCodeLAT");
      expect(getLAT, "Failed on getLAT")
        .to.be.a("number")
        .that.is.equal(+accounDataArr[accountGeoIndex].Latitude!.toFixed(4)).and
        .is.not.null.and.is.not.undefined;
      const getLNG = await actDataObject?.getFieldValue("SubmissionGeoCodeLNG");
      expect(getLNG, "Failed on getLNG")
        .to.be.a("number")
        .that.is.equal(+accounDataArr[accountGeoIndex].Longtitude!.toFixed(4))
        .and.is.not.null.and.is.not.undefined;
      const getDuration = await actDataObject?.getFieldValue("PlannedDuration");
      expect(getDuration, "Failed on getDuration")
        .to.be.a("number")
        .that.is.equal(randDays).and.is.not.null.and.is.not.undefined;
      console.log(
        "Activity - Dataobject Finished Basic CRUD for SetFieldValue and GetFieldValue for system fields"
      );
    });
    it("Basic CRUD for Accessors and setAsignee", async () => {
      console.log("Activity - DataObject Starting Basic CRUD for Accessors");
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
      expect(assignee, "Failed on asignee accessor").to.be.an("object").that.is
        .not.empty,
        expect(assignee?.email, "Failed on asignee.email accessor")
          .to.be.a("string")
          .that.is.equal("test@cpinodetest.com").and.is.not.null.and.is.not
          .undefined;

      expect(actionDT, "Failed on actionDateTime accessor").to.be.a("string")
        .that.is.not.null.and.is.not.undefined;

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
        expect(typeDef?.hidden, "Failed on typeDef.hidden").to.be.a("boolean")
          .that.is.false,
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
      expect(acc?.name, "Failed on acc?.name").to.be.equal(name).and.that.is.not
        .null.and.is.not.undefined,
        expect(acc?.resource, "Failed on acc?.resource").to.be.equal("accounts")
          .and.that.is.not.null.and.is.not.undefined,
        expect(acc?.hidden, "Failed on acc?.hidden").to.be.false.and.that.is.not
          .null.and.is.not.undefined,
        expect(acc?.uuid, "Failed on acc?.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null,
        console.log("Activity - DataObject Finished Basic CRUD for Accessors");
      expect(creator?.hidden, "Failed on creator.hidden").to.be.a("boolean")
        .that.is.false.and.that.is.not.null.and.is.not.undefined,
        expect(creator?.internalID, "Failed on creator.internalID")
          .to.be.a("number")
          .that.is.above(0).and.that.is.not.null.and.is.not.undefined,
        expect(creator?.uuid, "Failed on creator.uuid")
          .to.be.a("string")
          .and.to.have.lengthOf(36).and.that.is.not.null.and.is.not.undefined,
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

      const getTSANumber = await cnctDataObject?.getFieldValue("TSANumberCnct");
      expect(getTSANumber, "Failed on getTSANumber")
        .to.be.a("number")
        .that.is.equal(randZip).and.that.is.not.null.and.is.not.undefined;

      const getTSADecimal = await cnctDataObject?.getFieldValue(
        "TSADecimalCnct"
      );
      expect(getTSADecimal, "Failed on getTSADecimal")
        .to.be.a("number")
        .that.is.equal(+randDiscount.toFixed(4)).and.that.is.not.null.and.is.not
        .undefined;

      const getTSACurrency = await cnctDataObject?.getFieldValue(
        "TSACurrencyCnct"
      );
      expect(getTSACurrency, "Failed on getTSACurrency")
        .to.be.a("number")
        .that.is.equal(randZip).and.that.is.not.null.and.is.not.undefined;

      const getTSAPhone = await cnctDataObject?.getFieldValue("TSAPhoneCnct");
      expect(getTSAPhone, "Failed on getTSAPhone")
        .to.be.a("string")
        .that.is.equal(randPhone).and.that.is.not.null.and.is.not.undefined;

      const getTSAEmail = await cnctDataObject?.getFieldValue("TSAEmailCnct");
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
      const formattedDateTime = await service.dateFormatter(
        getTSADateTime,
        true,
        true
      );
      expect(formattedDateTime, "Failed on getTSADateTime")
        .to.be.a("string")
        .that.is.equal(dateTime).and.that.is.not.null.and.is.not.undefined;

      //==============================================SystemFields========================================================
      const getExID = await cnctDataObject?.getFieldValue("ExternalID");
      expect(getExID, "Failed on getExID").to.be.a("string").that.is.equal(ExID)
        .and.that.is.not.null.and.is.not.undefined;

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
      expect(typeDef, "Failed on TypeDef object").to.be.an("object").and.is.not
        .empty,
        expect(typeDef?.hidden, "Failed on TypeDef.hidden").to.be.a("boolean")
          .and.is.false.and.is.not.null.and.is.not.undefined,
        expect(typeDef?.name, "Failed on TypeDef.name")
          .to.be.a("string")
          .that.is.equal("Default Contact Person").and.is.not.null.and.is.not
          .undefined,
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

      const getInternalID = await userDataObject?.getFieldValue("InternalID");
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
      expect(getHidden, "Failed on getHidden").to.be.a("boolean").that.is.false
        .and.is.not.null.and.is.not.undefined;

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

      await actDataObject?.setFieldValue("Hidden", true);
      await dataObject?.setFieldValue("Hidden", true);
      await cnctDataObject?.setFieldValue("Hidden", true);
      await accDataObject?.setFieldValue("Hidden", true);
    });
  });
  //test end

  console.log("dataObjectCrud::test finished");
  const testResult = await run();

  return testResult;
}
