import { UnidenResponse } from "./UnidenResponse";

export class GetFirmwareVersionResponse extends UnidenResponse {

  isValid(): boolean {
    return false;
  }

}