import chromadb

client = chromadb.PersistentClient(path="./embeddings")


# res = get_patient_embeddings(1, "have they ever been sad")
def get_patient_embeddings(patient_id, query, num_results=2):
    collection = client.get_collection(f"patient-{patient_id}")
    results = collection.query(
        query_texts=[query],
        n_results=num_results
    )

    return results["documents"]


# res = get_mental_health_faq_embeddings("what is depression")
def get_mental_health_faq_embeddings(query, num_results=2):
    collection = client.get_collection("mental_health_faqs")
    results = collection.query(
        query_texts=[query],
        n_results=num_results
    )

    return results["documents"]
