# Lab 8 - ChatGPT bot

Należy rozszerzyć funkcjonalność wcześniej stworzonego bota. Do niego należy stworzyć aplikajcę frontendową, która połączy się z osobnym serwisem, który przeanalizuje tekst od użytkownika i prześle zapytanie do GPT, a następnie prześle odpowiedź do użytkownika. Cały projekt należy stworzyć w Pythonie.

Dla studentów, którzy nie chcą lub nie mogą korzystać z GPT, zamiast GPT należy wykorzystać LLAMA2 za pomocą narzędzi do wykorzystania LLM lokalnie: https://ollama.com/download/windows

- należy stworzyć po stronie serwerowej osobny serwis do łącznia z chatGPT do usługi chat
- należy stworzyć interfejs frontowy dla użytkownika, który komunikuje się z serwisem; odpowiedzi powinny być wysyałen do frontendowego interfejsu
- stworzyć listę 5 różnych otwarć oraz zamknięć rozmowy
- filtrowanie po zagadnieniach związanych ze sklepem (np. ograniczenie się jedynie do ubrań oraz samego sklepu) do GPT
- filtrowanie odpowiedzi po sentymencie