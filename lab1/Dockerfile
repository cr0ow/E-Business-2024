FROM ubuntu:22.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt -y install software-properties-common && apt -y install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev && apt-get clean && apt clean

# 3.0
RUN wget --secure-protocol=TLSv1_2 --max-redirect=0 -q -O - https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
RUN tar -xf Python-3.8.0.tgz
WORKDIR Python-3.8.0
RUN ./configure --enable-optimizations && make -j 8 && make altinstall
ENV PATH="${PATH}:${HOME}/Python-3.8.0"

# 3.5
RUN apt --no-install-recommends -y install openjdk-8-jre openjdk-8-jdk && apt clean
RUN apt-get --no-install-recommends -y install unzip zip curl && apt-get clean
RUN curl -s "https://get.sdkman.io" | bash
RUN /bin/bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"
ENV PATH="${PATH}:${HOME}/kotlinc/bin"

# 4.0
RUN /bin/bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle 8.6 && mkdir gradle-test && cd gradle-test && gradle init --use-defaults --type kotlin-application"
WORKDIR gradle-test/app
RUN sed -i '/dependencies {/a\ \n    implementation(\"org.xerial:sqlite-jdbc:3.45.1.0\")\n' build.gradle.kts
RUN /bin/bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && cd gradle-test && gradle build"

# 4.5
COPY run.sh .
RUN chmod +x run.sh

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

CMD "./run.sh"