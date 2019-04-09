import { ConnectionUtils } from "./uniden/utilities/ConnectionUtilities";
import { UnidenDeviceController } from "./uniden/UnidenDeviceController";
import { GetModelInfoCommand } from "./uniden/command/impl/GetModelInfoCommand";
import { GetModelInfoResponse } from "./uniden/response/GetModelInfoResponse";

(async () => {
  try {
    const portInfo = await ConnectionUtils.getDevicePortInfo("UNIDEN AMERICA CORP.");
    const controller = new UnidenDeviceController(portInfo);
    await controller.connect();
    controller.listen();
    console.log("connected");

    const response = await controller.issueCommand(new GetModelInfoCommand()) as GetModelInfoResponse;
    console.log(response.getModel());

    await controller.disconnect();
    console.log("disconnected");

  }
  catch(error) {
    console.error(error);
    process.exit(1);
  }
})();