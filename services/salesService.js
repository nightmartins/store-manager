const salesModel = require('../models/salesModel');

const createSale = async (array) => {
  const insertSale = await salesModel.createSale(array);
  return insertSale;
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSale = async (id) => {
  const product = await salesModel.getSale(id);
  return product;
};

const updateSale = async (saleId, sale) => {
  const [upSale] = sale;
  await salesModel.updateSale(saleId, upSale);
  return {
    saleId,
    itemUpdated: [upSale],
  };
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  updateSale,
};