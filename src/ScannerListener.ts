export interface ScannerListener<C> {
  start(): Promise<void>;
  stop(): Promise<void>;
  write(command: C): Promise<any>;
}