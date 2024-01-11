import time
import serial
import serial.tools.list_ports
import paho.mqtt.client as mqtt
import threading
import json

def serial_read_thread() :
    try:
        while True:
            read_data = my_serial.readline()
            if read_data :
                serial_receive_data = read_data.decode()
                print(serial_receive_data, end="")
                serial_receive_data_list = serial_receive_data[1:-3].split(',')
                
                serial_receive_data_dict = {}
                ch = 0
                
                for val in serial_receive_data_list:
                    serial_receive_data_dict[str(ch)] = int(val)
                    ch += 1
                # chairData = str(serial_receive_data_dict)
                print(json.dumps(serial_receive_data_dict))
                chairData = json.dumps(serial_receive_data_dict)
                pub.publish("serial_receive_data", chairData)
    except KeyboardInterrupt:
        pub.disconnect()
        my_serial.close()

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

if __name__ == '__main__':
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if 'Arduino Uno' in p.description:
            print(f"{p} 포트에 연결하였습니다.")
            my_serial = serial.Serial(p.device, baudrate=115200, timeout=1.0)
            time.sleep(2.0)

    pub = mqtt.Client("py_publisher") 
    pub.connect("192.168.0.45", 1883)
    pub.on_connect = on_connect

    t1 = threading.Thread(target=serial_read_thread)
    t1.daemon = True
    t1.start()
    
    pub.loop_forever()
    