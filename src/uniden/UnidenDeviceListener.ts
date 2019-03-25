import { EventEmitter } from "events";
import SerialPort, { PortInfo } from "serialport";

import { ScannerListener } from "../ScannerListener";
import { ConnectionUtils } from "../utilities/ConnectionUtils";
import { UnidenEvent } from "../events/UnidenEvent";
import { UnidenCommand } from "./command/UnidenCommand";
import { UnidenResponse } from "./response/UnidenResponse";
import { UnidenResponseParser } from "./parser/UnidenResponseParser";

export class UnidenDeviceListener extends EventEmitter implements ScannerListener<UnidenCommand,UnidenResponse> {

  private deviceConnectionInfo?: PortInfo;
  private deviceConnection?: SerialPort;

  constructor() {
    super();
  }

  private openDeviceConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.deviceConnection) {
        reject("Attempting to open device connection before instantiation");
        return;
      }

      this.deviceConnection.on("open", (error) => {
        error ? reject(error) : resolve();
      });

      this.deviceConnection.open();
    });
  }

  private closeDeviceConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.deviceConnection) {
        reject("Attempting to close device connection before instantiation");
        return;
      }

      this.deviceConnection.close(error => {
        error ? reject(error) : resolve();
      });
    });
  }

  public async start(): Promise<void> {
    try {
      this.deviceConnectionInfo = await ConnectionUtils.getDeviceConnection("UNIDEN");
      this.deviceConnection = new SerialPort(this.deviceConnectionInfo.comName, { autoOpen: false });
      await this.openDeviceConnection();

      this.emit(UnidenEvent.ConnectionEstablished, this.deviceConnectionInfo);
    }
    catch (error) {
      this.emit(UnidenEvent.ConnectionError, error);
    }
  }
  
  public async stop(): Promise<void> {
    await this.closeDeviceConnection();
  }

  private writeToDevice(data: string): Promise<number> {
    return new Promise(((resolve, reject) => {
      if (!this.deviceConnection) {
        reject("Attempting to write to device connection before instantiation");
        return;
      }
      this.deviceConnection.write(data, (error, bytesWritten) => {
        console.log(bytesWritten);
        error ? reject(error) : resolve(bytesWritten);
      });
    }));
  }

  public async write(command: UnidenCommand): Promise<number> {
    console.log(command.toString());
    return await this.writeToDevice(command.toString());
  }

  private readFromDevice(): Promise<string|null> {
    return new Promise((resolve, reject) => {
      if (!this.deviceConnection) {
        reject("Attempting to read from device connection before instantiation");
        return;
      }

      let message = "";

      while (true) {
        const rawResult = this.deviceConnection.read();
        if (!rawResult) {
          resolve(null);
          break;
        }

        const result = rawResult.toString();

        if (result === "\r") break;

        message += result;
      }

      resolve(message);

    });
  }

  public async read(): Promise<UnidenResponse|null> {
    const responseMessage = await this.readFromDevice();
    if (!responseMessage) return null;
    return UnidenResponseParser.parse(responseMessage);
  }

}