const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: ''
  },
  brewingTechnique: {
    type: String,
    enum: ['Turkish Coffee', 'Espresso Coffee'],
    required: true
  },
  roastColor: {
    type: String,
    enum: ['Light', 'Medium', 'Dark', ''],
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: '/images/products/default.jpg'
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
