import convertXml from "xml-js";

import { UnidenResponse } from "./UnidenResponse";
export class GetScannerInfoResponse extends UnidenResponse {

  public isValid(): boolean {
    return true;
  }

}