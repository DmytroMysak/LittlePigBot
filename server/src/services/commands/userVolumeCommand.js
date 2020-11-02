const BaseCommand = require('./baseCommand');
const User = require('../../models/users');

module.exports = class UserVolumeCommand extends BaseCommand {
  constructor() {
    super();
    this.name = ['volume', 'vl'];
    this.type = 'command';
  }

  // eslint-disable-next-line consistent-return
  async execute(ctx) {
    super.execute(ctx);

    const volume = parseInt(ctx.message.text.replace(/\D/gm, ''), 10);
    if (!volume || Number.isNaN(volume)) {
      return this.sendResponseAndTranslate('bad_volume_value');
    }
    await User.updateOne({ telegramId: ctx.user.telegramId }, { 'settings.volume': volume });
    this.ctx.user.settings.volume = volume;
    this.sendResponseAndTranslate('volume_changed');
  }
};
