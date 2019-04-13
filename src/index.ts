import SerialPort from "serialport"

export class WhistlerDevice {

    private port?: SerialPort;

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

    private readMessage() {
        //this.port.on('readable', () => {
        //    console.log(this.port.read());
        //});
    }

    private charToByte(char: string) {
        var bytes = char.charCodeAt(0).toString(16);
        return bytes
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

    public getActiveChannelInformatino() {
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

//var device = new WhistlerDevice('COM7', 15200, true);

//console.log(device.charToByte('K'));


