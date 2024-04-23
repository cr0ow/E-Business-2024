**Zadanie 1** Docker

:white_check_mark: obraz ubuntu z Pythonem w wersji 3.8

:white_check_mark: obraz ubuntu:22.04 z Javą w wersji 8 oraz Kotlinem

:white_check_mark: do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)

:white_check_mark: stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle

:white_check_mark: dodać konfigurację docker-compose

Kod: [lab1](https://github.com/cr0ow/E-Business-2024/tree/master/lab1)

Demo: [lab1-demo](https://github.com/cr0ow/E-Business-2024/assets/70718059/e94d98f0-894b-44b0-b34a-04b0e21bb427)


**Zadanie 2** Scala

:white_check_mark: Należy stworzyć kontroler do Produktów

:white_check_mark: Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy

:white_check_mark: Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD

:white_check_mark: Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok

:white_check_mark: Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD

Kod: [lab2](https://github.com/cr0ow/E-Business-2024/tree/master/lab2)

Demo: [lab2-demo](https://github.com/cr0ow/E-Business-2024/assets/70718059/2e86731b-6093-4c80-bccd-efecfa828884)


**Zadanie 3** Kotlin

:white_check_mark: Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord

:white_check_mark: Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota)

:white_check_mark: Zwróci listę kategorii na określone żądanie użytkownika

:white_check_mark: Zwróci listę produktów wg żądanej kategorii

:x: Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex, Skype

Kod: [lab3](https://github.com/cr0ow/E-Business-2024/tree/master/lab3/ktor-sample)

Demo: [lab3-demo](https://github.com/cr0ow/E-Business-2024/assets/70718059/c64de11f-8425-42a5-9378-9c111ae51657)


**Zadanie 4** Go

:white_check_mark: Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD

:white_check_mark: Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)

:white_check_mark: Należy dodać model Koszyka oraz dodać odpowiedni endpoint

:white_check_mark: Należy stworzyć model kategorii i dodać relację między kategorią, a produktem

:x: pogrupować zapytania w gorm’owe scope'y

Kod: [lab4](https://github.com/cr0ow/E-Business-2024/tree/master/lab4)

Demo: [lab4-demo](https://github.com/cr0ow/E-Business-2024/assets/70718059/a22a52c2-50eb-4120-b6aa-3cbbe0d11779)


**Zadanie 5** Frontend

:white_check_mark: W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej

:white_check_mark: Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing

:white_check_mark: Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks

:white_check_mark: Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose

:x: Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

Kod: [lab5](https://github.com/cr0ow/E-Business-2024/tree/master/lab5)

Demo: [lab5-demo](https://github.com/cr0ow/E-Business-2024/assets/70718059/e3bdc651-3c6a-4e9c-9143-0ee16b9cb2c4)