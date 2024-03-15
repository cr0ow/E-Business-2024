#!/bin/bash

source $HOME/.sdkman/bin/sdkman-init.sh

#check versions
python --version
java -version
kotlin -version
gradle -v

#via gradle
echo -e "run via gradle:\n"
cd gradle-test
gradle run

#via CMD
echo -e "\nrun via CMD:\n"
cd app/src/main/kotlin/org/example
kotlinc App.kt -include-runtime -d app.jar
java -jar app.jar