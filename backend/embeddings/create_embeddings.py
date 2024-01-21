import chromadb
import json
from datasets import load_dataset

# setup Chroma in-memory, for easy prototyping. Can add persistence easily!
client = chromadb.PersistentClient(path="./embeddings")


"""
mental health faq embeddings
"""
# dataset = load_dataset("tolu07/Mental_Health_FAQ", split="train")
# iterable_ds = dataset.to_iterable_dataset()
# documents = []
# doc_ids = []
# for d in iterable_ds:
#   full_text = f'Question: {d["Questions"]}, Answer: {d["Answers"]}'
#   documents.append(full_text)
#   doc_ids.append(f'{d["Question_ID"]}')
# collection = client.create_collection("mental_health_faqs")
# collection.add(
#   documents=documents,
#   ids=doc_ids
# )

"""
patient info embeddings
"""
# patients_file_path = 'db/patients.json'
# with open(patients_file_path, 'r') as file:
#   patients_data = json.load(file)
# for p in patients_data["patients"]:
#   documents = []
#   doc_ids = []

#   # patient info embed
#   info_text = json.dumps(p["basicInfo"])
#   documents.append(info_text)
#   doc_ids.append("0")

#   # embed each past convo
#   idx = 1
#   for meeting in p["meetings"]:
#     for convo in meeting["transcription"]:
#       documents.append(convo)
#       doc_ids.append(f"{idx}")
#       idx += 1
  
#   collection = client.create_collection(f"patient-{p['patientId']}")
#   collection.add(
#     documents=documents,
#     ids=doc_ids
#   )

"""
mental health counseling conversations embeddings
"""
# dataset = load_dataset("Amod/mental_health_counseling_conversations", split="train")
# iterable_ds = dataset.to_iterable_dataset()
# documents = []
# doc_ids = []
# for d in iterable_ds:
#   full_text = f'Question: {d["Questions"]}, Answer: {d["Answers"]}'
#   documents.append(full_text)
#   doc_ids.append(f'{d["Question_ID"]}')
# collection = client.create_collection("mental_health_counseling_conversations")
# collection.add(
#   documents=documents,
#   ids=doc_ids
# )

# Query/search 2 most similar results. You can also .get by id
# results = collection.query(
#   query_texts=["can young kids have depression"],
#   n_results=2,
#   # where={"metadata_field": "is_equal_to_this"}, # optional filter
#   # where_document={"$contains":"search_string"}  # optional filter
# )
# print(results)