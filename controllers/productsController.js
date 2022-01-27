const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsService.create({ name, quantity });
  console.log('async create')
  return res.status(201).json(products);
};

module.exports = {
  create,
};
