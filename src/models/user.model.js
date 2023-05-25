const pool = require('../config/database');

// Get all users
exports.getAllUsers = async () => {
  try {
    const users = await pool.query('SELECT * FROM users');
    return users.rows;
  } catch (error) {
    throw error;
  }
};

exports.addUser = async (user) => {
  try {
    const { username, password, email, fullName, membership } = user;
    const result = await pool.query(
      'INSERT INTO users (username, password, email, fullName, membership, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, now(), now()) RETURNING *',
      [username, password, email, fullName, membership]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.updateUser = async (id, column, value) => {
  try {
    const query = `UPDATE users SET ${column} = $1, updatedAt = now() WHERE id = $2 RETURNING *`;
    const values = [value, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = async (id) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
