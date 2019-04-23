import { UnidenResponse } from "./UnidenResponse";

<<<<<<< HEAD
export class GetSystemInfoResponse extends UnidenResponse {
=======
export class GetSystemInfo extends UnidenResponse {
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84

  public isValid(): boolean {
    if (this.rawValues.length < 3) return false;
    return true;
  }

<<<<<<< HEAD
=======
  public getSystemInfo() {
    return this.rawValues;
  }
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84
}