const messages = require('./messages');
const codes = require('./httpCodes');
const token = require('./token');
module.exports = {
  ...messages,
  ...codes,
  ...token,
};
