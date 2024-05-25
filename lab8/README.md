# Lab 8 - OAuth2

Należy skonfigurować klienta Oauth2 (4.0). Dane o użytkowniku wraz z tokenem powinny być przechowywane po stronie bazy serwera, a nowy token (inny niż ten od dostawcy) powinien zostać wysłany do klienta (React). Można zastosować mechanizm sesji lub inny dowolny (5.0). Zabronione jest tworzenie klientów bezpośrednio po stronie React'a wyłączając z komunikacji aplikację serwerową, np. wykorzystując auth0.

Prawidłowa komunikacja: react-sewer-dostawca-serwer(via return uri)-react.

- logowanie przez aplikację serwerową (bez Oauth2)
- rejestracja przez aplikację serwerową (bez Oauth2)
- logowanie via Google OAuth2
- logowanie via Facebook lub Github OAuth2
- zapisywanie danych logowania OAuth2 po stronie serwera