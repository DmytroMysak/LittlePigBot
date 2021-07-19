const logger = require('../../helper/logger');
const BaseCommand = require('./baseCommand');
const Client = require('../../models/client');

module.exports = class AddClientCommand extends BaseCommand {
  constructor() {
    super();
    this.name = ['add_client'];
    this.type = 'command';
  }

  // todo handle client with the same accessKey
  // todo handle empty client creation
  async execute(ctx) {
    super.execute(ctx);

    const [, name, accessKey, type] = ctx.message.text.split(' ');
    if (!name || !accessKey || !type) {
      return this.sendResponseAndTranslate('add_new_pig_error');
    }
    const client = {
      accessKey,
      type,
      name: name.replace(/-/gm, ' '),
      owner: ctx.user._id, // eslint-disable-line no-underscore-dangle
    };
    try {
      await Client.create(client);
    } catch (e) {
      logger.error(e);
      return this.sendResponseAndTranslate('add_new_pig_error');
    }
    return this.sendResponseAndTranslate('done');
  }
};
