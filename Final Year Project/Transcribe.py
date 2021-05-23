#Author: Amazon
#This script belongs to Amazon Transcribe and it was modified for the
#purposes of this project
#The following lines were added: 34-36, 40-41, 67-74 and 103

# This script uses the sounddevice library to get an audio stream from the
# microphone. It's not a dependency of the project but can be installed with
# `pip install sounddevice`.

import asyncio
import sounddevice
from timeit import default_timer as timer

from amazon_transcribe.client import TranscribeStreamingClient
from amazon_transcribe.handlers import TranscriptResultStreamHandler
from amazon_transcribe.model import TranscriptEvent


gotResponse = False
output = None

"""
This is an example of a custom event handler that extend to
process the returned transcription results as needed. This
handler will simply print the text out to your interpreter.
"""
class MyEventHandler(TranscriptResultStreamHandler):
    async def handle_transcript_event(self, transcript_event: TranscriptEvent):
        # This handler can be implemented to handle transcriptions as needed.
        # Here's an example to get started.
        results = transcript_event.transcript.results

        for result in results:

            global gotResponse
            gotResponse = True
            global output
            
            for alt in result.alternatives:
                
                output = alt.transcript
                output = output.replace(" ", "  ")


async def mic_stream():    
    # This function wraps the raw input stream from the microphone forwarding
    # the blocks to an asyncio.Queue.
    loop = asyncio.get_event_loop()
    input_queue = asyncio.Queue()

    def callback(indata, frame_count, time_info, status):
        loop.call_soon_threadsafe(input_queue.put_nowait, (bytes(indata), status))

    # Use the correct parameters for the audio stream that matches
    # the audio formats described for the source language
    # https://docs.aws.amazon.com/transcribe/latest/dg/streaming.html
    stream = sounddevice.RawInputStream(
        channels=1,
        samplerate=16000,
        callback=callback,
        blocksize=1024 * 2,
        dtype="int16",
    )
    # Initiate the audio stream and asynchronously yield the audio chunks
    # as they become available.
    with stream:
        
        timeDifference = 0 #stores the elapsed time
        start = timer() #starts the timer
        
        #The loop stops when a response is recieved or the timer elapses
        while gotResponse != True and timeDifference <= 10:
            
            end = timer()       
            timeDifference = end-start #calculates the elapsed time
            
            indata, status = await input_queue.get()
            yield indata, status


async def write_chunks(stream):    
    # This connects the raw audio chunks generator coming from the microphone
    # and passes them along to the transcription stream.
    async for chunk, status in mic_stream():
        await stream.input_stream.send_audio_event(audio_chunk=chunk)
    await stream.input_stream.end_stream()


async def basic_transcribe():    
    # Setup up a client with the chosen AWS region
    client = TranscribeStreamingClient(region="eu-west-1")

    # Start transcription to generate an async stream
    stream = await client.start_stream_transcription(
        language_code="en-US",
        media_sample_rate_hz=16000,
        media_encoding="pcm",
    )

    # Instantiate a handler and start processing events
    handler = MyEventHandler(stream.output_stream)
    await asyncio.gather(write_chunks(stream), handler.handle_events())
    return output
    
