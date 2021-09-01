FROM node:14.16.0-buster as builder


ENV token $1
ENV repos $2
ENV targetRepo $3
ENV targetReponame $4
ENV targetFile $5
ENV orderKey $6
ENV isAscend $7
ENV userTypeBlackList $8
ENV width $9
ENV showTotal $10
ENV customUserConfig $11

RUN apt-get update
RUN apt-get -y install git

RUN git clone https://.:${token}@github.com/${targetRepo}.git
RUN cd ${targetReponame}

RUN node dist/index.js
RUN ./commit.sh
