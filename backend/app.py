from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import requests

from ollama import *
from utility import *

app = Flask(__name__)
CORS(app)

patients_file_path = 'db/patients.json'
with open(patients_file_path, 'r') as file:
    patients_data = json.load(file)


@app.route('/')
def index():
    return "Hello World! This is a Flask Server."


# TODO: make generate endpoint take params like prompt, pass those params to generate function
@app.route('/generate', methods=['POST'])
def generate():
    # model names = {llama2, ha1, ha2, ...}
    data = request.get_json()
    prompt = data["prompt"]
    context = None
    # patient_id = data["id"] or None

    transcription_words = ["transcribe", "transcript"]

    full_resp = ""

    if (are_words_in_sentence(transcription_words, prompt)):
        full_resp = "Whisper..."
    else:
        full_resp = handle_ollama(prompt, context)

    return jsonify({"response": full_resp[0]})


@app.route('/patients', methods=['GET'])
def get_patients():
    return jsonify(patients_data)


@app.route('/patients/<int:patient_id>', methods=['GET'])
def get_patient_by_id(patient_id):
    patient = next((p for p in patients_data['patients'] if p['patientId'] == patient_id), None)
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"}), 404

# @app.route('/patients/:id')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)