import SerialPort from "serialport"

export class WhistlerDevice {

    private port: SerialPort;

    constructor(_port: string, _baudrate: number) {
        this.port = new SerialPort(_port, {
            baudRate: _baudrate
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

        for (i; i < command.length, i++) {
            message[i+1] = command[i];
        }

        i++;
        message[i] = 0x03;
        i++;
        message[i] = this.calculateChecksum(message);
        i++;
        message[0] = 0x02;
        this.port.write(Buffer.from(message.slice(0,i)));
    }

    private readMessage() {
        this.port.on('readable', () => {
            console.log(this.port.read());
        });
    }

    public getVersion() {
        this.writeMessage([0x50]);
        this.readMessage();
    }

    public goMenu() {
        this.writeMessage([0x4B, 17])
    }
}

