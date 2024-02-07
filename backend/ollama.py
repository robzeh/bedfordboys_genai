import os
import json
import requests

from utility import *
from use_embeddings import *

BASE_URL = os.environ.get('OLLAMA_HOST', 'http://localhost:11435')

patients_file_path = 'db/patients.json'
with open(patients_file_path, 'r') as file:
    patients_data = json.load(file)

# Generate a response for a given prompt with a provided model. This is a streaming endpoint, so will be a series of responses.
# The final response object will include statistics and additional data from the request. Use the callback function to override
# the default handler.
def generate_response(model_name, prompt, system=None, template=None, format="", context=None, options=None, callback=None):
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


def handle_ollama(prompt, context=None, patient_id=None):
    goal_words = ["goal", "goals"]
    summarize_words = ["summary", "summarize"]
    conversation_words = ["conversation", "convo"]

    if are_words_in_sentence(goal_words, prompt):
        model = "goal_setter"
        if patient_id is not None:
            patient = next((p for p in patients_data['patients'] if p['patientId'] == int(patient_id)), None)
            patient_goal = patient['basicInfo']['goal']
            prompt = "Goal: " + patient_goal 
    # enhance summarization with patient info embeddings
    elif are_words_in_sentence(summarize_words, prompt):
        model = "summarize"
        if patient_id is not None:
            patient = next((p for p in patients_data['patients'] if p['patientId'] == int(patient_id)), None)
            p_info = patient["basicInfo"]
            prompt = f"Patient info: {p_info['firstName']} {p_info['lastName']}, {p_info['age']}, {p_info['mentalDisorder']}, {p_info['description']}"
    elif are_words_in_sentence(conversation_words, prompt):
        model = "convo"
        if patient_id is not None:
            convos = get_conversations(patient_id, patients_data)
            prompt = "Conversations: " + convos
    else:
        # default model
        model = "ha1"

    resp = generate_response(model, prompt, context=None)
    return resp
