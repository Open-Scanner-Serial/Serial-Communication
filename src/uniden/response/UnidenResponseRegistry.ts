import { GetModelInfoResponse } from "./GetModelInfoResponse";
import { GetFirmwareVersionResponse } from "./GetFirmwareVersionResponse";
import { UnidenCommandType } from "../command/UnidenCommandType";

export const UnidenResponseRegistry = {
  [UnidenCommandType.GetModelInfo]: GetModelInfoResponse,
  [UnidenCommandType.GetFirmwareVersion]: GetFirmwareVersionResponse
};