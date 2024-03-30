//importing the libraries
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(express.json());

// API for registration
app.post("/register", (req, res) => {
  const data = req.body;

  axios
    .post("http://20.244.56.144/test/register", data)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// API for authentication request
app.post("/authenticate", (req, res) => {
  const data = req.body;

  axios
    .post("http://20.244.56.144/test/auth", data)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// API For getting top products of any company
app.get("/get-top-products/:company/:category", (req, res) => {
  const { company, category } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  // Make request to API endpoint
  axios
    .get(
      `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// API for getting top product for amz company
app.get("/top-laptops", (req, res) => {
  const { top, minPrice, maxPrice } = req.query;

  // Make request to API endpoint
  axios
    .get(
      `http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
