const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/shop'; // Includes DB name in URI
mongoose.connect(uri);

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB (Mongoose)'));
db.on('error', console.error);

// Define a schema
const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  price: Number,
  stock: Number
});

// Create a model
const Product = mongoose.model('Product', productSchema);

// Exported functions
module.exports = {
  getProducts: async () => Product.find(),

  findProductById: async (product_id) =>
    Product.findOne({ product_id: parseInt(product_id) }),

  insertProduct: async (product) =>
    new Product(product).save(),

  updateProduct: async (product_id, updatedProduct) =>
    Product.updateOne({ product_id: parseInt(product_id) }, { $set: updatedProduct })
      .then(res => res.modifiedCount > 0),

   
  deleteProduct: async (product_id) =>
    Product.deleteOne({ product_id: parseInt(product_id) })
      .then(res => res.deletedCount > 0)
};