import "@pepperi-addons/cpi-node";
import Tester from "../tester";
import DataService from "../services/data.service";
import generalService from "../services/general.service";

let randZip: number;
let randDiscount: number;
let randPhone: string;
let quantitiesTotal: number;
let userEmail: string;
let name: string;
let phrase: string;
let randBool: boolean;
let ExID: string;
let date;
let dateOnly;
let link: string;
let HTML: string;

export async function dataObjectNegativeCrud(testParams?: any) {
  console.log("dataObjectNegativeCrud::Started test");
  const dataService = new DataService();
  const service = new generalService();
  const { describe, it, expect, run } = Tester("My test");

  randZip = await dataService.getRandZip();
  randDiscount = await dataService.getRandDiscount();
  randPhone = await dataService.getRandPhone();
  quantitiesTotal = await dataService.getQuantitiesTotal();
  userEmail = await dataService.getEmail();
  name = await dataService.getName();
  phrase = await dataService.getPhrase();
  randBool = await dataService.getRandBool();
  ExID = await dataService.getExID();
  date = await dataService.getDate();
  dateOnly = await dataService.getDateOnly(date);
  link = await dataService.getLink();
  HTML = await dataService.getHTML();

  let accRes = await pepperi.app.accounts.add({
    type: { Name: "Customer" },
    object: {
      ExternalID: ExID,
      Name: ExID,
    },
  });

  const accountUUID = accRes.id;

  let activityApiRes = await pepperi.app.activities.add({
    type: { Name: "CPINode Test Activity" },
    references: {
      account: { UUID: accountUUID },
    },
  });

  const activityUUID = activityApiRes.id;

  let itemRes = await pepperi.api.items.search({
    fields: ["UUID", "ExternalID", "InternalID"],
    filter: {
      ApiName: "ExternalID",
      FieldType: "String",
      Operation: "IsEqual",
      Values: ["AQ3"],
    },
  }); //AQ3

  let itemUUID = itemRes.objects[0].UUID;

  let itemResTypeDef = await pepperi.api.items.search({
    fields: ["UUID", "ExternalID", "InternalID"],
    filter: {
      ApiName: "ExternalID",
      FieldType: "String",
      Operation: "IsEqual",
      Values: ["CG2"],
    },
  });

  let apiRes = await pepperi.app.transactions.add({
    type: { Name: "DorS CPINode Sales Order" },
    references: {
      account: { UUID: accountUUID },
      catalog: { Name: "Default Catalog" },
    },
  });

  const transactionUUID = apiRes.id;

  let itemTypeDefUUID = itemResTypeDef.objects[0].UUID;

  let itemDataObjectTypeDef = await pepperi.DataObject.Get(
    "items",
    itemTypeDefUUID
  );


  let itemDataObject = await pepperi.DataObject.Get("items", itemUUID);

  let actDataObject = await pepperi.DataObject.Get("activities", activityUUID);
   
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

  //mocha tests!

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


  console.log("dataObjectNegativeCrud::test finished");
  const testResult = await run();

  return testResult;
}
