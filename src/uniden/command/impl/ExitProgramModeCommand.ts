import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class ExitProgramModeCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.ExitProgramMode);
  }

  protected getPayloadString(): string | null {
    return null;
  }

}