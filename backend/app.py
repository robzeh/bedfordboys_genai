from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello World! This is a Flask Server."

@app.route('/api')
def api():
    data = {
        'message': 'Welcome to our API.'
    }
    return jsonify(data), 200

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)