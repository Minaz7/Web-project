const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', requireAuth, orderController.createOrder);
router.get('/', requireAuth, requireAdmin, orderController.getAllOrders);

module.exports = router;
