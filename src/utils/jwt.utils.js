const jwt = require('jsonwebtoken');
const config = require('../config/config');

const signToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
