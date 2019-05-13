FROM node:10

RUN apt-get update && apt-get upgrade -y
RUN apt-get install --assume-yes --no-install-recommends cron
RUN curl -sSL https://get.docker.com/ | sh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --only=prod

RUN mkdir /var/log/cron
RUN touch /var/log/cron/cron.log

RUN mkdir -p /usr/src/app/.node-persist
RUN touch /usr/src/app/.node-persist/jobs.crontab
RUN cat /usr/src/app/.node-persist/jobs.crontab | crontab

HEALTHCHECK --interval=60s --timeout=3s --start-period=5s --retries=3 CMD curl --connect-timeout 1 --max-time 2 --fail -I localhost/probe

EXPOSE 80

ENTRYPOINT cron -f -L 8 & npm start
