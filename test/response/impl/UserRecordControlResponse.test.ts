import { UnidenResponseParser } from "../../../src/uniden/parser/UnidenResponseParser";

describe("UserRecordControlResponse", () => {
  test("Error", () => {
    const response = "URC,ERR,0001\r";
    const parsedResponse = UnidenResponseParser.parse(response);
    console.log(parsedResponse);
  });
});