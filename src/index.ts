import SerialPort from "serialport"
import {awaitExpression} from "@babel/types";

export enum key {
  Menu = 17,
  PlaySelPause = 9,
  Skip = 1,
  WX = 3,
  Att = 15,
  Down = 10,
  Up = 8,
  Right = 2,
  Left = 16,
  PRI = 5,
  Fn = 12,
  Decimal = 19,
  One = 29,
  Two = 22,
  Three = 30,
  Four = 23,
  Five = 31,
  Six = 24,
  Seven = 32,
  Eight = 25,
  Nine = 33,
  Zero = 26,
  KnobCW = 40,
  KnobCCW = 41,
  KnobPush = 43,
  Power = 44
}

export class WhistlerDevice {

    private port: SerialPort;

    private currentOutput?: any;
    private currentOutputCallback?: () => any;

    constructor(_port: string, _baudrate: number) {
            this.port = new SerialPort(_port, {
                baudRate: _baudrate, autoOpen: true
            });
            this.port.on("data", (data:any) => {
              this.currentOutput = data;
              if (this.currentOutputCallback) this.currentOutputCallback();
            });
    }

    private add(sum: number, num: number) {
        return sum + num;
    }

    private calculateChecksum(message: Uint8Array) {
        return message.reduce(this.add);
    }

    private writeMessage(command: number[]) {
        var message = new Uint8Array(15);
        message[0] = 0x00;
        var i = 0;

        for (i; i < command.length; i++) {
            message[i+1] = command[i];
        }

        i++;
        message[i] = 0x03;
        i++;
        message[i] = this.calculateChecksum(message);
        i++;
        message[0] = 0x02;
        //this.port.write(Buffer.from(message.slice(0,i)));
    }

    private async readMessage() {
      return new Promise<any>(((resolve, reject) => {
        try {
          this.currentOutputCallback = () => {
            const output = this.currentOutput;
            this.currentOutputCallback = undefined;
            this.currentOutput = undefined;
            resolve(output);
          };
          this.port.read();
        }
        catch (e) {
          reject(e);
        }
      }));
    }


    /**public charToByte(command: string[]) {
        var bytes = new Uint8Array(command.length);
        for (var i = 0; i < command.length; i++) {
            bytes[i] = parseInt(command[i].charCodeAt(0).toString(16));
        }
        return bytes
    }**/

    public getCCDumpMessage(content: string) {
        let contentList = content.split(":");
        let type = contentList[0];
        switch(type) {
            case "P25":
                let system = contentList[1].substr(1, contentList[1].length);
                let siteID = contentList[2].substr(1, contentList[2].length);
                let controlChannel = contentList[3].substr(2, contentList[3].length);
                let subType = contentList[4];
                if (subType == "P25TSBK" || subType == "P25ES" || subType == "P25LC"
                    || subType == "LCTG" || subType == "P25HDU") {
                        let ccData = contentList[5].split(" ");
                } else if (subType == "P25PDU") {
                    let ccData = contentList[5].split(":");
                }
                break;
            case "MOT":
                subType = contentList[4];
                let ccData = contentList[5];
                break;
            case "LTR":
                ccData = contentList[4];
                break;
            case "ED":
                ccData = contentList[4];
                break;
            case "WXS":
                subType = contentList[1];
                let channel = contentList[2].substr(1, contentList[2].length);
                ccData = contentList[3];
                break;
            case "WXT":
                ccData = contentList[2];
                break;

        }
    }

    public sendKey(button: key) {

        this.writeMessage([0x4B, button])
    }

    public goMenu() {
        this.writeMessage([0x4B, 17]);
    }

    public getStatus() {
        this.writeMessage([0x41]);
    }

    public getLCD() {
        this.writeMessage([0x4C]);
    }

    public getActiveChannelInformation() {
        this.writeMessage([0x61]);
        let message = this.readMessage();

    }

    public getPowerStatus() {
        this.writeMessage([0x50]);
    }

    public getVersion() {
        this.writeMessage([0x56, 0x00]);
    }

    private setCCDump(status: number) {
        this.writeMessage([0x43, status]);
    }

    public setCCDumpOn()  {
        this.setCCDump(1);
    }

    public setCCDumpOff() {
        this.setCCDump(0);
    }


    public readCCDump() {
        var message = this.readMessage().toString();
        return this.getCCDumpMessage(message);
    }

}

(async () => {
  var device = new WhistlerDevice('COM7', 15200);
  const response = await device.getLCD();
  console.log(response);
})();


