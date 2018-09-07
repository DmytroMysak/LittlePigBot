# bot-pig

## Install

```sh
sudo apt-get install mplayer ffmpeg;
```
if you don't have postgresql install it or use remote one but don't forget to change credential in config/env file
```sh
sudo apt-get install postgresql-client postgresql postgresql-contrib;
```
Add new user or use user which already exist
```sh
sudo -u postgres createuser -D -A -P littlePig;
```
Create new DB
```sh
sudo -u postgres createuser -D -A -P littlePig;
```
add extension to new DB
```sh
sudo su - postgres;
psql little_pig;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\q
exit;
```

create .env file
```sh
touch .env;
```

fill in this file with:
```
AWS_ACCESS_KEY_ID=<YOUR AWS accessKeyId>
AWS_SECRET_ACCESS_KEY=<YOUR AWS secretAccessKey>
AWS_REGION=<YOUR AWS REGION>
DB_PASSWORD=<PASSWORD TO DB>
APP_URL=<URL TO YOUR APP e.g. https://ficus.serveo.net>
TELEGRAM_VERITY_TOKEN=<TELEGRAM_BOT_TOKEN>
```

Don't forget to use AWS POLLY.

## Getting Started

to start app enter:
./start-prod.sh
