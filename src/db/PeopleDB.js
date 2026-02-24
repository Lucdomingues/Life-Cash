import connection from "./connection.js";

export const getAll = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM people WHERE deleted_at IS NULL;",
  );

  return results;
};

export const getById = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM people WHERE id = ? AND deleted_at IS NULL;",
    [id],
  );

  return result;
};

export const getByEmail = async (email) => {
  const [result] = await connection.execute(
    "SELECT * FROM people WHERE email = ? AND deleted_at IS NULL;",
    [email],
  );

  return result;
};

export const create = async (keys, values, questions) => {
  const [results] = await connection.execute(
    `INSERT INTO people (${keys}) VALUES (${questions});`,
    values,
  );

  return results.insertId;
};

export const update = async (keys, values) => {
  const [results] = await connection.execute(
    `UPDATE people SET ${keys} WHERE id = ? AND deleted_at IS NULL`, // keys já vem no formato nome-da-key=?
    values, // value já vem no formato de array com os valores nas posições corretas inclusive o id
  );

  return results;
};

export const deleted = async (id) => {
  const [result] = await connection.execute(
    `UPDATE people SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`, // pega o timestamp do próprio banco, convertido para a formatação correta
    [id],
  );

  return result;
};
