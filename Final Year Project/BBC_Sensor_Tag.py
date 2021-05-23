#Author: Emmanuel Akinrintoyo

import time
from bluezero import microbit

try:
    #Create an instance to establish a connection with a BBC micro:bit
    #adapter_addr = Raspberry Pi's MAC address
    #device_addr = Micro:bit's MAC address
    ubit = microbit.Microbit(adapter_addr='B8:27:EB:11:1E:6E', device_addr='C5:6A:76:43:BC:4D') 
    
except:
    #Create a log if the connection is unsucessful
    file = open("/home/pi/Desktop/errorlog.txt", "w")
    file.write("Connection to the micro:bit was unsuccessful!")
    file.close()
	 
	 
	while True: #Loop continually
        ubit.connect() #Connect to the microbit
	 
	    x, y, z = ubit.accelerometer #Read the accelemoter values for the 3 coordinates
	    print("x: ", x, "y: ", y, "z: ", z) #Print the values
	 
	    temperatureReading = ubit.temperature #Read the temperature value
	    print('Temperature:', temperatureReading) #Print the temperature value
	    print("\n") #Insert a new line
	 
	    time.sleep(1) #Add a 1 second delay
	    ubit.disconnect() #Disconnect from the micro:bit
