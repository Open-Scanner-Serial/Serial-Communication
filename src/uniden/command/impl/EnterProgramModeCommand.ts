import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class EnterProgramModeCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.EnterProgramMode);
  }

  protected getPayloadString(): string | null {
    return null;
  }

}