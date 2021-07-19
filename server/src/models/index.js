const mongoose = require('mongoose');
const logger = require('../helper/logger');
const { maskConnectionString } = require('../helper/util');
const config = require('../config');

// eslint-disable-next-line import/prefer-default-export
const dbInitialize = async () => {
  const { uri, options } = config.mongoose;
  await mongoose.connect(uri, options);
  logger.info(`Connected to Mongo DB ${maskConnectionString(uri)}`);
  mongoose.connection.on('error', logger.error);
  mongoose.connection.on('disconnected', () => logger.warn('Disconnected from Mongo DB'));
  mongoose.connection.on('reconnected', () => logger.warn('Reconnected to Mongo DB'));
};

module.exports = {
  dbInitialize,
};
