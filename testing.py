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
    buffer.append(0x02)

    command = bytearray()
    command.append(0x50)
    command.append(0x03)
    command.append(sum(command))

    buffer += command

    port.write(buffer)

    result = []
    result = port.read(15)
    print(result)


if __name__ == "__main__":
    main()
    