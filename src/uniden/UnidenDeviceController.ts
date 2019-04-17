import SerialPort, { PortInfo } from "serialport";
import { EventEmitter } from "events";
import { UnidenCommand } from "./command/UnidenCommand";
import { UnidenResponse } from "./response/UnidenResponse";
import { UnidenResponseParser } from "./parser/UnidenResponseParser";

enum InternalEvent {
  DataTerminator = "data-terminator"
}

export class UnidenDeviceController extends EventEmitter {

  public readonly portInfo: PortInfo;
  private readonly connection: SerialPort;

  private currentOutput: string;

  constructor(portInfo: PortInfo) {
    super();

    this.portInfo = portInfo;
    this.connection = new SerialPort(portInfo.comName, { autoOpen: false, baudRate: 15200 });
    this.currentOutput = "";
  }

  public async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.on("open", () => resolve());
      this.connection.open(error => reject(error));
    });
  }

  public listen(): void {
    this.connection.on("data", (data: Buffer) => {
      const response = data.toString();
      this.currentOutput += response;
      if (response.endsWith("\r")) {
        this.emit(InternalEvent.DataTerminator);
      }
    });
  }

  public async issueCommand<R extends UnidenResponse>(command: UnidenCommand): Promise<R> {
    return new Promise<R>(((resolve, reject) => {
      if (!this.connection.isOpen) reject("Cannot issue command: connection not open");

      this.connection.write(command.toString(), error => { if (error) reject(error) });

      this.on(InternalEvent.DataTerminator, () => {
        const response = this.currentOutput;
        this.currentOutput = "";
        resolve(UnidenResponseParser.parse(response) as R);
      });

    }));
  }

  public async disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.on("close", () => resolve());
      this.connection.close(error => reject(error));
    });
  }

}