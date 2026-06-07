const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', contactController.sendMessage);
router.get('/', requireAuth, requireAdmin, contactController.getAllMessages);

module.exports = router;
