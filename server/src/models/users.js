const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  volume: {
    type: Number,
    default: 50,
    min: 1,
    max: 100,
  },
  locale: {
    type: String,
    default: 'ua',
    enum: ['en', 'ua'],
  },
  voiceId: {
    type: String,
    default: 'Maxim',
    max: 100,
  },
}, {
  virtual: true,
});

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  settings: {
    type: settingSchema,
    required: true,
    default: () => ({
      volume: 50,
      locale: 'ua',
      voiceId: 'Maxim',
    }),
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
  selectedClients: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clients',
    }],
    default: [mongoose.Types.ObjectId('00000000000000000000000a')],
  },
}, {
  timestamps: true,
  virtual: true,
});

[settingSchema, userSchema].forEach((schema) => {
  schema.virtual('id').get(function () { // eslint-disable-line func-names
    return this._id.toString(); // eslint-disable-line no-underscore-dangle
  });
  schema.set('toJSON', { getters: true, virtuals: true });
});

userSchema.index({ telegramId: 1 });

const User = mongoose.model('users', userSchema);
module.exports = User;
