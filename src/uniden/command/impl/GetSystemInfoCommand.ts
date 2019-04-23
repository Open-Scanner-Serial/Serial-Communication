import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";



export class GetSystemInfoCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.GetSystemInfo);
  }

  protected getPayloadString(): null {
    return null;
  }
}