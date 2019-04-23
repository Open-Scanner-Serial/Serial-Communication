import { UnidenResponse } from "./UnidenResponse";

export enum SetSystemInfoReponseStatus {
  Success = "OK",
  Error = "NG"
}


<<<<<<< HEAD
export class SetSystemInfoResponse extends UnidenResponse {

  public isValid(): boolean {
    return true;
  }


=======
export class SetSystemInfoResponseResponse extends UnidenResponse {

  public isValid(): boolean {
    return false;
  }

  public get success(): boolean {
    return false;
  }
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84

}