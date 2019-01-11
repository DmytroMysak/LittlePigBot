import fs from 'fs';
import crypto from 'crypto';
import Tunnel from './businessLogic/httpsTunnel/Tunnel';
import config from './config/env';
import logger from './helper/logger';
import sequelize from './models';
import PigService from './businessLogic/pigBL';
import TelegramBot from './businessLogic/bots/TelegramBot';

const pigService = new PigService();

// function to go over all bots and start them
const startBots = (appUrl) => {
  const telegramBot = new TelegramBot(appUrl);

  return Promise.all([
    telegramBot.start(),
  ]);
};

// Create the songs directory if it doesn't exist
if (!fs.existsSync(config.folderToSaveSongs)) {
  fs.mkdirSync(config.folderToSaveSongs);
}
// Create the log directory if it does not exist
if (!fs.existsSync(config.folderToSaveLogs)) {
  fs.mkdirSync(config.folderToSaveLogs);
}

const tunnel = new Tunnel(config.port);

// connect(config.port)
tunnel.createTunnel()
  .then(url => Promise.all([url, sequelize.authenticate()]))
  .then(([url]) => Promise.all([
    url,
    pigService.updateVoice(),
  ]))
  .then(url => startBots(url))
  .catch(err => logger.error(err));


const hashPwd = crypto.createHash('sha1')
  .update('test')
  .digest('hex');
console.log(hashPwd);
// a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
console.log('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'.length);
