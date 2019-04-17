import { ConnectionUtils } from "./uniden/utilities/ConnectionUtilities";
import { UnidenDeviceController } from "./uniden/UnidenDeviceController";
import { UserRecordControlCommand, UserRecordControlStatus } from "./uniden/command/impl/UserRecordControlCommand";
import { UserRecordControlResponse } from "./uniden/response/UserRecordControlResponse";

(async () => {
  try {
    const portInfo = await ConnectionUtils.getDevicePortInfo("UNIDEN AMERICA CORP.");
    const controller = new UnidenDeviceController(portInfo);
    await controller.connect();
    controller.listen();

    const command = new UserRecordControlCommand(UserRecordControlStatus.Start);
    const response = await controller.issueCommand<UserRecordControlResponse>(command);
    if (response.success) {
      console.log("Recording started!");
    }
    else {
      console.error("Recording could not be started");
      console.error(response.error);
    }

    await controller.disconnect();
    console.log("disconnected");

  }
  catch(error) {
    console.error(error);
    process.exit(1);
  }
})();