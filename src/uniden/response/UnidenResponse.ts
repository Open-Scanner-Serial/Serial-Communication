import { UnidenCommandType } from "../../events/UnidenCommandType";

export abstract class UnidenResponse {

  protected readonly command: UnidenCommandType;
  protected readonly rawValues: RegExpMatchArray;

  constructor(command: UnidenCommandType, rawValues: RegExpMatchArray) {
    this.command = command;
    this.rawValues = rawValues;
  }

  public abstract isValid(): boolean;

}