FROM node:10

RUN apt-get update && apt-get upgrade -y
RUN apt-get install --assume-yes --fix-missing docker
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

ENTRYPOINT [ "npm", "start" ]
