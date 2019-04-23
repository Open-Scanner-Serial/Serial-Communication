import { UnidenResponse } from "./UnidenResponse";

<<<<<<< HEAD
export class CreateSystemResponse extends UnidenResponse {
=======
export class GetFirmwareVersionResponse extends UnidenResponse {
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84

  public isValid(): boolean {
    if (this.rawValues.length < 3) return false;
    return true;
  }

<<<<<<< HEAD
  public getSystemID() {
=======
  public getVersion() {
>>>>>>> d0beb1dc79b0589336bca5e2713d2d0d1693dc84
    return this.rawValues[2].trimRight();
  }
}