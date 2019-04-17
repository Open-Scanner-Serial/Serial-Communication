import { GetModelInfoResponse } from "./GetModelInfoResponse";
import { GetFirmwareVersionResponse } from "./GetFirmwareVersionResponse";
import { UnidenCommandType } from "../command/UnidenCommandType";
import { UserRecordControlResponse } from "./UserRecordControlResponse";

export const UnidenResponseRegistry = {
  [UnidenCommandType.GetModelInfo]: GetModelInfoResponse,
  [UnidenCommandType.GetFirmwareVersion]: GetFirmwareVersionResponse,
  [UnidenCommandType.UserRecordControl]: UserRecordControlResponse
};