# Zadanie 1 Docker

Należy stworzyć obraz Dockerowy na bazie debianowej dystrybuji (bez zainstalowanych paczek javy, kotlina, itp.) oraz zainstalować kotlina, go lub scalę. Należy również dodać narzędzia do budowania np. sbt, gradle, odpowiednio do języka. Na tym obrazie powinien być również klint do statycznej analizy kodu w Kotlinie.

- obraz ubuntu z Pythonem w wersji 3.8
- obraz ubuntu:22.04 z Javą w wersji 8 oraz Kotlinem
- do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)
- stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle
- dodać konfigurację docker-compose