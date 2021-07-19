const config = require('./config');
const logger = require('./helper/logger');
const TelegramBot = require('./services/bots/telegramBot');
const voiceService = require('./services/voiceService');
const i18nService = require('./services/i18nService');
const clientService = require('./services/clientService');
const { dbInitialize } = require('./models/index');

const createAppUrl = async () => {
  const { default: Tunnel } = await import('./services/httpsTunnel/ngrok.js');
  const tunnel = new Tunnel(config.port);
  await tunnel.start();
  const appUrl = tunnel.getUrlAddress();

  setTimeout(() => {
    logger.debug('Restart app every 4 hours. Ngrok workaround!');
    process.exit(0);
  }, 4 * 60 * 60 * 1000);

  return appUrl;
};

const main = async () => {
  await dbInitialize();
  await Promise.all([
    voiceService.initialize(),
    i18nService.initialize(),
    clientService.initialize(),
  ]);

  const appUrl = config.appUrl ?? await createAppUrl();
  logger.debug(`App url: ${appUrl}`);

  const telegramBot = new TelegramBot(appUrl, config.port);
  await telegramBot.start();
  logger.debug('Telegram bot started');
};

main()
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });

// {
//   _id: ObjectId('00000000000000000000000a'),
//   type: 'public',
//   accessKey: 'some-random-text',
//   name: 'D&D\'s home pig',
//   owner: ObjectId('60f5ae03cd0ebd51d7bab2cd')
// }
