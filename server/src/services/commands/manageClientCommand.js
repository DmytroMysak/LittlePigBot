const { Markup } = require('telegraf');
const BaseCommand = require('./baseCommand');
const Client = require('../../models/client');

module.exports = class ManageClientCommand extends BaseCommand {
  constructor() {
    super();
    this.name = ['clients'];
    this.type = 'command';
    this.hears = this.i18n.translateAll('manage_clients');
  }

  async execute(ctx) {
    super.execute(ctx);
    const selectedClients = await Client.find({ _id: { $in: ctx.user.selectedClients } }).lean();

    const active = selectedClients
      .sort((a, b) => b.name - a.name)
      // eslint-disable-next-line no-underscore-dangle
      .map((client) => Markup.callbackButton(`${client.name} 🔥`, `${this.clientTogglePrefix}${client._id}`));

    // for inactive use 💤
    return this.sendResponseAndTranslate(
      'pig_list',
      Markup.inlineKeyboard([
        ...active,
        Markup.callbackButton(this.translate('add_new_pig'), this.clientAddPrefix),
        Markup.callbackButton(this.translate('find_private_pig'), this.clientFindPrivatePrefix),
        Markup.callbackButton(this.translate('find_public_pig'), this.clientFindPublicPrefix),
      ], { columns: 1 }).extra(),
    );
  }
};
