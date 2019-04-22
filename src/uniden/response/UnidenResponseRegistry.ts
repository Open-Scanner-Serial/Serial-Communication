import { GetModelInfoResponse } from "./GetModelInfoResponse";
import { GetFirmwareVersionResponse } from "./GetFirmwareVersionResponse";
import { UnidenCommandType } from "../command/UnidenCommandType";
import {UserRecordControlResponse} from "./UserRecordControlResponse";
import {GetScannerInfoResponse} from "./GetScannerInfoResponse";

export const UnidenResponseRegistry = {
  [UnidenCommandType.GetModelInfo]: GetModelInfoResponse,
  [UnidenCommandType.GetFirmwareVersion]: GetFirmwareVersionResponse,
  [UnidenCommandType.UserRecordControl]: UserRecordControlResponse,
  [UnidenCommandType.GetScannerInfo]: GetScannerInfoResponse
};