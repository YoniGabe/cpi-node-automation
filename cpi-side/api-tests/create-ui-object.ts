import "@pepperi-addons/cpi-node";
import Tester from "../tester";
import {
  DataViewContext,
  BaseFormDataViewField,
} from "@pepperi-addons/papi-sdk/dist/entities/data-view";

export async function createUIObjectTest() {
  console.log("UIObject.Create:: Started test");
  const ctx = { Name: "ContactPersonForm" } as DataViewContext;
  const slugsUiObj = await pepperi.UIObject.Create(ctx);
  console.log("UIObject.Create:: Got DataView");
  console.log(slugsUiObj);
  const { describe, it, expect, run } = Tester("My test");

  describe("UIObject.Create automation test", async () => {
    console.log("UIObject.Create:: Started mocha section");

    it("UIObject.Create - Base Properties parsed test results", async () => {
      expect(
        slugsUiObj,
        "Failed on Dataview returning wrong type (not object)"
      ).to.be.an("object").that.is.not.undefined.and.empty;
      expect(
        slugsUiObj?.backgroundColor,
        "failed on BG color returning wrong type"
      ).to.be.a("string").that.is.not.undefined;
      expect(slugsUiObj?.context.Name, "Failed on wrong context.Name")
        .to.be.a("string")
        .that.is.equal("ContactPersonForm");
      expect(slugsUiObj?.context.Object, "Failed on wrong context.Object").that
        .is.undefined;
      expect(
        slugsUiObj?.context.Profile.InternalID,
        "Failed on wrong context.Profile.InternalID"
      )
        .that.is.a("number")
        .that.is.above(-1);
      expect(
        slugsUiObj?.context.ScreenSize,
        "Failed on wrong context.ScreenSize"
      )
        .that.is.a("string")
        .that.is.equal("Tablet");
      expect(slugsUiObj?.key, "Failed on key returning wrong value")
        .to.be.a("string")
        .that.includes("ContactPersonForm");
      expect(
        slugsUiObj?.readonly,
        "Failed on readonly returning wrong type/value"
      ).to.be.a("boolean").that.is.false;
      expect(
        slugsUiObj?.dataObject?.hidden,
        "Failed on dataObj.hidden returning wrong value/type"
      ).to.be.a("boolean").that.is.false;
      expect(
        slugsUiObj?.dataObject?.internalID,
        "Failed on dataObj.InternalID returning wrong value/type"
      )
        .to.be.a("number")
        .that.is.above(-1);
      expect(
        slugsUiObj?.dataObject?.resource,
        "Failed on dataObj.resource returning wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal("None");
      expect(
        slugsUiObj?.dataObject?.typeDefinition,
        "Failed on dataObj.typeDefinition returning wrong value/type"
      ).to.be.undefined;
      expect(
        slugsUiObj?.dataObject?.uuid,
        "Failed on dataObj.uuid returning wrong value/type"
      )
        .to.be.a("string")
        .that.is.equal("00000000-0000-0000-0000-000000000000");
    });
    const fields = slugsUiObj?.dataView.Fields as BaseFormDataViewField[];
    it("UIObject.Create - DataView.Fields parsed test results", async () => {
      if (fields) {
        //email
        expect(
          fields[0],
          "Failed on Email field not returning an object"
        ).to.be.an("object");
        expect(fields[0].FieldID, "Failed on wrong FieldID returning for Email")
          .to.be.a("string")
          .and.is.equal("Email");
        expect(fields[0].Layout, "Failed on wrong layout returning for Email")
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 0 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[0].Mandatory,
          "Failed on Email Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[0].ReadOnly,
          "Failed on Email ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(fields[0].Title, "Failed on Email Title returning wrong value")
          .to.be.a("string")
          .that.is.equal("Email");
        expect(fields[0].Type, "Failed on Email Type returning wrong value")
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(fields[0].Style, "Failed on Email style returning wrong value")
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });

        //ExID
        expect(
          fields[1],
          "Failed on ExternalID field not returning an object"
        ).to.be.an("object");
        expect(
          fields[1].FieldID,
          "Failed on wrong FieldID returning for ExternalID"
        )
          .to.be.a("string")
          .and.is.equal("ExternalID");
        expect(
          fields[1].Layout,
          "Failed on wrong layout returning for ExternalID"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 1 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[1].Mandatory,
          "Failed on ExternalID Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[1].ReadOnly,
          "Failed on ExternalID ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.true;
        expect(
          fields[1].Title,
          "Failed on ExternalID Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("ExternalID");
        expect(
          fields[1].Type,
          "Failed on ExternalID Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(
          fields[1].Style,
          "Failed on ExternalID style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });

        //Mobile
        expect(
          fields[2],
          "Failed on Mobile field not returning an object"
        ).to.be.an("object");
        expect(
          fields[2].FieldID,
          "Failed on wrong FieldID returning for Mobile"
        )
          .to.be.a("string")
          .and.is.equal("Mobile");
        expect(fields[2].Layout, "Failed on wrong layout returning for Mobile")
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 2 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[2].Mandatory,
          "Failed on Mobile Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[2].ReadOnly,
          "Failed on Mobile ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(fields[2].Title, "Failed on Mobile Title returning wrong value")
          .to.be.a("string")
          .that.is.equal("Mobile");
        expect(fields[2].Type, "Failed on Mobile Type returning wrong value")
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(fields[2].Style, "Failed on Mobile style returning wrong value")
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //status
        expect(
          fields[3],
          "Failed on Status field not returning an object"
        ).to.be.an("object");
        expect(
          fields[3].FieldID,
          "Failed on wrong FieldID returning for Status"
        )
          .to.be.a("string")
          .and.is.equal("Status");
        expect(fields[3].Layout, "Failed on wrong layout returning for Status")
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 3 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[3].Mandatory,
          "Failed on Status Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[3].ReadOnly,
          "Failed on Status ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.true;
        expect(fields[3].Title, "Failed on Status Title returning wrong value")
          .to.be.a("string")
          .that.is.equal("Status");
        expect(fields[3].Type, "Failed on Status Type returning wrong value")
          .to.be.a("string")
          .that.is.equal("EmptyComboBox");
        expect(fields[3].Style, "Failed on Status style returning wrong value")
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //uuid
        expect(
          fields[4],
          "Failed on UUID field not returning an object"
        ).to.be.an("object");
        expect(fields[4].FieldID, "Failed on wrong FieldID returning for UUID")
          .to.be.a("string")
          .and.is.equal("UUID");
        expect(fields[4].Layout, "Failed on wrong layout returning for UUID")
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 4 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[4].Mandatory,
          "Failed on UUID Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[4].ReadOnly,
          "Failed on UUID ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.true;
        expect(fields[4].Title, "Failed on UUID Title returning wrong value")
          .to.be.a("string")
          .that.is.equal("UUID");
        expect(fields[4].Type, "Failed on UUID Type returning wrong value")
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(fields[4].Style, "Failed on UUID style returning wrong value")
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //WrntyID
        expect(
          fields[5],
          "Failed on WrntyID field not returning an object"
        ).to.be.an("object");
        expect(
          fields[5].FieldID,
          "Failed on wrong FieldID returning for WrntyID"
        )
          .to.be.a("string")
          .and.is.equal("WrntyID");
        expect(fields[5].Layout, "Failed on wrong layout returning for WrntyID")
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 5 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[5].Mandatory,
          "Failed on WrntyID Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[5].ReadOnly,
          "Failed on WrntyID ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.true;
        expect(fields[5].Title, "Failed on WrntyID Title returning wrong value")
          .to.be.a("string")
          .that.is.equal("WrntyID");
        expect(fields[5].Type, "Failed on WrntyID Type returning wrong value")
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(fields[5].Style, "Failed on WrntyID style returning wrong value")
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //TSADateTime
        expect(
          fields[6],
          "Failed on TSADateTime field not returning an object"
        ).to.be.an("object");
        expect(
          fields[6].FieldID,
          "Failed on wrong FieldID returning for TSADateTime"
        )
          .to.be.a("string")
          .and.is.equal("TSADateTimeCnct");
        expect(
          fields[6].Layout,
          "Failed on wrong layout returning for TSADateTime"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 6 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[6].Mandatory,
          "Failed on TSADateTime Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[6].ReadOnly,
          "Failed on TSADateTime ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[6].Title,
          "Failed on TSADateTime Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("DateTimeCnct");
        expect(
          fields[6].Type,
          "Failed on TSADateTime Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("DateAndTime");
        expect(
          fields[6].Style,
          "Failed on TSADateTime style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //TSADecimalCnct
        expect(
          fields[7],
          "Failed on TSADecimal field not returning an object"
        ).to.be.an("object");
        expect(
          fields[7].FieldID,
          "Failed on wrong FieldID returning for TSADecimal"
        )
          .to.be.a("string")
          .and.is.equal("TSADecimalCnct");
        expect(
          fields[7].Layout,
          "Failed on wrong layout returning for TSADecimal"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 7 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[7].Mandatory,
          "Failed on TSADecimal Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[7].ReadOnly,
          "Failed on TSADecimal ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[7].Title,
          "Failed on TSADecimal Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("DecimalCnct");
        expect(
          fields[7].Type,
          "Failed on TSADecimal Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("NumberReal");
        expect(
          fields[7].Style,
          "Failed on TSADecimal style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //TSASingLineTextCnct
        expect(
          fields[8],
          "Failed on TSASingleLineTextCnct field not returning an object"
        ).to.be.an("object");
        expect(
          fields[8].FieldID,
          "Failed on wrong FieldID returning for TSASingleLineTextCnct"
        )
          .to.be.a("string")
          .and.is.equal("TSASingleLineTextCnct");
        expect(
          fields[8].Layout,
          "Failed on wrong layout returning for TSASingleLineTextCnct"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 8 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[8].Mandatory,
          "Failed on TSASingleLineTextCnct Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[8].ReadOnly,
          "Failed on TSASingleLineTextCnct ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[8].Title,
          "Failed on TSASingleLineTextCnct Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("SingleLineTextCnct");
        expect(
          fields[8].Type,
          "Failed on TSASingleLineTextCnct Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("TextBox");
        expect(
          fields[8].Style,
          "Failed on TSASingleLineTextCnct style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });

        //TSALimitedLineTextCnct
        expect(
          fields[9],
          "Failed on TSALimitedLineTextCnct field not returning an object"
        ).to.be.an("object");
        expect(
          fields[9].FieldID,
          "Failed on wrong FieldID returning for TSALimitedLineTextCnct"
        )
          .to.be.a("string")
          .and.is.equal("TSALimitedLineTextCnct");
        expect(
          fields[9].Layout,
          "Failed on wrong layout returning for TSALimitedLineTextCnct"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 9 },
            Size: { Width: 1, Height: 1 },
          });
        expect(
          fields[9].Mandatory,
          "Failed on TSALimitedLineTextCnct Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[9].ReadOnly,
          "Failed on TSALimitedLineTextCnct ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[9].Title,
          "Failed on TSALimitedLineTextCnct Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("LimitedLineTextCnct");
        expect(
          fields[9].Type,
          "Failed on TSALimitedLineTextCnct Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("LimitedLengthTextBox");
        expect(
          fields[9].Style,
          "Failed on TSALimitedLineTextCnct style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
        //TSAParagraphTextCnct
        expect(
          fields[10],
          "Failed on TSAParagraphTextCnct field not returning an object"
        ).to.be.an("object");
        expect(
          fields[10].FieldID,
          "Failed on wrong FieldID returning for TSAParagraphTextCnct"
        )
          .to.be.a("string")
          .and.is.equal("TSAParagraphTextCnct");
        expect(
          fields[10].Layout,
          "Failed on wrong layout returning for TSAParagraphTextCnct"
        )
          .to.be.an("object")
          .and.is.deep.equal({
            Origin: { X: 0, Y: 10 },
            Size: { Width: 1, Height: 2 },
          });
        expect(
          fields[10].Mandatory,
          "Failed on TSAParagraphTextCnct Mandatory returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[10].ReadOnly,
          "Failed on TSAParagraphTextCnct ReadOnly returning wrong value"
        ).to.be.a("boolean").that.is.false;
        expect(
          fields[10].Title,
          "Failed on TSAParagraphTextCnct Title returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("ParagraphTextCnct");
        expect(
          fields[10].Type,
          "Failed on TSAParagraphTextCnct Type returning wrong value"
        )
          .to.be.a("string")
          .that.is.equal("TextArea");
        expect(
          fields[10].Style,
          "Failed on TSAParagraphTextCnct style returning wrong value"
        )
          .to.be.an("object")
          .that.is.deep.equal({
            Alignment: { Vertical: "Center", Horizontal: "Left" },
          });
      }
    });
  });
  console.log("UIObject.Create:: Finished mocha section");
  const testResult = await run();

  return testResult;
}
