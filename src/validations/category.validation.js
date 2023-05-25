const Joi = require('@hapi/joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255),
    activated: Joi.boolean().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    activated: Joi.boolean(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(50),
    description: Joi.string().max(255),
    activated: Joi.boolean(),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
