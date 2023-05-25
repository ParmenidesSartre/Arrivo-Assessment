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

exports.updateUser = async (id, updates) => {
  try {
    // Start constructing the query
    const queryStart = 'UPDATE users SET ';
    const queryEnd = ' WHERE id = $1 RETURNING *';
    const values = [id];

    // Array to hold the SET clauses
    const setClauses = [];

    // Iterate over the updates object to populate the SET clauses and values arrays
    Object.keys(updates).forEach((key, index) => {
      setClauses.push(`${key} = $${index + 2}`);
      values.push(updates[key]);
    });

    // Add the updated_at = now() clause
    setClauses.push(`updatedAt = now()`);

    // Join the SET clauses into a single string
    const setClause = setClauses.join(', ');

    // Construct the final query
    const query = queryStart + setClause + queryEnd;

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
