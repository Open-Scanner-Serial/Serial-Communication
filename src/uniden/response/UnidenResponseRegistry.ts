import { GetModelInfoResponse } from "./GetModelInfoResponse";
import { GetFirmwareVersionResponse } from "./GetFirmwareVersionResponse";
import { UnidenCommandType } from "../command/UnidenCommandType";
import {UserRecordControlResponse} from "./UserRecordControlResponse";
import {GetScannerInfoResponse} from "./GetScannerInfoResponse";
import {SetSystemInfoResponse} from "./SetSystemInfoResponse";
import {GetSystemInfoResponse} from "./GetSystemInfoResponse";
import {CreateSystemResponse} from "./CreateSystemResponse";
import {EnterProgramModeResponse} from "./EnterProgramModeResponse";
import {ExitProgramModeResponse} from "./ExitProgramModeResponse";

export const UnidenResponseRegistry = {
  [UnidenCommandType.GetModelInfo]: GetModelInfoResponse,
  [UnidenCommandType.GetFirmwareVersion]: GetFirmwareVersionResponse,
  [UnidenCommandType.UserRecordControl]: UserRecordControlResponse,
  [UnidenCommandType.GetScannerInfo]: GetScannerInfoResponse,
  [UnidenCommandType.SetSystemInfo]: SetSystemInfoResponse,
  [UnidenCommandType.GetSystemInfo]: GetSystemInfoResponse,
  [UnidenCommandType.CreateSystem]: CreateSystemResponse,
  [UnidenCommandType.EnterProgramMode]: EnterProgramModeResponse,
  [UnidenCommandType.ExitProgramMode]: ExitProgramModeResponse
};