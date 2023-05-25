const pool = require('../config/database');

exports.createPayment = async (payment) => {
  try {
    const { payment_id, amount, payment_method, status } = payment;
    const result = await pool.query(
      'INSERT INTO payments (payment_id, amount, payment_method, status, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *',
      [payment_id, amount, payment_method, status]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getPaymentById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

exports.getAllPayments = async () => {
  try {
    const payments = await pool.query('SELECT * FROM payments');
    return payments.rows;
  } catch (error) {
    throw error;
  }
};
