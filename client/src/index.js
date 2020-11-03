const logger = require('./helper/logger');
const CommandProcessorService = require('./services/commandProcessorService');
const queueService = require('./services/amqpService');

const main = async () => {
  const commandProcessor = new CommandProcessorService();
  await Promise.all([
    commandProcessor.initialize(),
    queueService.initialize(),
  ]);
  try {
    await queueService.processMessages((data) => commandProcessor.selectCommandAndExecute(data));
  } catch (error) {
    logger.error('Looks like pig isn\'t registered. Please register pig first');
    throw error;
  }
  logger.info('Client started');
};

main()
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });