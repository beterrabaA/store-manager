const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (passenger) => {
  const columns = Object.keys((passenger)).join(', ');

  const placeholders = Object.keys(passenger)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(passenger)],
  );

  return insertId;
};

const update = async (newName, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id = ?;',
    [newName, id],
  );

  return result;
};

const delProc = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  delProc,
  findAll,
  findById,
  insert,
  update,
};