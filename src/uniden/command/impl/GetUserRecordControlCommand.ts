import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class GetUserRecordControlCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.UserRecordControl);
  }

  protected getPayloadString(): string {
    return "";
  }

}