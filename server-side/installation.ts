import { Client, Request } from "@pepperi-addons/debug-server";
import { PapiClient } from "@pepperi-addons/papi-sdk";
const CPI_NODE_ADDON_UUID = "bb6ee826-1c6b-4a11-9758-40a46acb69c5";
exports.install = async (client: Client, request: Request) => {
  // const papiClient = new PapiClient({
  //   baseURL: client.BaseURL,
  //   token: client.OAuthAccessToken,
  // });
  // await papiClient.addons.api
  //   .uuid(CPI_NODE_ADDON_UUID)
  //   .file("cpi_node")
  //   .func("files")
  //   .post(
  //     {},
  //     {
  //       AddonUUID: client.AddonUUID,
  //       Files: ["addon-cpi.js"],
  //       Version: request.body.ToVersion,
  //     }
  //   );
  // todo - create ADAL table
  return { success: true, resultObject: {} };
};
exports.uninstall = async (client: Client, request: Request) => {
  return { success: true, resultObject: {} };
};
exports.upgrade = async (client: Client, request: Request) => {
  // const papiClient = new PapiClient({
  //   baseURL: client.BaseURL,
  //   token: client.OAuthAccessToken,
  // });
  // await papiClient.addons.api
  //   .uuid(CPI_NODE_ADDON_UUID)
  //   .file("cpi_node")
  //   .func("files")
  //   .post(
  //     {},
  //     {
  //       AddonUUID: client.AddonUUID,
  //       Files: ["addon-cpi.js"],
  //       Version: request.body.ToVersion,
  //     }
  //   );
  return { success: true, resultObject: {} };
};
exports.downgrade = async (client: Client, request: Request) => {
  return { success: true, resultObject: {} };
};
