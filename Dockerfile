FROM node:14.16.0-buster as builder

RUN apt-get update
RUN apt-get -y install git

RUN git clone https://.:${token}@github.com/${targetRepo}.git
RUN cd ${targetReponame}

RUN node dist/index.js
RUN ./commit.sh
