import { UnidenScannerListener } from "./uniden/UnidenScannerListener";
import { UnidenEvent } from "./events/UnidenEvent";

// import SerialPort, { PortInfo } from 'serialport';

// async function getDeviceConnection(manufacturerName: string): Promise<PortInfo> {
//   const deviceList = await SerialPort.list();
//   const filteredList = deviceList.filter(device => device.manufacturer ? device.manufacturer.includes(manufacturerName): false);
//   if (filteredList.length < 1) throw Error(`Could not find device with a manufacturer ${manufacturerName}`)
//   return filteredList[0];
// }

// (async () => {
//   try {
//     const deviceConnection = await getDeviceConnection("UNIDEN AMERICA CORP.");
//     const port = new SerialPort(deviceConnection.comName, { autoOpen: false, baudRate: 57600 });

//     port.open(error => {
//       if (error) throw (error);
//     });
    
//     // The open event is always emitted
//     port.on("open", () => {
//       port.write("URC\r");
//       console.log("Connection has been opened!");
//     });

//     port.on("readable", () => {
//       console.log('Data:', port.read())
//     })
    
//     // Switches the port into "flowing mode"
//     port.on("data", (data: Buffer) => {
//       const response = data.toString();
//       console.log("Data-Res", response);
//       if (response === "URC,0\r") {
//         console.log("responding URC,1");
//         port.write("URC,1\r");
//       }
//     });

//   }
//   catch(error) {
//     console.error(error);
//   }
// })();

(async () => {
  const unidenListener = new UnidenScannerListener();
  unidenListener.on(UnidenEvent.ConnectionEstablished, () => {
    console.log("Connection established!");
    unidenListener.keepAlive();
  });
  unidenListener.on(UnidenEvent.ConnectionError, (error) => {
    console.error("Connection Error");
    console.error(error);
  });
  await unidenListener.start();
})();