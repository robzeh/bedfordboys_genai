def are_words_in_sentence(words_to_check, sentence):
    """
    Check if any of the words in the list are present in the sentence.

    Parameters:
    - words_to_check (list): List of words to check.
    - sentence (str): The input sentence.

    Returns:
    - bool: True if any word is present in the sentence, False otherwise.
    """
    return any(word in sentence for word in words_to_check)


def get_conversations(patient_id, patients_data):

    patient = next((p for p in patients_data['patients'] if p['patientId'] == int(patient_id)), None)
    if patient:
        convos = ""
        for meeting in patient['meetings']:
            for transcript in meeting["transcription"]:
                convos += transcript + " "
        return convos
    else:
        return None
