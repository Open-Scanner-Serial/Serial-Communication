import { ConnectionUtils } from "./uniden/utilities/ConnectionUtilities";
import { UnidenDeviceController } from "./uniden/UnidenDeviceController";
import { GetScannerInfoCommand } from "./uniden/command/impl/GetScannerInfoCommand";
import {GetScannerInfoResponse} from "./uniden/response/GetScannerInfoResponse";

(async () => {
  try {
    const portInfo = await ConnectionUtils.getDevicePortInfo("UNIDEN AMERICA CORP.");
    const controller = new UnidenDeviceController(portInfo);
    await controller.connect();
    controller.listen();

    const command = new GetScannerInfoCommand();
    const response = await controller.issueCommand<GetScannerInfoResponse>(command);
    console.log(response);
    // if (response.success) {
    //   console.log("Recording started!");
    // }
    // else {
    //   console.error("Recording could not be started");
    //   console.error(response.error);
    // }
    //
    // setTimeout(async () => {
    //   const command2 = new UserRecordControlCommand(UserRecordControlStatus.Stop);
    //   const response2 = await controller.issueCommand<UserRecordControlResponse>(command2);
    //   console.log(response2.success ? "Stopped" : "Could not stop");
    //
    //   await controller.disconnect();
    //   console.log("disconnected");
    // },5000);
    //

  }
  catch(error) {
    console.error(error);
    process.exit(1);
  }
})();