import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class GetModelInfoCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.GetModelInfo);
  }

  protected getPayloadString(): string | null {
    return null;
  }

}