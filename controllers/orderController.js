const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, email, address, paymentMethod, items } = req.body;

    if (!customerName || !email || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Complete order details and cart items are required.' });
    }

    const total = items.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.qty);
    }, 0);

    const order = await Order.create({
      user: req.user.id,
      customerName,
      customerEmail: email,
      customerAddress: address,
      paymentMethod: paymentMethod || 'card',
      items,
      total,
      status: 'Pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Could not place order.' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders.' });
  }
};
