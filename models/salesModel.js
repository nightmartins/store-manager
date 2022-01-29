const connection = require('./connection');

const createSale = async (array) => {
  const [rows] = await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    array,
  );
  return rows;
};

const generateId = async () => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return rows;
};
// Model construído com a ajuda do aluno Gustavo Inácio.

module.exports = {
  generateId,
  createSale,
};