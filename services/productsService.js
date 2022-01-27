const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const newProduct = await productsModel.create({ name, quantity });

  return newProduct;
};

module.exports = {
  create,
};
