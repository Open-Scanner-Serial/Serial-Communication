import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export enum CreateSystemType {
  Conventional = "CNV",
  Motorola = "MOT",
  EDACS = "EDC",
  EDACSSCAT = "EDS",
  LTR = "LTR",
  P25Standard = "P25S",
  P25OneFreq = "P25F"
}

export enum ProtectBitStatus {
  Off = 0,
  On = 1
}

export class CreateSystemCommand extends UnidenCommand {

  private readonly systemType: CreateSystemType;
  private readonly protect: ProtectBitStatus;

  constructor(systemType: CreateSystemType, protect: ProtectBitStatus) {
    super(UnidenCommandType.UserRecordControl);
    this.systemType = systemType;
    this.protect = protect;
  }

  protected getPayloadString(): string | null {
    return `${this.systemType}${this.protect}`;
  }
}