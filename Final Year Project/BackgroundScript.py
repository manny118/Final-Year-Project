#Author: Emmanuel Akinrintoyo
#shutils can be used to move files or folders
#! /usr/local/bin/python3.8

#Python libraries
import shutil
import os
from os import path
from subprocess import run as run
import threading


file = 'BlocklyScript.py' #Downloaded script from Blockly
destination = "/home/pi/Desktop/Project/Week3_1/ouimeaux-env" #Execution folder path
source = "/home/pi/Downloads/" + file #Downloads folder path

isExecuting = False #Stores the execution status of the program


#A function that tracks the downloads folder.
#It moves a downloaded BlocklyScript.py to the execution folder.
def trackDownloads():
    
    global isExecuting
    isExecuting = False
    
    while True: #loops continuously
        fileFound = path.exists("/home/pi/Downloads/BlocklyScript.py")
        if fileFound == False:
            continue #Return to the while loop condition
        
        elif fileFound == True and isExecuting == True:
            threadLock.acquire() #Block the execution thread from running
        
            isExecuting = True #Store the execution state
            moveScript() #Move the new script to the execution folder

            threadLock.release() #Release the execution thread
            continue #Return to the while loop condition
                        
        else:
            moveScript() #Move the new script to the execution folder
            isExecuting = True  #Store the execution state
            continue  #Return to the while loop condition


#A function that accepts the file path of a script to be deleted
def deleteScript(filePath):
    os.remove(filePath)


#A function that moves a downloaded script to the execution folder
def moveScript():
    filePresent = path.exists("/home/pi/Desktop/Project/Week3_1/ouimeaux-env/BlocklyScript.py")
    if filePresent == True: #Check if the file is in the execution folder
        deleteScript("/home/pi/Desktop/Project/Week3_1/ouimeaux-env/BlocklyScript.py") #Delete the file
          
    shutil.move(source, destination) #Move the script to the execution folder


#A function that executes a BlocklyScript.py script in the execution folder
def executeScript():
    
    while True: #loops continuously
        fileFound = path.exists("/home/pi/Desktop/Project/Week3_1/ouimeaux-env/BlocklyScript.py")
        
        if fileFound == False: #Verify that there is a BlocklyScript.py script in the execution folder
            isExecuting = False #Store the execution state
            continue #Return to the while loop condition
        
        else:
            run(["python3.8", "/home/pi/Desktop/Project/Week3_1/ouimeaux-env/BlocklyScript.py"])            
            isExecuting = True #when present in execution folder at start up
            continue #Return to the while loop condition
 

threadLock = threading.Lock() #initialises the thread lock


trackFolderThread = threading.Thread(target=trackDownloads) #sets the trackDownloads function
executeScriptThread = threading.Thread(target=executeScript) #sets the executeScript function

trackFolderThread.start()  #starts the trackFolderThread thread
executeScriptThread.start() #starts the executeScriptThread thread

executeScriptThread.join() #Wait for the executeScriptThread to complete execution
trackFolderThread.join()   #Wait for the trackFolderThread to complete execution




