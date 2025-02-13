const user = require('./users.controller');
const course = require('./courses.controller');
module.exports = {
  ...user,
  ...course,
};
