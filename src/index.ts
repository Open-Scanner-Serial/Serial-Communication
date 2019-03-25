import { UnidenDeviceListener } from "./uniden/UnidenDeviceListener";
import { GetModelInfoCommand } from "./uniden/command/GetModelInfoCommand";

(async () => {
  const listener = new UnidenDeviceListener();
  try {
    await listener.start();
    const bytes = await listener.write(new GetModelInfoCommand());
    console.log(bytes);
    const response = await listener.read();
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
  finally {
    await listener.stop();
  }
})();