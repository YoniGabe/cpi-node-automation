import "@pepperi-addons/cpi-node";
import Tester from "./tester";
import { Item, TransactionLine, Transaction } from "@pepperi-addons/cpi-node";
import { NavigationOptions,UDCGetListParams } from "./services/general.service";
import DataService, {
  OCEvents,
  addonUUID,
  adalTableName,
} from "./services/data.service";
import { runScript } from "./services/scripts.service";
import { createUIObjectTest } from "./api-tests/create-ui-object";
import { performanceTest } from "./api-tests/performance-test";
import { clientApiADALTest } from "./api-tests/client-api-adal";
import { dataObjectCrud } from "./api-tests/dataobject-crud";
import { dataObjectNegativeCrud } from "./api-tests/dataobject-negative-crud";
import { firstUIObjectCrud } from "./api-tests/ui-object-crud-1";
import { secondUIObjectCrud } from "./api-tests/ui-object-crud-2";

//**Test data variables */
let ExID: string;
let interceptorArr: number[];
let actionsArr: any[];
let timeoutArr: any[];
let preLoadGetLine: TransactionLine | undefined | number = 1;
let preLoadGetLines: TransactionLine[] | undefined;
let onLoadGetLine: TransactionLine | undefined;
let onLoadGetLines: TransactionLine[] | undefined;
let eventTimingObj = {
  first1: 0,
  first2: 0,
  first3: 0,
  second1: 0,
  second2: 0,
  second3: 0,
  third1: 0,
  third2: 0,
  third3: 0,
  fourth1: 0,
  fourth2: 0,
  fourth3: 0,
  fifth1: 0,
  fifth2: 0,
  fifth3: 0,
  firstClientAction: 0,
  secondClientAction: 0,
};
//how to debug? - https://pepperi-addons.github.io/cpi-node/index.html#debugging
//CPI NODE DOCS https://pepperi-addons.github.io/cpi-node/
/** Load function - setup for interceptors/load tests*/
//The function below sets up interceptors for the automation tests
//https://pepperi-addons.github.io/cpi-node/interfaces/events.interceptor.html
//It is a standard feature on a cpi-node addon
//see load function docs as well
//https://pepperi-addons.github.io/cpi-node/index.html#load
export async function load(configuration: any) {
  console.log("cpi side works!");
  const x = "why this is happening";
  console.log(x);
  console.log("Setting up test variables");
  const dataService = new DataService();

  ExID = await dataService.getExID();
  interceptorArr = [];
  actionsArr = [];
  timeoutArr = [];
  console.log("Finished setting up test variables");
  // get for test triggers, if one of these return true (happens automatically by the relevant test,triggers on and off when the test starts and ends)
  // See setTestFlag interface and function on server-side/my.service.ts
  // ====================================ADAL================================================
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
  const clientActionsTestActive = adalData.clientActionsTestActive;
  const withinHudClientActionsTestActive =
    adalData.clientActionsWithinHudTestActive;
  const InterceptorsTimeoutTestActive = adalData.InterceptorsTimeoutTestActive;
  const InterceptorActionsTest = adalData.InterceptorActionsTest;
  console.log("LoadTester::loadTestActive: " + loadTestActive);
  console.log("LoadTester::counter: " + loadTestCounter);
  console.log(
    "InterceptorTester::InterceptorTestActive: " + InterceptorsTestActive
  );
  console.log("TrnScopeTester::TrnScopeTestActive: " + TrnScopeTestActive);
  console.log(
    "clientActionsTester::clientActionsTestActive: " + clientActionsTestActive
  );
  console.log(
    "clientActionsTester::withinHudClientActionsTestActive: " +
      withinHudClientActionsTestActive
  );
  console.log(
    "clientActionsTester::InterceptorActionsTest: " + InterceptorActionsTest
  );
  console.log(
    "interceptorsTimeoutTester::InterceptorsTimeoutTestActive: " +
      InterceptorsTimeoutTestActive
  );
  //feature flagging -> meaning these load and work in the background only when the relevant flag is available on ADAL (triggerd by test)
  if (InterceptorActionsTest === true) {
    //two exact events with two separate actions
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "firstTrigger" },
      async (data, next, main) => {
        actionsArr.push(1);
        const res = (await data.client?.confirm("confirm", "1")) as boolean;
        if (res === true) {
          actionsArr.push("true");
        }
        actionsArr.push(2);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "firstTrigger" },
      async (data, next, main) => {
        actionsArr.push(3);
        const res = await data.client?.alert("alert", "2");
        if (res === undefined) {
          actionsArr.push("undefind");
        }
        actionsArr.push(4);
      }
    );

    //client actions after main
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "secondTrigger" },
      async (data, next, main) => {
        actionsArr.push(5);
        await next(async () => {
          console.log(
            "InterceptorActionsTest:: SecondTrigger - Inside second main"
          );
          actionsArr.push(7);
        });
        const res = await data.client?.alert("alert", "3");
        if (res === undefined) {
          actionsArr.push("undefind");
        }
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "secondTrigger" },
      async (data, next, main) => {
        actionsArr.push(6);
        console.log(
          "InterceptorActionsTest:: SecondTrigger - Inside first main"
        );
      }
    );

    //client action within main
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "thirdTrigger" },
      async (data, next, main) => {
        actionsArr.push(8);
        await next(async (data) => {
          const res = (await data.client?.confirm("confirm", "4")) as boolean;
          if (res === true) {
            actionsArr.push("true");
          }
          actionsArr.push(10);
        });
        console.log(
          "InterceptorActionsTest:: ThirdTrigger - Inside second main"
        );
        actionsArr.push(11);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "thirdTrigger" },
      async (data, next, main) => {
        actionsArr.push(9);
        console.log(
          "InterceptorActionsTest:: ThirdTrigger - Inside first main"
        );
      }
    );

    //client action before main
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fourthTrigger" },
      async (data, next, main) => {
        const res = await data.client?.confirm("confirm", "5");
        if (res === true) {
          actionsArr.push("true");
        }
        actionsArr.push(12);
        await next(async () => {
          actionsArr.push(14);
          console.log(
            "InterceptorActionsTest:: FourthTrigger - Inside second main"
          );
        });
        actionsArr.push(15);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fourthTrigger" },
      async (data, next, main) => {
        actionsArr.push(13);
        console.log(
          "InterceptorActionsTest:: FourthTrigger - Inside first main"
        );
      }
    );

    //expired client actions
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fifthTrigger" },
      async (data, next, main) => {
        setTimeout(async () => {
          const res = (await data.client?.confirm("confirm", "-1")) as boolean;
          if (res === true) {
            actionsArr.push("true");
          }
        }, 100);
        console.log(
          "InterceptorActionsTest:: FifthTrigger - Inside first main"
        );
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fifthTrigger" },
      async (data, next, main) => {
        await new Promise((resolve) => setTimeout(resolve, 110));
        const res = await data.client?.alert("alert", "6");
        if (res === undefined) {
          actionsArr.push("undefind");
        }
        actionsArr.push(16);
        console.log(
          "InterceptorActionsTest:: FifthTrigger - Inside second main"
        );
      }
    );

    //wait for last client action
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "sixthTrigger" },
      async (data, next, main) => {
        console.log(
          "InterceptorActionsTest:: sixthTrigger - Inside first main"
        );
        const res = await data.client?.captureGeoLocation({
          accuracy: "Medium",
          maxWaitTime: 400,
        });
        actionsArr.push(JSON.stringify(res));
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "sixthTrigger" },
      async (data, next, main) => {
        console.log(
          "InterceptorActionsTest:: sixthTrigger - Inside second main"
        );
        data.client
          ?.captureGeoLocation({ accuracy: "High", maxWaitTime: 1000 })
          .then((res) => {
            console.log("InterceptorActionsTest:: sixthTrigger - Inside then");
            actionsArr.push(JSON.stringify(res));
          });
        try {
          const upsert = await pepperi.api.userDefinedTables.upsert({
            table: "actionsSequence",
            mainKey: new Date().toISOString(),
            secondaryKey: "TestResults",
            value: actionsArr.toString(),
          });
          console.log(upsert);
        } catch (err) {
          console.log(err);
        }
      }
    );
  }
  if (withinHudClientActionsTestActive === true) {
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAAlertWithinHud" },
      async (data, next, main) => {
        console.log(
          "withinHudClientActionsTester::button pressed! starting Dialog client actions interceptor"
        );
        let options = {
          message: "withinHudTest",
          closeMessage: "HUD!!!",
          delay: 0.2,
          block: async (message) => {
            await data.client?.alert("alertWithinHud", "<p>Slava Ukraine<p>");
            const confirm = await data.client?.confirm(
              "confirmWithinHud",
              "putin is a huylo yayaya"
            );
            const showDialog = await data.client?.showDialog({
              title: "showDialogWithinHud",
              content: "putin pashul nahuy dibilnaya tvar yaya",
              actions: [
                { title: "not cool putin yaya", value: 1 },
                { title: "really not cool putin yaya", value: 2 },
                { title: "putin is a boomeryaya", value: 3 },
              ],
            });
            for (let i = 0; i < 10; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              message(`withinHudTest`);
            }
          },
        };
        const hud = await data.client?.showHUD(options);

        console.log(hud);
        console.log(
          "withinHudClientActionsTester::button pressed! finished Dialog client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSABarcodeWithinHud" },
      async (data, next, main) => {
        console.log(
          "withinHudClientActionsTester::button pressed! starting barcodeWithinHud client actions interceptor"
        );
        let options = {
          message: "withinHudTest",
          closeMessage: "HUD!!!",
          delay: 2,
          block: async (message) => {
            await data.client?.scanBarcode();
            for (let i = 0; i < 20; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              message(`withinHudTest`);
            }
          },
        };
        const hud = await data.client?.showHUD(options);

        console.log(hud);
        console.log(
          "withinHudClientActionsTester::button pressed! finished barcodeWithinHud client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAGeoLocationWithinHud" },
      async (data, next, main) => {
        console.log(
          "withinHudClientActionsTester::button pressed! starting TSAGeoLocationWithinHud client actions interceptor"
        );
        let options = {
          message: "withinHudTest",
          closeMessage: "HUD!!!",
          delay: 0.2,
          block: async (message) => {
            await data.client?.captureGeoLocation({
              accuracy: "High",
              maxWaitTime: 3000,
            });
            await data.client?.captureGeoLocation({
              accuracy: "Medium",
              maxWaitTime: 2000,
            });
            await data.client?.captureGeoLocation({
              accuracy: "Low",
              maxWaitTime: 1500,
            });
            for (let i = 0; i < 9; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              message(`withinHudTest`);
            }
          },
        };
        const hud = await data.client?.showHUD(options);

        console.log(hud);
        console.log(
          "withinHudClientActionsTester::button pressed! finished TSAGeoLocationWithinHud client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAWithinMixedHudFirst" },
      async (data, next, main) => {
        console.log(
          "withinHudClientActionsTester::button pressed! starting WithinMixedHudFirst client actions interceptor"
        );
        let options = {
          message: "withinHudTest",
          closeMessage: "HUD!!!",
          delay: 0.75,
          block: async (message) => {
            await data.client?.captureGeoLocation({
              accuracy: "High",
              maxWaitTime: 3000,
            });
            await data.client?.scanBarcode();
            await data.client?.confirm(
              "confirmWithinHud",
              "putin is a huylo yayaya"
            );
            await data.client?.captureGeoLocation({
              accuracy: "Medium",
              maxWaitTime: 2000,
            });
            await data.client?.alert("alertWithinHud", "<p>Slava Ukraine<p>");
            await data.client?.captureGeoLocation({
              accuracy: "Low",
              maxWaitTime: 1500,
            });
            await data.client?.showDialog({
              title: "showDialogWithinHud",
              content: "putin pashul nahuy dibilnaya tvar yaya",
              actions: [
                { title: "not cool putin yaya", value: 1 },
                { title: "really not cool putin yaya", value: 2 },
                { title: "putin is a boomeryaya", value: 3 },
              ],
            });

            for (let i = 0; i < 8; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              message(`withinHudTest`);
            }
          },
        };
        const hud = await data.client?.showHUD(options);

        console.log(hud);
        console.log(
          "withinHudClientActionsTester::button pressed! finished WithinMixedHudFirst client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAWithinMixedHudSecond" },
      async (data, next, main) => {
        console.log(
          "withinHudClientActionsTester::button pressed! starting WithinMixedHudSecond client actions interceptor"
        );
        let options = {
          message: "withinHudTest",
          closeMessage: "HUD!!!",
          delay: 0.25,
          block: async (message) => {
            await data.client?.scanBarcode();
            await data.client?.captureGeoLocation({
              accuracy: "Low",
              maxWaitTime: 1500,
            });
            await data.client?.scanBarcode();
            await data.client?.confirm(
              "confirmWithinHud",
              "putin is a huylo yayaya"
            );
            await data.client?.captureGeoLocation({
              accuracy: "High",
              maxWaitTime: 3000,
            });
            await data.client?.alert("alertWithinHud", "<p>Slava Ukraine<p>");
            await data.client?.scanBarcode();
            await data.client?.captureGeoLocation({
              accuracy: "Medium",
              maxWaitTime: 2000,
            });
            await data.client?.showDialog({
              title: "showDialogWithinHud",
              content: "putin pashul nahuy dibilnaya tvar yaya",
              actions: [
                { title: "not cool putin yaya", value: 1 },
                { title: "really not cool putin yaya", value: 2 },
                { title: "putin is a boomeryaya", value: 3 },
              ],
            });
            await data.client?.scanBarcode();

            for (let i = 0; i < 12; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              message(`withinHudTest`);
            }
          },
        };
        const hud = await data.client?.showHUD(options);

        console.log(hud);
        console.log(
          "withinHudClientActionsTester::button pressed! finished WithinMixedHudSecond client actions interceptor"
        );
        await next(main);
      }
    );
  }
  //=========================client-actions implementation=======================
  if (clientActionsTestActive === true) {
    //alert interceptor
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAAlert" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting Dialog client actions interceptor"
        );
        const alert = await data.client?.alert("alert", "putin is douchebag");
        const confirm = await data.client?.confirm(
          "confirm",
          "putin is a huylo"
        );
        const showDialog = await data.client?.showDialog({
          title: "showDialog",
          content: "putin pashul nahuy dibilnaya tvar",
          actions: [
            { title: "not cool putin", value: 1 },
            { title: "really not cool putin", value: 2 },
            { title: "putin is a boomer", value: 3 },
          ],
        });

        console.log(alert);
        console.log(confirm);
        console.log(showDialog);
        console.log(
          "clientActionsTester::button pressed! finished Dialog client actions interceptor"
        );
        await next(main);
      }
    );
    //hud interceptor
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAHUD" },
      async (data, next, main) => {
        console.log("button pressed! on hud");
        const hudOptions = {
          // HUD's message
          message: "Waiting....", // optional (default value is '')

          // adds a button with text to the HUD
          closeMessage: "Press to close", // optional - (default is '' and the botton is hidden)
          //need to change closeMessage to the real attribute
          //display the HUD after the delay time (the block runs in the meantime)
          delay: 0.2, //optional - (default value is 0.5)

          // block of code that will run in background while the HUD is showing.
          block: async () => {
            // do stuff that takes a long time that needs a HUD
            // for example:
            // You can call any client action you want like this.
            for (let i = 0; i < 15; i++) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              // you can update the HUD message while the HUD is showing
              //updateMessage(`In progress ${i}%`);
            }
          },
        };

        const hud = await data.client?.showHUD(hudOptions);
        console.log(hud);
        await next(main);
      }
    );
    //scanBarcode interceptor
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSAScanBarcode" },
      async (data, next, main) => {
        console.log("button pressed! on captureGeo");
        const barcode = await data.client?.scanBarcode();
        console.log(barcode);
        await next(main);
      }
    );
    //captureGeo interceptor
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSACaptureGeo" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting captureGeo client actions interceptor"
        );
        const captureHigh = await data.client?.captureGeoLocation({
          accuracy: "High",
          maxWaitTime: 300,
        });
        const captureMed = await data.client?.captureGeoLocation({
          accuracy: "Medium",
          maxWaitTime: 200,
        });
        const captureLow = await data.client?.captureGeoLocation({
          accuracy: "Low",
          maxWaitTime: 400,
        });

        console.log(captureHigh);
        console.log(captureMed);
        console.log(captureLow);
        console.log(
          "clientActionsTester::button pressed! finished captureGeo client actions interceptor"
        );
        await next(main);
      }
    );
    //navigate interceptors
    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSANavigateToCustomPage" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting TSANavigateToCustomPage client actions interceptor"
        );
        const options: NavigationOptions = {
          url: "/customblankpage",
          history: "ClearTo",
        };

        await data.client?.navigateTo(options);

        console.log(
          "clientActionsTester::button pressed! finished TSANavigateToCustomPage client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSANavigateToHome" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting TSANavigateToHome client actions interceptor"
        );
        const options: NavigationOptions = {
          url: "/homepage",
          history: "None",
        };

        await data.client?.navigateTo(options);

        console.log(
          "clientActionsTester::button pressed! finished TSANavigateToHome client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSANavigateToCustomModal" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting TSANavigateToCustomModal client actions interceptor"
        );

        const alert = await data.client?.alert("alert", "putin is douchebag");

        const options: NavigationOptions = {
          url: "/customblankpage",
          history: "None",
        };

        await data.client?.navigateTo(options);

        console.log(
          "clientActionsTester::button pressed! finished TSANavigateToCustomModal client actions interceptor"
        );
        await next(main);
      }
    );

    pepperi.events.intercept(
      OCEvents.Button,
      { FieldID: "TSANavigateBack" },
      async (data, next, main) => {
        console.log(
          "clientActionsTester::button pressed! starting TSANavigateBack client actions interceptor"
        );

        await data.client?.navigateBack();

        await data.client?.alert("sould not fire", "if it does its a bug");

        console.log(
          "clientActionsTester::button pressed! finished TSANavigateBack client actions interceptor"
        );
        await next(main);
      }
    );
  }

  if (TrnScopeTestActive === true) {
    //========================TransactionScope Interceptors===================================
    pepperi.events.intercept(OCEvents.preLoad, {}, async (data, next, main) => {
      console.log("preLoadTransactionScope interceptor");
      // let itemRes = await pepperi.api.items.get({
      //   key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
      //   fields: ["InternalID", "ExternalID", "UUID"],
      // });

      let itemRes = await pepperi.api.items.search({
        fields: ["UUID", "ExternalID", "InternalID"],
        filter: {
          ApiName: "ExternalID",
          FieldType: "String",
          Operation: "IsEqual",
          Values: ["AQ3"],
        },
      });

      let itemUUID = itemRes.objects[0].UUID;

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
      // let itemRes = await pepperi.api.items.get({
      //   key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3
      //   fields: ["InternalID", "ExternalID", "UUID"],
      // });

      let itemRes = await pepperi.api.items.search({
        fields: ["UUID", "ExternalID", "InternalID"],
        filter: {
          ApiName: "ExternalID",
          FieldType: "String",
          Operation: "IsEqual",
          Values: ["AQ3"],
        },
      });

      let itemUUID = itemRes.objects[0].UUID;

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
  //Load test essentially performs a sync while this is active,after the sync the Load function should run again (that's the scenario)
  //PLEASE DEBUG THE TESTS THAT THE INTERCEPTORS BELOW ARE RELATED TO ON THE SERVER SIDE,NO REAL WAY TO DEBUG THESE IN A LIVE CODE SESSION FROM CPI-SIDE
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
  //Interceptors test
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
  //InterceptorsTimeoutTest
  if (InterceptorsTimeoutTestActive === true) {
    //3 interceptors with next&main - timeout before main - should provide output of 1,5,8,9,10,7
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "firstTimeout" },
      async (data, next) => {
        eventTimingObj.first1 = performance.now();
        timeoutArr.push(1);
        await new Promise((resolve) => {
          console.log("never resolve");
        });
        timeoutArr.push(2);
        await next(async () => {
          timeoutArr.push(3);
        });
        timeoutArr.push(4);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "firstTimeout" },
      async (data, next) => {
        eventTimingObj.first2 = performance.now();
        eventTimingObj.first1 = performance.now() - eventTimingObj.first1;
        timeoutArr.push(5);
        await next(async () => {
          timeoutArr.push(6);
        });
        timeoutArr.push(7);
        //eventTimingObj.first = performance.now() - eventTimingObj.first;
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "firstTimeout" },
      async (data, next) => {
        eventTimingObj.first3 = performance.now();
        eventTimingObj.first2 = performance.now() - eventTimingObj.first2;
        timeoutArr.push(8);
        await next(async () => {
          timeoutArr.push(9);
        });
        timeoutArr.push(10);
        eventTimingObj.first3 = performance.now() - eventTimingObj.first3;
      }
    );

    //3 interceptors with next & main - timeout after main - should output 11,13,16,17,18,15
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "secondTimeout" },
      async (data, next) => {
        eventTimingObj.second1 = performance.now();
        timeoutArr.push(11);
        await next(async () => {
          timeoutArr.push(12);
        });
        timeoutArr.push(15);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "secondTimeout" },
      async (data, next) => {
        eventTimingObj.second1 = performance.now() - eventTimingObj.second1;
        eventTimingObj.second2 = performance.now();
        timeoutArr.push(13);
        await next(async () => {
          timeoutArr.push(14);
        });
        await new Promise((resolve) => {
          console.log("never resolve");
        });
        timeoutArr.push(-1);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "secondTimeout" },
      async (data, next) => {
        eventTimingObj.second2 = performance.now() - eventTimingObj.second2;
        eventTimingObj.second3 = performance.now();
        timeoutArr.push(16);
        await next(async () => {
          timeoutArr.push(17);
        });
        timeoutArr.push(18);
        eventTimingObj.second3 = performance.now() - eventTimingObj.second3;
      }
    );

    //3 interceptors with next & main - timeout within main - should output 19,22,25,26,27,24,21
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "thirdTimeout" },
      async (data, next) => {
        eventTimingObj.third1 = performance.now();
        timeoutArr.push(19);
        await next(async () => {
          timeoutArr.push(20);
        });
        timeoutArr.push(21);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "thirdTimeout" },
      async (data, next) => {
        eventTimingObj.third2 = performance.now();
        eventTimingObj.third1 = performance.now() - eventTimingObj.third1;
        timeoutArr.push(22);
        await next(async () => {
          await new Promise((resolve) => {
            console.log("never resolve");
          });
          timeoutArr.push(23);
        });
        timeoutArr.push(24);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "thirdTimeout" },
      async (data, next) => {
        eventTimingObj.third2 = performance.now() - eventTimingObj.third2;
        eventTimingObj.third3 = performance.now();
        timeoutArr.push(25);
        await next(async () => {
          timeoutArr.push(26);
        });
        timeoutArr.push(27);
        eventTimingObj.third3 = performance.now() - eventTimingObj.third3;
      }
    );

    //3 interceptors with next & main - timeout before and after main - should output 28,32,35,36,37
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fourthTimeout" },
      async (data, next) => {
        eventTimingObj.fourth1 = performance.now();
        timeoutArr.push(28);
        await new Promise((resolve) => {
          console.log("never resolve");
        });
        timeoutArr.push(29);
        await next(async () => {
          timeoutArr.push(30);
        });
        timeoutArr.push(31);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fourthTimeout" },
      async (data, next) => {
        eventTimingObj.fourth1 = performance.now() - eventTimingObj.fourth1;
        eventTimingObj.fourth2 = performance.now();
        timeoutArr.push(32);
        await next(async () => {
          timeoutArr.push(33);
        });
        await new Promise((resolve) => {
          console.log("never resolve");
        });
        timeoutArr.push(34);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fourthTimeout" },
      async (data, next) => {
        eventTimingObj.fourth2 = performance.now() - eventTimingObj.fourth2;
        eventTimingObj.fourth3 = performance.now();
        timeoutArr.push(35);
        await next(async () => {
          timeoutArr.push(36);
        });
        timeoutArr.push(37);
        eventTimingObj.fourth3 = performance.now() - eventTimingObj.fourth3;
      }
    );

    //3 interceptors with next & main - timeout exclude client actions time - should output 38,39,42,43,46,47,48
    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fifthTimeout" },
      async (data, next) => {
        eventTimingObj.fifth1 = performance.now();
        timeoutArr.push(38);
        eventTimingObj.firstClientAction = performance.now();
        const res = await data.client?.captureGeoLocation({
          maxWaitTime: 200,
          accuracy: "Medium",
        });
        eventTimingObj.firstClientAction = performance.now() - eventTimingObj.firstClientAction;
        timeoutArr.push(39);
        await next(async () => {
          timeoutArr.push(40);
        });
        timeoutArr.push(41);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fifthTimeout" },
      async (data, next) => {
        eventTimingObj.fifth1 = performance.now() - eventTimingObj.fifth1 - eventTimingObj.firstClientAction;
        eventTimingObj.fifth2 = performance.now();
        timeoutArr.push(42);
        eventTimingObj.secondClientAction = performance.now();
        const res = await data.client?.captureGeoLocation({
          maxWaitTime: 200,
          accuracy: "Medium",
        });
        eventTimingObj.secondClientAction = performance.now() - eventTimingObj.secondClientAction;
        timeoutArr.push(43);
        await next(async () => {
          timeoutArr.push(44);
        });
        timeoutArr.push(45);
      }
    );

    pepperi.events.intercept(
      "TSAButtonPressed",
      { FieldID: "fifthTimeout" },
      async (data, next) => {
        eventTimingObj.fifth2 = performance.now() - eventTimingObj.fifth2 - eventTimingObj.secondClientAction;
        eventTimingObj.fifth3 = performance.now();
        timeoutArr.push(46);
        await next(async () => {
          timeoutArr.push(47);
        });
        timeoutArr.push(48);
        eventTimingObj.fifth3 = performance.now() - eventTimingObj.fifth3;
        try {
          const upsert = await pepperi.api.userDefinedTables.upsert({
            table: "interceptorsTimeout",
            mainKey: new Date().toISOString(),
            secondaryKey: "TestResults",
            value: timeoutArr.toString(),
          });
          console.log(upsert);
        } catch (err) {
          console.log(err);
        }

        try {
          const upsert = await pepperi.api.userDefinedTables.upsert({
            table: "interceptorsTiming",
            mainKey: new Date().toISOString(),
            secondaryKey: "TestResults",
            value: JSON.stringify(eventTimingObj),
          });
          console.log(upsert);
        } catch (err) {
          console.log(err);
        }
      }
    );
  }
}

export const router = Router();
//debugger for specific code chunks,use this if you need a dummy endpoint on cpi-side
router.use("/debug-tester", async (req, res) => {
  console.log("Start");
  console.log("end");
});
//setup routers for AddonAPI automation tests
//docs https://pepperi-addons.github.io/cpi-node/index.html#addon-api
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
//Recalculate trigger for interceptors test - triggers a recalculate event in which there is an awaiting interceptor
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
//==============================/ClientAPI/ADAL test Endpoint=======================================
router.get("/ClientAPI/ADAL", async (req, res, next) => {
  console.log("Inside clientAPI/ADAL test endpoint");
  const testResult = await clientApiADALTest();
  res.json(testResult);
});
//===========================Performence/Stress tests Endpoint================================
router.get("/PerformenceTest", async (req, res, next) => {
  console.log("Inside performaceTest Endpoint");
  const perfResults = await performanceTest();
  res.json({
    currentResults: perfResults,
  });
});
//==========================TransactionScope tests===================================
//Leave this test here,it takes gloabl variables that gets valued on the Load function
//test for the TrnScope functions and interceptors - debug here and not on server side - make sure the test trigger is set to true inside load function
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
  console.log(DataObject);
  console.log("TransactionScopeTester:: got transaction dataobject section");

  const preLoadTrnScope = DataObject?.transactionScope; //-> suppose to be undefined -> if OC not loaded should return undefined

  // let itemRes = await pepperi.api.items.get({
  //   key: { UUID: "E9AAF730-90FC-43D0-945A-A81537908F8C" }, //AQ3 // item per  environment
  //   fields: ["InternalID", "ExternalID", "UUID"],
  // });

  let itemRes = await pepperi.api.items.search({
    fields: ["UUID", "ExternalID", "InternalID"],
    filter: {
      ApiName: "ExternalID",
      FieldType: "String",
      Operation: "IsEqual",
      Values: ["AQ3"],
    },
  });
  //isInTransition -> if its in a middle of transition
  //AvailableTransition -> should return possible transition

  let itemUUID = itemRes.objects[0].UUID;

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
      ).that.is.undefined;
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
      expect(getLines.length, "Failed on getLines returning wrong array length")
        .to.be.an("number")
        .that.is.above(108);
      expect(getLines[0], "Failed on getLines returning empty").to.be.an(
        "object"
      ).that.is.not.null.and.is.not.undefined;
      expect(
        getLines[0]?.children.length,
        "Failed on getLines.children returning a value"
      )
        .to.be.an("number")
        .that.is.above(5);
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
        .with.lengthOf.above(5);
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
      expect(
        onLoadgetLines?.length,
        "Failed on getLines returning wrong array length"
      )
        .to.be.an("number")
        .that.is.above(108);
      if (onLoadgetLines) {
        expect(
          onLoadgetLines[0],
          "Failed on onLoadgetLines getLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadgetLines[0]?.children.length,
          "Failed on onLoadgetLines getLines.children returning a value"
        )
          .to.be.an("number")
          .with.above(5);
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
          onLoadgetLines[1]?.children.length,
          "Failed on onLoadgetLines getLines.children returning a value"
        )
          .to.be.an("number")
          .with.above(5);
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
      expect(preLoadGetLine, "Failed on preLoadGetLine having data").to.be.an(
        "object"
      ).that.is.not.undefined;
      expect(
        preLoadGetLines,
        "Failed on preLoadGetLines returning an array with data"
      )
        .that.is.an("array")
        .with.lengthOf.above(10).and.that.is.not.undefined;
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
        .that.has.lengthOf.above(108);
      if (onLoadGetLines) {
        expect(
          onLoadGetLines[0],
          "Failed on onLoadGetLines returning empty"
        ).to.be.an("object").that.is.not.null.and.is.not.undefined;
        expect(
          onLoadGetLines[0]?.children.length,
          "Failed on onLoadGetLines.children returning a value"
        )
          .to.be.an("number")
          .with.above(5);
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
          onLoadGetLines[1]?.children.length,
          "Failed on onLoadGetLines.children returning a value"
        )
          .to.be.an("number")
          .with.above(5);
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

    //   it("Negative Trnasaction Scope tests", async () => {
    //     //1.load hidden item from transaction scope
    //     //2.Load hidden transaction to transaction scope
    //     //
    //     let negativeDataObject = {};
    //     try {
    //     } catch {}
    //   });
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
//===========================Get JWT from CPISide Endpoint========================================
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
//===========================UIObject.Create Test Endpoint================================================
router.get("/UIObjectCreate", async (req, res, next) => {
  console.log("Inside uiObject.Create endpoint");
  const testResult = await createUIObjectTest();
  res.json(testResult);
});
//===========================Positive dataObject CRUD endpoint============================================
router.get("/dataObjectCrud", async (req, res, next) => {
  console.log("Inside dataObjectCrud endpoint");
  const testResult = await dataObjectCrud();
  res.json(testResult);
});
//===========================Negative dataObject CRUD endpoint============================================
router.get("/dataObjectNegativeCrud", async (req, res, next) => {
  console.log("Inside dataObjectNegativeCrud endpoint");
  const testResult = await dataObjectNegativeCrud();
  res.json(testResult);
});
//===========================Positive UIObject 1 CRUD endpoint============================================
router.get("/firstUIObjectCrud", async (req, res, next) => {
  console.log("Inside firstUIObjectCrud endpoint");
  const testResult = await firstUIObjectCrud();
  res.json(testResult);
});
//===========================Positive UIObject 2 CRUD endpoint============================================
router.get("/secondUIObjectCrud", async (req, res, next) => {
  console.log("Inside secondUIObjectCrud endpoint");
  const testResult = await secondUIObjectCrud();
  res.json(testResult);
});
//===================runScript cpi-side endpoint==========================================================
router.get("/runScript", async (req, res, next) => {
  console.log("Inside runScript endpoint on automation addon");
  const scriptKey = req.body.Key;
  const scriptData = req.body.Data;

  const scriptRun = await runScript(scriptKey, scriptData);
  res.json(scriptRun);
});
//=========================get Synced data from udc - if the data is here the sync test should be good==========================================
// router.get("/getDataFromSync", async (req,res,next) => {
// const tableName = req.body.tableName;
// const index = req.body.index;
// let filterObj = {} as UDCGetListParams;
// if(index) {
//   filterObj = {
//   table: tableName,
//   index: index
// }} else {
//  filterObj = {
//   table: tableName,
//  }}
// const response = await pepperi.api.userDefinedCollections.getList(filterObj);
// res.json(response);
// });
