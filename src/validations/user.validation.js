const Joi = require('@hapi/joi');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string().email().required(),
    fullName: Joi.string().min(3).max(50).required(),
    membership: Joi.string().valid('Normal', 'Premium').required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    email: Joi.string().email(),
    fullName: Joi.string(),
    membership: Joi.string().valid('Normal', 'Premium'),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string().alphanum().min(3).max(30),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().email(),
      fullName: Joi.string().min(3).max(50),
      membership: Joi.string().valid('Normal', 'Premium'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
