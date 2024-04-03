# Zadanie 3 Kotlin

- Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord
- Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)
- Zwróci listę kategorii na określone żądanie użytkownika
- Zwróci listę produktów wg żądanej kategorii
- Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex, Skype

Aplikacja korzysta z Ktor do wysyłania wiadomości przez bota na Discorda. Do obsługi komend użytkowników używa biblioteki
Kord. Wymaga to utworzenia aplikacji Discord, proces opisany jest [tutaj](https://github.com/kordlib/kord/wiki/Getting-Started).
Aby aplikacja zadziałała należy uzupełnić kod o własne:

- `DISCORD_WEBHOOK_URL` - potrzebny do wysyłania wiadomości przez bota na serwer, [instrukcja](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- `DISCORD_TOKEN` - potrzebny do poprawnego działania komend, jak go uzyskać jest również opisane [tutaj](https://github.com/kordlib/kord/wiki/Getting-Started)