const bcrypt = require("bcrypt");
const SALT = 10;
const generatePasswordHash = (passwordHash) => {
  return bcrypt.hash(passwordHash, SALT);
};

const comparePasswordHash = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
module.exports = { generatePasswordHash, comparePasswordHash };
