const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require('../models/user.model');
const axios = require('axios');
const { signToken } = require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const { removePassword, removePasswords } = require('../utils/utils');

const loginUserController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Generate a token
    const token = signToken({ id: user.id });

    // Remove password from user object
    const sanitizedUser = removePassword(user);

    res.status(200).json({
      success: true,
      data: { ...sanitizedUser, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addUserController = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await hashPassword(req.body.password);
    const user = await addUser({ ...req.body, password: hashedPassword });

    // Generate a token
    const token = signToken({ id: user.id });

    // Remove password from user object
    const sanitizedUser = removePassword(user);

    res.status(201).json({
      success: true,
      data: { ...sanitizedUser, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    // Remove password from user objects
    const sanitizedUsers = removePasswords(users);
    res.status(200).json({
      success: true,
      data: sanitizedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove password from user object
    const sanitizedUser = removePassword(user);

    res.status(200).json({
      success: true,
      data: sanitizedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await updateUser(
      req.params.id,
      req.body.membership,
      req.body.value
    );

    // Remove password from user object
    const sanitizedUser = removePassword(user);

    res.status(200).json({
      success: true,
      data: sanitizedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);

    res.status(204).json({});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const upgradeUserController = async (req, res) => {
  try {
    let data = JSON.stringify({
      collection_id: 'j2un_qxy',
      description: 'Maecenas eu placerat ante.',
      email: req.user.email,
      name: req.user.fullname,
      amount: 200,
      callback_url: 'http://example.com/webhook/',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.billplz-sandbox.com/api/v3/bills',
      headers: {
        Authorization:
          'Basic OWIyNmFiNjgtMzllNi00YzM4LTg5YjQtNzRjZDEzZjRhZDZiOg==',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);

    if (!response) {
      // Check if response went through
      return res.status(404).json({
        success: false,
        message: 'Account upgrade failed',
      });
    }

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginUserController,
  getAllUsersController,
  addUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  upgradeUserController,
};
