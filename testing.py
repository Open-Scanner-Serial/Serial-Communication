import serial.tools.list_ports


def get_live_ports():
    ports = serial.tools.list_ports.comports()
    return ports


def main():
    ports = get_live_ports()
    for i, v in enumerate(ports):
        print("{}: {}".format(i, v.device))

    input_port = int(input("Serial port: "))
    port = serial.Serial(port=ports[input_port].device, baudrate=15200, timeout=0.5)

    buffer = bytearray()
    buffer.append(0x02) # start character

    command = bytearray()
    command.append(0x50) # test command to get power status 
    command.append(0x03) # end character
    command.append(sum(command)) # add the checksum

    buffer += command # add the command to the buffer

    port.write(buffer)

    result = []
    result = port.read(15)
    print(result)


if __name__ == "__main__":
    main()
    
