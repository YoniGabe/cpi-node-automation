import MyService from "./my.service";
import { Client, Request } from "@pepperi-addons/debug-server";

// add functions here
// this function will run on the 'api/foo' endpoint
// the real function is runnning on another typescript file
export async function foo(client: Client, request: Request) {
  const service = new MyService(client);
  const res = await service.getAddons();
  return res;
}

export async function createCPISession(client: Client, request: Request) {
  const service = new MyService(client);
  const atdID = 136452;
  const webAPIBaseURL = await service.getWebAPIBaseURL();
  const accessToken = await service.getAccessToken(webAPIBaseURL);
  const pepperiClientAPI = await service.getPepperiClientAPI(
    webAPIBaseURL,
    accessToken
  );
  const transactionUUID = await service.createTransaction(
    webAPIBaseURL,
    accessToken,
    pepperiClientAPI,
    atdID
  );
  const trigger = await service.triggerEvent(
    accessToken,
    transactionUUID,
    webAPIBaseURL,
    "DeliveryDate",
    "2021-5-28",
    "SetFieldValue"
  ); //need to replace stubs
  
  //need to add request to go to homepage for sync
  const sync = await service.initSync(accessToken, webAPIBaseURL);
  console.log(sync);
}

// //ignore the below
// async function createCPISession(client: Client, webappVersion: string) {
//   //create new bearer token
//   //create session at lihi
//   //create transaction and transaction lines - possibly creating one via api for UUID
//   //trigger event (fingers crossed)

//   const service = new MyService(client);
//   const bearerToken = await service.getBearerToken();

//   //need to add more headers and parse environment and webapp version.
//   const sessionToken = await fetch(
//     "https://webapi.sandbox.pepperi.com/V16_55/WebApp_232/Service1.svc/v1/CreateSession",
//     {
//       method: "POST",
//       headers: {
//         "content-type": "application/json;charset=UTF-8",
//       },
//       body: JSON.stringify({
//         accessToken: bearerToken,
//         culture: "en-US",
//         timeZoneDiff: 10800,
//       }),
//     }
//   );

//   const transactionExternalID =
//     "Automated CPINode Transaction" +
//     Math.floor(Math.random() * 1000000).toString();
//   const transactionObj = {
//     ExternalID: transactionExternalID,
//     ActivityTypeID: 136452, //will fix later
//     Status: 1,
//     Account: {
//       Data: {
//         InternalID: 21128558, //will fix later
//       },
//     },
//     Catalog: {
//       Data: {
//         ExternalID: "Default Catalog", //will fix later
//       },
//     },
//   };

//   const createdTransactionOnCPI = await service.initNewTransaction(
//     transactionObj
//   );

// }
