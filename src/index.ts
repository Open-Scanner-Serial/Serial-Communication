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

    constructor(_port: string, _baudrate: number, debug: boolean) {
        if (!debug) {

            this.port = new SerialPort(_port, {
                baudRate: _baudrate
            });
        }
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
      await this.port.on('readable', () => {
        return this.port.read();
      });

    }

    /**public charToByte(command: string[]) {
        var bytes = new Uint8Array(command.length);
        for (var i = 0; i < command.length; i++) {
            bytes[i] = parseInt(command[i].charCodeAt(0).toString(16));
        }
        return bytes
    }**/

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


}

var device = new WhistlerDevice('COM7', 15200, true);

console.log(device.charToByte(['K']));


