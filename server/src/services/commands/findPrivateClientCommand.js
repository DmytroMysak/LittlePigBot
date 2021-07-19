const { Markup } = require('telegraf');
const Client = require('../../models/client');
const BaseCommand = require('./baseCommand');

module.exports = class FindClientCommand extends BaseCommand {
  constructor() {
    super();
    this.name = ['find_client'];
    this.type = 'command';
  }

  async execute(ctx) {
    super.execute(ctx);

    const [, accessKey] = ctx.message.text.split(' ');
    if (!accessKey) {
      return this.sendResponseAndTranslate('find_private_pig_error');
    }
    const client = await Client.findOne({ accessKey }).lean();
    if (!client) {
      return this.sendResponseAndTranslate('no_pig');
    }

    const buttons = [client]
      .map((el) => Markup.callbackButton(`${el.name} 💤`, `${this.clientTogglePrefix}${el.id}`));

    return this.sendResponseAndTranslate(
      'pig_list',
      Markup.inlineKeyboard(buttons, { columns: 1 }).extra(),
    );
  }
};
