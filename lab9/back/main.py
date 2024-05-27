from flask import Flask, request, jsonify
#from transformers import pipeline
from flask_cors import CORS
from random import random

app = Flask(__name__)
CORS(app)

#chat_model = pipeline('text-generation', model='gpt-2')

welcome_messages = [
    "Cześć! Jak mogę Ci dzisiaj pomóc?",
    "Witam! Co mogę dla Ciebie zrobić?",
    "Hej! Jakie masz pytania na dzisiaj?",
    "Dzień dobry! W czym mogę służyć?",
    "Cześć! Jak mogę Ci pomóc w sklepie?"
]

goodbye_messages = [
    "Dziękuję za rozmowę! Czy mogę jeszcze w czymś pomóc?",
    "To wszystko na dzisiaj. Miłego dnia!",
    "Dziękuję za pytania. Jeśli będziesz potrzebować więcej pomocy, jestem tutaj!",
    "Mam nadzieję, że mogłem pomóc. Do zobaczenia!",
    "Dziękuję za skorzystanie z naszych usług. Życzę miłego dnia!"
]


@app.route('/welcome', methods=['GET'])
def welcome():
    return jsonify({"welcomeMessage": welcome_messages[random() % 5]})


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message")

    result = ''#chat_model(user_input, max_length=50)
    response_text = result[0]['generated_text']

    return jsonify({"response": response_text})


@app.route('/goodbye', methods=['GET'])
def goodbye():
    return jsonify({"goodbyeMessage": goodbye_messages[random() % 5]})


if __name__ == '__main__':
    app.run(debug=True)
