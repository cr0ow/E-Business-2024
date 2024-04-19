FROM ubuntu:22.04

ENV TZ=Europe/Warsaw
WORKDIR /home/play-scala-slick-example/

RUN apt update
RUN apt -y install software-properties-common
RUN apt -y install openjdk-17-jre openjdk-17-jdk
RUN apt -y install curl unzip
RUN apt -y install scala

RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add
RUN apt-get update
RUN apt-get -y install sbt

RUN apt-get install -y language-pack-pl
RUN update-locale LANG=pl_PL.UTF-8
ENV LC_ALL pl_PL.UTF-8

EXPOSE 9000

COPY play-scala-seed .
COPY run.sh .
RUN chmod +x run.sh

CMD "./run.sh"