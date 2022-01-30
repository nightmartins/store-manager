const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const array = req.body;
  try {
    const newSale = await salesService.createSale(array);
    return res.status(201).json(newSale);  
  } catch (error) {
    console.error(error);
  }
};
// Controller construído com a ajuda do aluno Gustavo Inácio.

const getAllSales = async (_req, res) => {
  try {
    const allSales = await salesService.getAllSales();
    return res.status(200).json(allSales);
  } catch (error) {
    console.error(error);
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const allSales = await salesService.getAllSales();
    const saleSearch = allSales.some((sale) => sale.saleId === id);
    if (saleSearch) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    const product = await salesService.getSale(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
};