FROM node:14.16.0-buster as builder

ARG $1
ENV token=$1
RUN apt-get update
RUN apt-get -y install git

RUN echo "hello $1"
RUN echo "hello $token"

# RUN git clone https://.:$INPUT_TOKEN@github.com/$INPUT_TARGETREPO.git
# RUN cd ${targetReponame}

# RUN node dist/index.js
# RUN ./commit.sh
