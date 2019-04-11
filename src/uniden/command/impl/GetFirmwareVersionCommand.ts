import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class GetFirmwareVersionCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.GetFirmwareVersion);
  }

  protected getPayloadString(): string {
    return "";
  }

}