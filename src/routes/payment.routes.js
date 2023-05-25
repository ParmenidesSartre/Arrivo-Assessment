const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');

router.route('/webhook').post(paymentController.webhookController);

router.route('/').get(paymentController.getPaymentsController);

module.exports = router;
