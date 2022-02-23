import '@pepperi-addons/cpi-node'
import Tester from "./tester";
import generalService from "./services/general.service";
import  DataService, {
  OCEvents,
  GENERIC_DATA_VIEWS,
  accounDataArr,
  fieldTypeObj,
  screenSize,
  addonUUID,
  adalTableName,
} from "./services/data.service";

export async function load(configuration: any) {
    console.log('Scripts Load finished');
    // Put your cpi side code here
}

