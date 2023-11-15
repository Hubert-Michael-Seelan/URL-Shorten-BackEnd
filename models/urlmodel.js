const mongoose = require('mongoose');
const shortid = require('shortid');
const schema = mongoose.Schema;

const ShortURL = new schema({
  shortCode: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  longURL: {
    type: String,
    required: true,
  },
});

const ShortUrl = mongoose.model('shorturl', ShortURL);

module.exports = ShortUrl;
