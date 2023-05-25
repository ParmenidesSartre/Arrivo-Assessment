const { updateUser, getUserByEmail } = require('../models/user.model');
const { createPayment } = require('../models/payment.model');

const webhookController = async (req, res) => {
  console.log(req.body);
  try {
    const { id, amount, payment_method, state, email } = req.body;
    const payment = await createPayment({
      id,
      amount,
      payment_method,
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

module.exports = {
  webhookController,
};
