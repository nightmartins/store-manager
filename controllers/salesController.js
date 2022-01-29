const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

const createSale = async (req, res) => {
  const { body } = req;
  const generateId = await salesModel.generateId();
  await salesService.createSale(generateId.insertId, body);
  return res.status(201).json({
    id: generateId.insertId,
    itemsSold: body,
  });  
};
// Controller construído com a ajuda do aluno Gustavo Inácio.

module.exports = {
  createSale,
};