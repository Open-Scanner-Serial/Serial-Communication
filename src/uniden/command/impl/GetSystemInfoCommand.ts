import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";



<<<<<<< HEAD
export class GetSystemInfoCommand extends UnidenCommand {
=======
export class GetSystemInfo extends UnidenCommand {
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84

  constructor() {
    super(UnidenCommandType.GetSystemInfo);
  }

  protected getPayloadString(): null {
    return null;
  }
}