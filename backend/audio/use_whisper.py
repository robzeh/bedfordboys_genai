import os 
import whisper

model = whisper.load_model("medium")

audio_files = os.listdir("./audio/wav")
for f in audio_files:
    result = model.transcribe(f"./audio/wav/{f}")
    print(result)
    with open(f"./audio/transcriptions/{f}-transcript.txt", "w") as t:
        t.write(result["text"])