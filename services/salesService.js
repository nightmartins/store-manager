const salesModel = require('../models/salesModel');

const createSale = async (id, array) => {
  const saleArray = [];
  array.forEach((element) => {
    saleArray.push(id, element.product_id, element.quantity);
  });
  const newSale = await salesModel.createSale(saleArray);
  return newSale;
};
// Service construído com a ajuda do aluno Gustavo Inácio.

module.exports = {
  createSale,
};