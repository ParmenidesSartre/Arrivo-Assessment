const Joi = require('@hapi/joi');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().min(3).max(100).required(),
    body: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    status: Joi.string()
      .valid('Draft', 'Published', 'Pending Review')
      .required(),
    label: Joi.string().max(50),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    status: Joi.string().valid('Draft', 'Published', 'Pending Review'),
    category_id: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().min(3).max(100),
    body: Joi.string(),
    category_id: Joi.number().integer(),
    status: Joi.string().valid('Draft', 'Published'),
    label: Joi.string().max(50),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
