const User = require('./users.model');
const Course = require('./courses.model');
module.exports = {
  ...User,
  ...Course,
};
