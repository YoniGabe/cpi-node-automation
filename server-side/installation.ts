import { Client, Request } from "@pepperi-addons/debug-server";
import MyService from "./services/my.service";
//upserting scehmes and ADAL triggers
exports.install = async (client: Client, request: Request) => {
  const service = new MyService(client);
  let error = "none";
  const UDTArray = [
    "interceptorsTimeout",
    "actionsSequence",
    "TransactionScopeUDT",
    "LoadUDT",
    "InterceptorsUDT",
    "interceptorsTiming",
  ];
  try {
    const triggersScheme = await service.papiClient.addons.data.schemes.post({
      Name: "Load_Test",
      Type: "cpi_meta_data",
    });
    const notificationsScheme =
      await service.papiClient.addons.data.schemes.post({
        Name: "NotificationsLogger",
        Type: "meta_data",
      });
    const syncScheme = await service.papiClient.addons.data.schemes.post({
      Name: "syncTable",
      Type: "data",
    });

    const testKey1 = await service.papiClient.addons.data
      .uuid(client.AddonUUID)
      .table("Load_Test")
      .upsert({
        Key: "testKey1",
        Name: "Load_Test",
        object: {
          object: {},
          String: "String",
          Object: {},
          Array: [],
        },
        TestActive: false,
        TestRunCounter: 0,
        InterceptorsTestActive: false,
        TrnScopeTestActive: false,
        clientActionsTestActive: false,
        clientActionsWithinHudTestActive: false,
        clientActionsNegativeTestActive: false,
        InterceptorActionsTest: false,
        InterceptorsTimeoutTestActive: false,
      });

    const testKey2 = await service.papiClient.addons.data
      .uuid(client.AddonUUID)
      .table("Load_Test")
      .upsert({
        Key: "testKey2",
        Name: "ADALTest",
        DateTime: "2021-09-26T15:15:02.991Z",
        object: {
          object: {
            string: "random string",
            number: 27,
            boolean: true,
          },
          String: "Red pill or Blue pill?",
          Array: [1, 2, 3, 4, 5],
        },
      });

    const testKey3 = await service.papiClient.addons.data
      .uuid(client.AddonUUID)
      .table("Load_Test")
      .upsert({
        Key: "testKey3",
        Name: "PerformenceTest",
        Duration: 41038.43857574463,
        bestRun: {
          cpasVersion: "16.70.4",
          nodeVersion: "0.3.5",
          Duration: 6602.255586981773,
        },
        lastRun: {
          cpasVersion: "16.80.7",
          nodeVersion: "0.4.7",
          Duration: 41038.43857574463,
        },
      });

    const JWTKey1 = await service.papiClient.addons.data
      .uuid(client.AddonUUID)
      .table("Load_Test")
      .upsert({
        Key: "JWTKey1",
        Name: "JWTExpiryTest",
        Token: "random-string",
      });

    for (const name of UDTArray) {
      await service.papiClient.metaData.userDefinedTables.upsert({
        TableID: name,
        MainKeyType: {
          ID: 0,
          Name: "Any",
        },
        SecondaryKeyType: {
          ID: 0,
          Name: "Any",
        },
      });
    }
  } catch (e) {
    console.log("cpi-node-automation::failed to install due to " + e);
    e instanceof Error
      ? (error = `Error : ${e.message} ||| Stack: ${e.stack}`)
      : null;
  }

  return {
    success: error === "none" ? true : false,
    resultObject: { error: error },
  };
};
exports.uninstall = async (client: Client, request: Request) => {
  return { success: true, resultObject: {} };
};
exports.upgrade = async (client: Client, request: Request) => {
  return { success: true, resultObject: {} };
};
exports.downgrade = async (client: Client, request: Request) => {
  return { success: true, resultObject: {} };
};
