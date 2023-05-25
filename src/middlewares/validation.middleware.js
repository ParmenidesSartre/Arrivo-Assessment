const validationMiddleware = (schemas) => {
  return (req, res, next) => {
    for (const key in schemas) {
      const { error } = schemas[key].validate(req[key]);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
    }

    next();
  };
};

module.exports = validationMiddleware;
