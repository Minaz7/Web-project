const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    default: ''
  },
  customerAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'card'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
