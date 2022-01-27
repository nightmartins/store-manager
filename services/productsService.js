const productsModel = require('../models/productsModel');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  return allProducts;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async ({ name, quantity }) => {
  const newProduct = await productsModel.create({ name, quantity });
  return newProduct;
};

const update = async ({ id, name, quantity }) => {
  const updatedProduct = await productsModel.update(id, name, quantity);
  return updatedProduct;
};

const remove = async (id) => {
  await productsModel.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
