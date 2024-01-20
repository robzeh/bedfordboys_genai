from datasets import load_dataset

dataset = load_dataset("tolu07/Mental_Health_FAQ")

print(dataset["train"][:10])