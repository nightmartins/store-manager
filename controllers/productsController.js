const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const allProducts = await productsService.getAll();
  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsService.create({ name, quantity });
  return res.status(201).json(products);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { product } = await productsService.update({ id, name, quantity });
  console.log(product);
  return res.status(200).json({ id, name, quantity });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await productsService.remove(id);
  return res.status(200).json({ ...product });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
