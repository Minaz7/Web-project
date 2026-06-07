require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@mrbeans.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    name: 'Regular User',
    email: 'user@mrbeans.com',
    password: 'User@123',
    role: 'user'
  }
];

const seedProducts = [
  // Espresso Coffee
  {
    name: 'Espresso Crema',
    price: 180,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-crema.png',
    description: 'Rich & Creamy Espresso Blend. 100% Arabica Coffee Beans.',
    stock: 20,
    category: 'Espresso'
  },
  {
    name: 'Espresso Mild',
    price: 240,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-mild.png',
    description: 'Smooth & Balanced Espresso Blend. Roasted Coffee.',
    stock: 20,
    category: 'Espresso'
  },
  {
    name: 'Espresso Aroma',
    price: 180,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-aroma.png',
    description: 'Bold & Aromatic Espresso Blend. 100% Arabica, Whole Bean.',
    stock: 20,
    category: 'Espresso'
  },
  {
    name: 'Espresso Classic',
    price: 180,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-classic.png',
    description: 'Classic Espresso Blend with rich, full-bodied flavor.',
    stock: 20,
    category: 'Espresso'
  },
  {
    name: 'Espresso Autentica',
    price: 196,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-autentica.png',
    description: 'Authentic Italian-style Espresso. Bold and aromatic.',
    stock: 20,
    category: 'Espresso'
  },
  {
    name: 'Espresso Classica',
    price: 196,
    brewingTechnique: 'Espresso Coffee',
    roastColor: '',
    image: '/images/products/espresso-classica.png',
    description: 'Premium Classica Espresso. Smooth and refined.',
    stock: 20,
    category: 'Espresso'
  },

  // Turkish Coffee — Dark
  {
    name: 'Mostashar with Double Cardamom',
    price: 215,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Dark',
    image: '/images/products/turkish-dark-mostashar-double-cardamom.png',
    description: 'Premium Quality Turkish Coffee. Dark roast with double cardamom. Rich & Balanced.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Oriental Plain',
    price: 140,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Dark',
    image: '/images/products/turkish-dark-oriental-plain.png',
    description: 'Authentic dark roast Turkish Coffee. Bold and traditional.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Colombia Plain',
    price: 205,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Dark',
    image: '/images/products/turkish-dark-colombia-plain.png',
    description: 'Premium Quality Turkish Coffee. Dark roast Colombian beans.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Melange Plain Dark',
    price: 190,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Dark',
    image: '/images/products/turkish-dark-melange-plain.png',
    description: 'Authentic Taste Premium Quality. Dark roast Melange. Rich & Balanced.',
    stock: 20,
    category: 'Turkish'
  },

  // Turkish Coffee — Medium
  {
    name: 'Melange Plain Medium',
    price: 190,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Medium',
    image: '/images/products/turkish-medium-melange-plain.png',
    description: '100% Arabica Turkish Coffee. Medium roast. Rich & Balanced.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Melange with Cardamom',
    price: 228.5,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Medium',
    image: '/images/products/turkish-medium-melange-cardamom.png',
    description: '100% Arabica Turkish Coffee. Medium roast with Cardamom. Rich & Aromatic.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Ameed with Triple Cardamom',
    price: 270,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Medium',
    image: '/images/products/turkish-medium-ameed-triple-cardamom.png',
    description: '100% Arabica Turkish Coffee. Medium roast with triple cardamom. Smooth & Aromatic.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Mostashar Plain',
    price: 215,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Medium',
    image: '/images/products/turkish-medium-mostashar-plain.png',
    description: '100% Arabica Turkish Coffee. Medium roast Mostashar. Rich & Balanced.',
    stock: 20,
    category: 'Turkish'
  },

  // Turkish Coffee — Light
  {
    name: 'Grand Plain',
    price: 205,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Light',
    image: '/images/products/turkish-light-grand-plain.png',
    description: '100% Arabica Turkish Coffee. Light roast. Mild & Smooth.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Grand with Cardamom',
    price: 243,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Light',
    image: '/images/products/turkish-light-grand-cardamom.png',
    description: '100% Arabica Turkish Coffee. Light roast with Cardamom. Smooth & Aromatic.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Special Plain',
    price: 175,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Light',
    image: '/images/products/turkish-light-special-plain.png',
    description: '100% Arabica Turkish Coffee. Light roast Special. Smooth & Mild.',
    stock: 20,
    category: 'Turkish'
  },
  {
    name: 'Special with Cardamom',
    price: 215,
    brewingTechnique: 'Turkish Coffee',
    roastColor: 'Light',
    image: '/images/products/turkish-light-special-cardamom.png',
    description: '100% Arabica Turkish Coffee. Light roast with Cardamom. Mild & Aromatic.',
    stock: 20,
    category: 'Turkish'
  }
];

async function seed() {
  try {
    await connectDB();

    // Seed users (skip if admin already exists)
    const adminExists = await User.findOne({ email: 'admin@mrbeans.com' });
    if (!adminExists) {
      for (const userData of seedUsers) {
        const hashed = await bcrypt.hash(userData.password, 10);
        await User.create({
          name: userData.name,
          email: userData.email,
          password: hashed,
          role: userData.role
        });
      }
      console.log('Users seeded successfully.');
    } else {
      console.log('Admin user already exists. Skipping user seed.');
    }

    // Seed products (skip if products already exist)
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(seedProducts);
      console.log('Products seeded successfully.');
    } else {
      console.log(`${productCount} products already exist. Skipping product seed.`);
    }

    console.log('Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
