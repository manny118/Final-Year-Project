//Author: Emmanuel Akinrintoyo
//This script contains the block definitions and generator stub code for the custom blocks.
//When a custom block is added in the graphical mode, the corresponding code is generated.

// Block definition for the "turn switch on" block
Blockly.Blocks['turn_wemo_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn switch on");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
  this.setTooltip("Turns the Wemo switch on.");
  }
};

//Generator stub for the "turn switch on" block
Blockly.Python['turn_wemo_on'] = function(block) {

  // Assemble Python into code variable.
  var code = 'turnWemoOn()\n';

  return code; // Return the Python code
};


// Block definition for the "turn switch off" block
Blockly.Blocks['turn_wemo_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn switch off");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
  this.setTooltip("Turns the Wemo switch off.");
  }
};

//Generator stub for the "turn switch off" block
Blockly.Python['turn_wemo_off'] = function(block) {

  // Assemble Python into code variable.
  var code = 'turnWemoOff()\n';
  return code; // Return the Python code
};

// Block definition for the switch condition block
Blockly.Blocks['condition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("switch is "), "NAME")
        .appendField(new Blockly.FieldDropdown([["on","on"], ["off","off"]]), "switchOption");
    this.setOutput(true, null);
    this.setColour(180);
  this.setTooltip("Checks if the switch on or off.");
  }
};


// Generator stub for the switch condition block
 Blockly.Python['condition'] = function(block) {
  
  var dropdown_switchoption = block.getFieldValue('switchOption');
  
  // Assemble Python into code variable.
  var code = '';

  // Check the selected input
  if(dropdown_switchoption == "on"){
    code = 'checkSwitchStateOn()';
  }

  else if(dropdown_switchoption == "off"){
    code = 'checkSwitchStateOff()';
  }

  return [code, Blockly.Python.ORDER_NONE]; // Return the Python code
};


// Block definition for the "on switch on" block
Blockly.Blocks['on_switch_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("on switch on");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(180);
  this.setTooltip("Perform some actions when the switch is turned on.");
  }
};

//Generator stub for the "on switch on" block
Blockly.Python['on_switch_on'] = function(block) {
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');
 
  // Assemble Python into code variable.
  var code = "\n\ndef onSwitchOn():\r\n"

  + "  #loops continually until the status of the switch changes\r\n"
  + "  while checkSwitchStateOn() == False:\r\n"
  + "    continue\r\n"
  + "  #executes when the status of the switch changes\r\n"
  + "  if checkSwitchStateOn() == True:\r\n"
  + "    threadLock.acquire()#blocks other threads from executing\r\n";

  //Indent each line of code inside the block
  var i;
  var stringArray = statements_name.split(" ");
  for(i=0; i<stringArray.length; i++){

    if(i==0){

      code += stringArray[i];
    }
    else{
      code += "  " + stringArray[i] ;

    }
  }
    
  code +=
  "\n    threadLock.release() #releases the threadlock\r\n"
  + "\nthreadSwitchOn = threading.Thread(target=onSwitchOn) #sets the function\r\n"
  + "threadSwitchOn.start() #starts the threadSwitchOn thread\r\n";

  return code; // Return the Python code
};


// Block definition for the "on switch off" block
Blockly.Blocks['on_switch_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("on switch off");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(180);
  this.setTooltip("Perform some actions when the switch is turned off.");
  }
};

// Generator stub for the "on switch off" block
Blockly.Python['on_switch_off'] = function(block) {
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');
  
  // Assemble Python into code variable.
  var code = "\n\ndef onSwitchOff():\r\n"
  + "  #loops continually until the status of the switch changes\r\n"
  + "  while checkSwitchStateOff() == False:\r\n"
  + "    continue\r\n\n"
  + "  if checkSwitchStateOff() == True:\r\n"
  + "    threadLock.acquire() #blocks other threads from executing\r\n";

  var i;
  var stringArray = statements_name.split(" "); //Split each line within the generated code
  for(i=0; i<stringArray.length; i++){

    if(i==0){

      code += stringArray[i]; //Add the first line
    }
    else{

      code += "  " + stringArray[i] ; //Indent the following lines

    }
  }

  code +=
  "\n    threadLock.release() #releases the threadlock\r\n"

  + "\nthreadSwitchOff = threading.Thread(target=onSwitchOff) #sets the function\r\n"
  + "threadSwitchOff.start() #starts the threadSwitchOff thread\r\n";

  return code; // Return the Python code
};


// Block definition for the "speech_out" block
Blockly.Blocks['speech_out'] =  {
  init: function() {
    this.appendDummyInput()
        .appendField("speech out");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("Provides an audio output of the text provided.");
  }
};

// Generator stub for the "speech_out" block
Blockly.Python['speech_out'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  
  // Assemble Python into code variable.
  var code =  'TTS(' + value_name +')' + "\n";

  return code; // Return the Python code
}; 


// Block definition for the "Response" block
Blockly.Blocks['response'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Response"), "NAME");
    this.setOutput(true, null);
    this.setColour(330);
  this.setTooltip("Checks the speech response.");
  }
};

// Generator stub for the "Response" block
Blockly.Python['response'] = function(block) {
var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

// Assemble Python into code variable.
var code = 'getResponse()';

return [code, Blockly.Python.ORDER_NONE]; // Return the Python code
};


// Block definition for the "on_speech_in" block
Blockly.Blocks['on_speech_in'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("on speech in");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(330);
  this.setTooltip("Perform some actions when the a voice input is received.");
  }
};

// Generator stub for the "on_speech_in" block
Blockly.Python['on_speech_in'] = function(block) {
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');

  // Assemble Python into code variable.
  var code =  "def onSpeechIn():\r\n"
  + "  threadLock.acquire() #blocks other threads from executing\r\n"
    + "  response = getResponse()\r\n"
  + statements_name + "\r\n"

  + "  threadLock.release() #releases the threadlock\r\n"

  + "\nthreadSpeechIn = threading.Thread(target=onSpeechIn) #sets the function\r\n"
  + "threadSpeechIn.start() #starts the threadSpeechIn thread\r\n";

  return code; // Return the Python code
}; 


// Block definition for the "switch power" block
Blockly.Blocks['switchpower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("switch power"), "NAME");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip("Can be used to check the current switch power.");
  }
};

// Generator stub for the "switch power" block
Blockly.Python['switchpower'] = function(block) {
  var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  // Assemble Python into code variable.
  var code = 'checkSwitchPower()';

  return [code, Blockly.Python.ORDER_NONE]; // Return the Python code
};


// Block definition for the "device name" block
Blockly.Blocks['devicename'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("device name"), "NAME");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip("Can be used to verify the switch's name.");
  }
};

// Generator stub for the "devicename" block
Blockly.Python['devicename'] = function(block) {
  var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  // Assemble Python into code variable.
  var code = 'getDeviceName()';

  return [code, Blockly.Python.ORDER_NONE]; // Return the Python code
};
  

// Block definition for the "on_start" block
Blockly.Blocks['on_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("on start         ");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(60);
    this.setTooltip("This is required for starting the system.");
  }
};


// Generator stub for the "on_start" block
Blockly.Python['on_start'] = function(block) {
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');

  // Assemble Python into code variable.
  var code = 'import ouimeaux\r\n'
  + 'from ouimeaux.environment import Environment\r\n'
  + 'import boto3\r\n'
  + 'import pyaudio\r\n'
  + 'import threading\r\n'
  + 'import Transcribe\r\n'
  + 'import asyncio\r\n'
  + 'import subprocess\r\n'

  + '\n\nglobal listDevices\r\n'
  + 'env = Environment()\r\n'
  + 'env.start()\r\n'
  + 'env.discover(seconds=10)\r\n'
  + 'listDevices = []\r\n'
  + 'listDevices = env.list_switches()\r\n'
  
  + '\n\n#Performs the required AWS configuration\r\n'
  + 'def AWS_Setup(keyID, accessKey):\r\n'
  + '  client = boto3.Session(\r\n'
  + '    aws_access_key_id=keyID,\r\n'
  + '    aws_secret_access_key=accessKey,\r\n'
  + '    region_name="eu-west-1").client("polly")\r\n'
  + '  return client\r\n'

  + '\n\n#Performs text to speech conversion\r\n'
  + 'def TTS(text): \r\n'
  + statements_name + '\r\n'
  + '  response = polly.synthesize_speech( \r\n'
  + '    Text=text,\r\n'
  + '    OutputFormat="pcm",\r\n'
  + '    SampleRate="16000",\r\n'
  + '    VoiceId="Brian")\r\n'
  + '  with open("speech.pcm", "wb") as f:\r\n'
  + '    f.write(response["AudioStream"].read())\r\n'
  + '    f.close()\r\n'
  + '    subprocess.run(["aplay", "-D", "bluealsa", "-r16000", "-f", "S16_LE" ,"speech.pcm"])\r\n'

  + '\n\n#Returns the discovered Wemo device\r\n'
  + 'def getSwitch():\r\n'
  + '  try:\r\n'
  + '    deviceName = list(listDevices)[0]\r\n'
  + '    device = env.get_switch(deviceName)\r\n'
  + '    return device\r\n'
  + '  except:\r\n'
  + '    TTS("Connection to the Wemo was unsuccessful.")\r\n'

  + '\n\n#Checks the current switch power\r\n'
  + 'def checkSwitchPower():\r\n'
  + '  device = getSwitch()\r\n'
  + '  currentPower = device.insight_params["currentpower"]\r\n'
  + '  return currentPower\r\n'

  + '\n\n#Checks if the switch is on\r\n'
  + 'def checkSwitchStateOn():\r\n'
  + '  if checkSwitchPower() > 0:\r\n'
  + '    return True\r\n'
  + '  else:\r\n'
  + '    return False\r\n'

  + '\n\n#Checks if the switch is off\r\n'
  + 'def checkSwitchStateOff():\r\n'
  + '  if checkSwitchPower() == 0:\r\n'
  + '    return True\r\n'
  + '  else:\r\n'
  + '    return False\r\n'

  + '\n\n#Turns the switch on\r\n'
  + 'def turnWemoOn():\r\n'
  + '  device = getSwitch()\r\n'
  + '  device.basicevent.SetBinaryState(BinaryState=1)\r\n'

  + '\n\n#Turns the switch off\r\n'
  + 'def turnWemoOff():\r\n'
  + '  device = getSwitch()\r\n'
  + '  device.basicevent.SetBinaryState(BinaryState=0)\r\n'

  + '\n\n#Obtains the name of the WeMo device that is connected to\r\n'
  + 'def getDeviceName():\r\n'
  + '  deviceName = list(listDevices)[0]\r\n'
  + '  return deviceName\r\n'

  + '\n\n#Transcribes the response received\r\n'
  + 'def getResponse(): \r\n'
  + '  loop = asyncio.new_event_loop()\r\n'
  + '  asyncio.set_event_loop(loop)\r\n'
  + '  response = loop.run_until_complete(Transcribe.basic_transcribe())\r\n'
  + '  return response\r\n'

 
  + "\n\nthreadLock = threading.Lock() #initialises the thread lock\r\n"
  ;


  return code; // Return the Python code
};

// Block definition for the AWS configuration custom block
Blockly.Blocks['aws'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Amazon Web Services");
    this.appendValueInput("ID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Access Key ID");
    this.appendValueInput("Key")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Secret Access Key");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("Block for configuring the AWS keys.");
  }  
};

// Generator stub for the AWS block 
Blockly.Python['aws'] = function(block) {

  // Store the inputted text values, that is, the credentials
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  var value_key = Blockly.Python.valueToCode(block, 'Key', Blockly.Python.ORDER_ATOMIC);
  
  // Assemble Python into code variable.
  var code = `polly = AWS_Setup(${value_id}, ${value_key})`;

  return code; // Return the Python code
};
