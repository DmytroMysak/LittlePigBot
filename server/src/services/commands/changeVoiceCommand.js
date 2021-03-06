const { Markup } = require('telegraf');
const BaseCommand = require('./baseCommand');
const voiceService = require('../voiceService');

module.exports = class ChangeVoiceCommand extends BaseCommand {
  constructor() {
    super();
    this.name = ['change'];
    this.type = 'command';
    this.hears = this.i18n.translateAll('change_voice');
  }

  execute(ctx) {
    super.execute(ctx);

    const languageListButton = voiceService.getLanguagesList()
      .map((el) => Markup.callbackButton(el.name, `${this.languageChangePrefix}${el.code}`));

    return this.sendResponseAndTranslate(
      'voice_list',
      Markup.inlineKeyboard(languageListButton, { columns: 4 }).extra(),
    );
  }
};
