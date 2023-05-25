const { verifyToken } = require('../utils/jwt.utils');
const { getUserById } = require('../models/user.model');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const decoded = verifyToken(token.split(' ')[1]);

  if (decoded) {
    const user = await getUserById(decoded.id);

    req.user = user;
    next();
  } else {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticate;
