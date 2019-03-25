import { UnidenResponse } from "../response/UnidenResponse";
import { UnidenCommandUtilities } from "../utilties/UnidenCommandUtilities";
import { UnidenResponseRegistry } from "../response/UnidenResponseRegistry";
import { UnidenCommandType } from "../../events/UnidenCommandType";

const ResponseRegex = /([^,;]+),([^,;]+)(,(.+))?/;

export class UnidenResponseParser {

  public static parse(rawResponse: string): UnidenResponse {
    const groupedResponse = rawResponse.match(ResponseRegex);
    if (!groupedResponse || groupedResponse.length < 3) throw Error(`Response too short ${groupedResponse ? groupedResponse.length : 0}`);

    if (!UnidenCommandUtilities.isValidCommand(groupedResponse[1])) throw Error(`Invalid response type ${groupedResponse[1]}`);

    const command = groupedResponse[1] as UnidenCommandType;

    if (!UnidenResponseRegistry[command]) throw Error(`Response valid but not in registry ${command}`);

    const response =  new UnidenResponseRegistry[command](command, groupedResponse);
    if (!response.isValid()) throw Error(`Response payload was not valid for ${command}`);

    return response;
  }

}