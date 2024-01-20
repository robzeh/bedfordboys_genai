import chromadb
# setup Chroma in-memory, for easy prototyping. Can add persistence easily!
client = chromadb.Client()

# Create collection. get_collection, get_or_create_collection, delete_collection also available!
collection = client.create_collection("mental_health_faqs")


collection.add(
  documents=["Question1", "quesiton2"], 
  ids=["doc1", "doc2"], # unique for each doc
)

# Query/search 2 most similar results. You can also .get by id
results = collection.query(
  query_texts=["query"],
  n_results=2,
  # where={"metadata_field": "is_equal_to_this"}, # optional filter
  # where_document={"$contains":"search_string"}  # optional filter
)

print(results)