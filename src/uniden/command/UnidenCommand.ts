import { UnidenCommandType } from "./UnidenCommandType";

export abstract class UnidenCommand {

  protected readonly type: UnidenCommandType;

  protected constructor(type: UnidenCommandType) {
    this.type = type;
  }

  protected abstract getPayloadString(): string;

  public toString(): string {
    return `${this.type}\r`;
  }

}