import { UnidenCommandType } from "../../events/UnidenCommandType";
import { GetModelInfoResponse } from "./GetModelInfoResponse";
import { GetFirmwareVersionResponse } from "./GetFirmwareVersionResponse";

export const UnidenResponseRegistry = {
  [UnidenCommandType.GetModelInfo]: GetModelInfoResponse,
  [UnidenCommandType.GetFirmwareVersion]: GetFirmwareVersionResponse
};