const crypto = require('crypto');
const mongodbUri = require('mongodb-uri');
const config = require('../config');

const createHash = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

const createFileName = (text, voiceId) => `${createHash(text)}-${voiceId}.${config.songFormat}`;

const createFileLink = (fileName) => `${config.bucket.url}/${config.bucket.name}/${fileName}`;

const getYoutubeId = (url) => {
  // eslint-disable-next-line max-len
  const regExp = /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i;
  const match = url.match(regExp);

  return (match && match[1]?.length === 11) ? match[1] : false;
};

const maskConnectionString = (uri) => {
  const uriObject = mongodbUri.parse(uri);
  if (uriObject.password) {
    uriObject.password = '*****';
  }
  return mongodbUri.format(uriObject);
};

module.exports = {
  createFileName,
  createFileLink,
  getYoutubeId,
  maskConnectionString,
};
