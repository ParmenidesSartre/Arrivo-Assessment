const isAdmin = (req, res, next) => {
  if (req.user.membership !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied, you do not have permissions',
    });
  }
  next();
};

module.exports = isAdmin;
