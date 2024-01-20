import chromadb
# setup Chroma in-memory, for easy prototyping. Can add persistence easily!
client = chromadb.Client()

# Create collection. get_collection, get_or_create_collection, delete_collection also available!
collection = client.create_collection("all-my-documents")

# Add docs to the collection. Can also update and delete. Row-based API coming soon!
collection.add(
  documents=["Question: What is mental health? Answer: Mental health is...", "Question: what is emotinoal health? Answer: emotional helath is an important aspect", "Que"], # we handle tokenization, embedding, and indexing automatically. You can skip that and add your own embeddings as well
  # metadatas=[{"source": "notion"}, {"source": "google-docs"}], # filter on these!
  ids=["doc1", "doc2"], # unique for each doc
)

# Query/search 2 most similar results. You can also .get by id
results = collection.query(
  query_texts=["mental health"],
  n_results=2,
  # where={"metadata_field": "is_equal_to_this"}, # optional filter
  # where_document={"$contains":"search_string"}  # optional filter
)

print(results)
