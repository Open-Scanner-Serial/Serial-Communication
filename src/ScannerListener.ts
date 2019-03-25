export interface ScannerListener<C,R> {
  start(): Promise<void>;
  stop(): Promise<void>;
  write(command: C): Promise<any>;
  read(): Promise<R|null>;
}