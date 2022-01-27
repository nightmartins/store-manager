const rescue = require('express-rescue');
const productsServices = require('../services/productsService');

const valName = rescue(async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await productsServices.getAll();

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (allProducts.find((prod) => prod.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
});

const valQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;
  const quantityMessage = '"quantity" must be a number larger than or equal to 1';
  
  if (typeof quantity === 'string' || quantity < 1) {
    return res.status(422).json({ message: `${quantityMessage}` });
  }
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
});

const valSearch = rescue(async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await productsServices.getAll();
  const search = allProducts.find((prod) => prod.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
});

module.exports = {
  valName,
  valQuantity,
  valSearch,
};
