import { UnidenResponse } from "./UnidenResponse";

export enum UserRecordControlResponseStatus {
  Success = "OK",
  Error = "ERR"
}

export enum UserRecordControlResponseError {
  FileAccessError = "0001",
  LowBattery = "0002",
  SessionOverLimit = "0003",
  RTCLost = "0004"
}

export class UserRecordControlResponse extends UnidenResponse {

  public isValid(): boolean {
    return false;
  }

  public get success(): boolean {
    return false;
  }

  public get error(): UserRecordControlResponseError | null {
    return null;
  }



}