import { UnidenCommand } from "./UnidenCommand";
import { UnidenCommandType } from "../../events/UnidenCommandType";

export class GetModelInfoCommand extends UnidenCommand {

  constructor() {
    super(UnidenCommandType.GetModelInfo);
  }

  protected getPayloadString(): string {
    return "";
  }

}