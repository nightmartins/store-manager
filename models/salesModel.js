// const connection = require('./connection');

// const getAllSales = async () => {
//   const [rows] = await connection.execute(
//     `SELECT sl.id AS saleId,
//     sl.date as date,
//     sp.product_id as product_id,
//     sp.quantity as quantity
    
//     FROM StoreManager.sales AS sl
//     INNER JOIN StoreManager.sales_products AS sp
//     ON sl.id = sp.sale_id
    
//     GROUP BY saleId, date, product_id, quantity;`,
//     );
//   return rows;
// };

// // const getSaleById = async (id) => {
// //   const [rows] = await connection.execute(
// //     'SELECT * FROM StoreManager.products WHERE id = ?',
// //     [id],
// //   );
// //   return rows[0];
// // };

// const createSale = async (array) => {
//   const [rows] = await connection.query(
//     'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
//     array,
//   );
//   return rows;
// };

// const generateId = async () => {
//   const [rows] = await connection.execute(
//     'INSERT INTO StoreManager.sales () VALUES ()',
//   );
//   return rows;
// };
// // Model construído com a ajuda do aluno Gustavo Inácio.

// module.exports = {
//   getAllSales,
//   // getSaleById,
//   createSale,
//   generateId,
// };
