const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const brewingTechnique = (req.query.brewingTechnique || '').trim();
    const roastColor = (req.query.roastColor || '').trim();

    let filter = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { category: regex },
        { brewingTechnique: regex }
      ];
    }

    if (brewingTechnique) {
      filter.brewingTechnique = brewingTechnique;
    }

    if (roastColor) {
      filter.roastColor = roastColor;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products.' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch product.' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, brewingTechnique, roastColor, description, image, stock, category } = req.body;

    if (!name || !price || !brewingTechnique) {
      return res.status(400).json({ message: 'Name, price, and brewingTechnique are required.' });
    }

    if (brewingTechnique === 'Turkish Coffee' && !roastColor) {
      return res.status(400).json({ message: 'Turkish Coffee products require a roastColor.' });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      brewingTechnique,
      roastColor: brewingTechnique === 'Espresso Coffee' ? '' : (roastColor || ''),
      description: (description || '').trim(),
      image: (image || '/images/products/default.jpg').trim(),
      stock: Number(stock || 0),
      category: (category || '').trim()
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not create product.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const fields = ['name', 'price', 'description', 'image', 'stock', 'brewingTechnique', 'roastColor', 'category'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'price' || field === 'stock') {
          product[field] = Number(req.body[field]);
        } else {
          product[field] = String(req.body[field]).trim();
        }
      }
    });

    if (product.brewingTechnique === 'Espresso Coffee') {
      product.roastColor = '';
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not update product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete product.' });
  }
};
