import "@pepperi-addons/cpi-node";
import Tester from "../tester";
import { addonUUID, adalTableName } from "../services/data.service";

export async function clientApiADALTest() {
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
  return testResult;
}
