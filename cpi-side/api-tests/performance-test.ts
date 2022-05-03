import "@pepperi-addons/cpi-node";
import Tester from "../tester";
import { UIField } from "@pepperi-addons/cpi-node";
import DataService from "../services/data.service"

export async function performanceTest() {
  const dataService = new DataService();
  const ExID = await dataService.getExID();
  
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

  return perfResults;
}
