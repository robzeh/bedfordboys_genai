from flask import Flask, jsonify
from flask_cors import CORS
import os
import json
import requests

app = Flask(__name__)
CORS(app)

BASE_URL = os.environ.get('OLLAMA_HOST', 'http://localhost:11435')
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
    full_resp = generate("ha1", "I am feeling very sad") # remove hardcode prompt
    print(full_resp[0])

    return jsonify({"response": full_resp[0]})


# Generate a response for a given prompt with a provided model. This is a streaming endpoint, so will be a series of responses.
# The final response object will include statistics and additional data from the request. Use the callback function to override
# the default handler.
def generate(model_name, prompt, system=None, template=None, format="", context=None, options=None, callback=None):
    try:
        url = f"{BASE_URL}/api/generate"
        payload = {
            "model": model_name, 
            "prompt": prompt, 
            "system": system, 
            "template": template, 
            "context": context, 
            "options": options,
            "format": format,
        }
        # Remove keys with None values
        payload = {k: v for k, v in payload.items() if v is not None}
        with requests.post(url, json=payload, stream=True) as response:
            response.raise_for_status()
            # Creating a variable to hold the context history of the final chunk
            final_context = None
            # Variable to hold concatenated response strings if no callback is provided
            full_response = ""
            # Iterating over the response line by line and displaying the details
            for line in response.iter_lines():
                if line:
                    # Parsing each line (JSON chunk) and extracting the details
                    chunk = json.loads(line)
                    # If a callback function is provided, call it with the chunk
                    if callback:
                        callback(chunk)
                    else:
                        # If this is not the last chunk, add the "response" field value to full_response and print it
                        if not chunk.get("done"):
                            response_piece = chunk.get("response", "")
                            full_response += response_piece
                            # print(response_piece, end="", flush=True)
                    # Check if it's the last chunk (done is true)
                    if chunk.get("done"):
                        final_context = chunk.get("context")
            
            # Return the full response and the final context
            return full_response, final_context
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None, None


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