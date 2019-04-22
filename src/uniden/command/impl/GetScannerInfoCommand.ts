import { UnidenCommand } from "../UnidenCommand";
import { UnidenCommandType } from "../UnidenCommandType";

export class GetScannerInfoCommand extends UnidenCommand {

    constructor() {
        super(UnidenCommandType.GetScannerInfo);
    }

    protected getPayloadString(): string | null {
        return null;
    }

}