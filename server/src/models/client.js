const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  accessKey: {
    type: String,
    max: 100,
  },
  type: {
    type: String,
    enum: ['public', 'private'],
  },
  name: {
    type: String,
    max: 100,
  },
  owner: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }],
  },
}, {
  timestamps: true,
  virtual: true,
});

clientSchema.virtual('id').get(function () { // eslint-disable-line func-names
  return this._id.toString(); // eslint-disable-line no-underscore-dangle
});
clientSchema.set('toJSON', { getters: true, virtuals: true });

const Clients = mongoose.model('clients', clientSchema);
module.exports = Clients;
