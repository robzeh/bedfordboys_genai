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