const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
  return rows;
};

const getById = async ({ id }) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rows[0];
};

const create = async ({ name, quantity }) => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
