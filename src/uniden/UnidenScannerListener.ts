import { EventEmitter } from "events";
import SerialPort, { PortInfo } from "serialport";

import { UnidenCommand } from "../events/UnidenCommand";

import { ScannerListener } from "../ScannerListener";
import { ConnectionUtils } from "../utilities/ConnectionUtils";
import { UnidenEvent } from "../events/UnidenEvent";

const KEEP_ALIVE_INTERVAL_MS = 100;

export class UnidenScannerListener extends EventEmitter implements ScannerListener<UnidenCommand> {

  private deviceConnectionInfo?: PortInfo;
  private deviceConnection?: SerialPort;

  private keepAlivePid?: NodeJS.Timeout;

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

  public keepAlive(): void {
    this.keepAlivePid = setInterval(() => {
      
    }, KEEP_ALIVE_INTERVAL_MS);
  }
  
  public async stop(): Promise<void> {
    if (this.keepAlivePid) clearInterval(this.keepAlivePid);
    await this.closeDeviceConnection();
  }
  
  public async write(command: UnidenCommand): Promise<any> {
    throw new Error("Method not implemented.");
  }

}