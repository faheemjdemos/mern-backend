const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dao = require("./data_access_mongodb"); // Adjust the path if necessary
// const dao = require("./data_access_mongoose"); // Adjust the path if necessary

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Get all products
apiRouter.get("/products", async (req, res) => {
  try {
    const products = await dao.getProducts();
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

// Get a product by ID
apiRouter.get("/products/:product_id", async (req, res) => {
  try {
    const product = await dao.findProductById(req.params.product_id);
    if (!product) {
      res.status(404).send({ error: "Product not found" });
    } else {
      res.send(product);
    }
  } catch (err) {
    res.status(500).send({ error: "Error retrieving product" });
  }
});

// Add a new product
apiRouter.post("/products", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ error: "Invalid product data" });
    }
    await dao.insertProduct(req.body);
    res.status(201).send({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to add product" });
  }
});

// Update product details
apiRouter.put("/products/:product_id", async (req, res) => {
  try {
    const updated = await dao.updateProduct(req.params.product_id, req.body);
    if (!updated) {
      res.status(404).send({ error: "Product not found" });
    } else {
      res.send({ message: "Product updated successfully" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to update product" });
  }
});

// Delete a product by ID
apiRouter.delete("/products/:product_id", async (req, res) => {
  try {
    const deleted = await dao.deleteProduct(req.params.product_id);
    if (!deleted) {
      res.status(404).send({ error: "Product not found" });
    } else {
      res.send({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to delete product" });
  }
});

app.use("/api", apiRouter);

app.listen(8080, () => {
  console.log("🚀 Server running on http://localhost:8080/api/");
});