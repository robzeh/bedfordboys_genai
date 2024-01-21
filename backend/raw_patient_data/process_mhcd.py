from datasets import load_dataset
import re

dataset = load_dataset("heliosbrahma/mental_health_chatbot_dataset", split="train")
iterable_ds = dataset.to_iterable_dataset()

with open("./raw_patient_data/mental_health_chatbot_dataset.txt", "w") as f:

    for d in iterable_ds:
        splitted = d["text"].split("<HUMAN>:")
        splitted = splitted[1].split("<ASSISTANT>:")
        question = splitted[0].strip()
        answer = splitted[1].strip().replace("\n", "")

        f.write(f"Question: {question} \n")
        f.write(f"Answer: {answer} \n\n")


