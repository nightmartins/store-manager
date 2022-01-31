const connection = require('./connection');

const createSale = async (array) => {
  const [id] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  const insertSales = array.map((element) => [
    id.insertId,
    element.product_id,
    element.quantity,
  ]);

  await connection.query(
  'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
  [insertSales],
  );
  return {
    id: id.insertId,
    itemsSold: array,
  };
};
// Model construído com a ajuda do aluno Gustavo Inácio.
// Método de inserir múltiplos valores compartilhado no Slack pelo aluno Michael Caxias
// Referência para a correção da função: https://github.com/tryber/sd-014-b-store-manager/pull/18

const getAllSales = async () => {
  try {
    const [rows] = await connection.execute(
      `SELECT sl.id AS saleId,
      sl.date,
      sp.product_id,
      sp.quantity
      
      FROM StoreManager.sales AS sl
      INNER JOIN StoreManager.sales_products AS sp
      ON sl.id = sp.sale_id`,
      );
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getSale = async (id) => {
  const [rows] = await connection.execute(
    `SELECT sl.date AS date,
    sp.product_id,
    sp.quantity
    
    FROM StoreManager.sales AS sl
    INNER JOIN StoreManager.sales_products AS sp
    ON sl.id = sp.sale_id
    WHERE sl.id = ?
    
    GROUP BY date, product_id, quantity`,
    [id],
  );
  return rows;
};
const updateSale = async (saleId, sale) => {
  try {
    await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?`,
    [sale.product_id, sale.quantity, saleId],
  );
  const upSale = {
    saleId,
    itemUpdated: [sale],
  };
  return upSale;
} catch (error) {
  console.error(error);
}
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  updateSale,
};