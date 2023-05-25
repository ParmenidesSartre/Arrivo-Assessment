const { updateUser, getUserByEmail } = require('../models/user.model');
const { createPayment, getAllPayments } = require('../models/payment.model');

const webhookController = async (req, res) => {
  try {
    const { id, amount, state, email } = req.body;
    await createPayment({
      payment_id: id,
      amount,
      payment_method: 'Online Banking',
      state,
    });

    // Update user membership
    const user = await getUserByEmail(email);
    const updates = {
      membership: 'Premium',
    };
    await updateUser(user.id, updates);

    res.status(200).json({
      success: true,
      message: 'Payment successful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentsController = async (req, res) => {
  try {
    const payments = await getAllPayments();

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  webhookController,
  getPaymentsController,
};
