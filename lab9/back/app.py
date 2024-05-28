from flask import Flask, request, jsonify
from flask_cors import CORS
from random import random
import requests

app = Flask(__name__)
CORS(app)

welcome_messages = [
    "Hi! How can I help you today?",
    "Welcome! What can I do for you?",
    "Hey! What questions do you have for today?",
    "Good morning! How can I assist you?",
    "Hi! How can I help you in the store?"
]

goodbye_messages = [
    "Thank you for the conversation! Is there anything else I can assist you with?",
    "That's all for today. Have a great day!",
    "Thank you for your questions. If you need more help, I'm here!",
    "I hope I could help. See you next time!",
    "Thank you for using our services. Have a nice day!"
]


def query_llama(message):
    response = requests.post(
        'http://localhost:11434/api/generate',
        json={"model":"llama3", "prompt": message, "stream": False}
    )
    return response.json()


@app.route('/welcome', methods=['GET'])
def welcome():
    return jsonify({"welcomeMessage": welcome_messages[int(random() * 5)]})


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message")
    result = query_llama(user_input)
    return jsonify({"response": result})


@app.route('/goodbye', methods=['GET'])
def goodbye():
    return jsonify({"goodbyeMessage": goodbye_messages[int(random() * 5)]})


if __name__ == '__main__':
    app.run()
