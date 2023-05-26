const pool = require('../config/database');

exports.getAllCategories = async () => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    return categories.rows;
  } catch (error) {
    throw error;
  }
};

exports.addCategory = async (category) => {
  try {
    const { name, description, activated } = category;
    const result = await pool.query(
      'INSERT INTO categories (name, description, activated, created_at, updated_at) VALUES ($1, $2, $3, now(), now()) RETURNING *',
      [name, description, activated]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getCategoryById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Code C Refactored
exports.updatePost = async (id, updates) => {
  try {
    // Start constructing the query
    const queryStart = 'UPDATE posts SET ';
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
    setClauses.push(`updated_at = now()`);

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

exports.deleteCategory = async (id) => {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
