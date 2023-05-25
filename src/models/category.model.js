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

exports.updateCategory = async (id, column, value) => {
  try {
    const query = `UPDATE categories SET ${column} = $1, updated_at = now() WHERE id = $2 RETURNING *`;
    const values = [value, id];

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
