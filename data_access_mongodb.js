const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Adjust if needed
const dbName = 'shop';
const collectionName = 'products';

let db, productsCollection;

// open a connection to MongoDB

// Initialize MongoDB connection once
MongoClient.connect(uri)
  .then(client => {
    db = client.db(dbName);
    productsCollection = db.collection(collectionName);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports.getProducts = async () => {
  return await productsCollection.find().toArray();
};

module.exports.findProductById = async (product_id) => {
  return await productsCollection.findOne({ product_id: parseInt(product_id) });
};

module.exports.insertProduct = async (product) => {
  return await productsCollection.insertOne(product);
};

module.exports.updateProduct = async (product_id, updatedProduct) => {
  const result = await productsCollection.updateOne(
    { product_id: parseInt(product_id) },
    { $set: updatedProduct }
  );
  return result.modifiedCount > 0;
};

module.exports.deleteProduct = async (product_id) => {
  const result = await productsCollection.deleteOne({ product_id: parseInt(product_id) });
  return result.deletedCount > 0;
};