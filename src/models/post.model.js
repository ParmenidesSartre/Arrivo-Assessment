const pool = require('../config/database');

// Get all posts
exports.getAllPosts = async () => {
  try {
    const posts = await pool.query(
      'SELECT posts.*, categories.name AS category_name FROM posts INNER JOIN categories ON posts.category_id = categories.id'
    );
    return posts.rows;
  } catch (error) {
    throw error;
  }
};

// Add a new post
exports.addPost = async (post) => {
  try {
    const { title, body, category_id, status, label } = post;
    const result = await pool.query(
      'INSERT INTO posts (title, body, category_id, status, label, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
      [title, body, category_id, status, label]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Get a post by id
exports.getPostById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT posts.*, categories.name AS category_name FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE posts.id = $1',
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getPostsByLabelAndStatus = async (labels, status) => {
  try {
    let query;
    let values;

    if (Array.isArray(labels)) {
      // If labels is an array, generate a dynamic IN clause
      const placeholders = labels.map((_, index) => `$${index + 1}`).join(',');
      query = `SELECT posts.*, categories.name AS category_name FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE posts.label IN (${placeholders}) AND posts.status = $${
        labels.length + 1
      }`;
      values = [...labels, status];
    } else {
      // If labels is a single value
      query =
        'SELECT posts.*, categories.name AS category_name FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE posts.label = $1 AND posts.status = $2';
      values = [labels, status];
    }

    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Update a post
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

// Delete a post
exports.deletePost = async (id) => {
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
