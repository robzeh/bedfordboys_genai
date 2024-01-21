# HarmonyHelper Backend

Built with Flask, Ollama, ChromaDB 

**Setup**
```
python -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt

# Ollama setup
curl https://ollama.ai/install.sh | sh
ollama pull llama2
OLLAMA_HOST=0.0.0.0:11435 ollama serve

# ChromaDB setup
python embeddings/create_embeddings.py # uncomment desired embedding code in file

# run the server
python app.py

```


We also include the capability of creating specialized models.
In `modelfiles`, create a new folder with the name of your model.
Modify the `Modelfile` according to your needs such as `BASE_MODEL, SYSTEM_PROMPT, TEMPLATE_PROMPT, etc`.
Then, run the following commands to create and run your model.
```
ollama create CUSTOM_NAME -f ./modelfiles/haX/Modelfile
OLLAMA_HOST=0.0.0.0:11435 ollama serve 
```