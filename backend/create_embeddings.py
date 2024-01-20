import chromadb
from datasets import load_dataset

# dataset = load_dataset("Amod/mental_health_counseling_conversations", split="train")
dataset = load_dataset("tolu07/Mental_Health_FAQ", split="train")
iterable_ds = dataset.to_iterable_dataset()

documents = []
doc_ids = []
for d in iterable_ds:
  full_text = f'Question: {d["Questions"]}, Answer: {d["Answers"]}'
  documents.append(full_text)
  doc_ids.append(f'{d["Question_ID"]}')

# setup Chroma in-memory, for easy prototyping. Can add persistence easily!
client = chromadb.PersistentClient(path="./embeddings")

collection = client.get_collection("mental_health_faqs")
# collection = client.create_collection("mental_health_faqs")
# collection.add(
#   documents=documents,
#   ids=doc_ids
# )

# Query/search 2 most similar results. You can also .get by id
results = collection.query(
  query_texts=["can young kids have depression"],
  n_results=2,
  # where={"metadata_field": "is_equal_to_this"}, # optional filter
  # where_document={"$contains":"search_string"}  # optional filter
)

print(results)