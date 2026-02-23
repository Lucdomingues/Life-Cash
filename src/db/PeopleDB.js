import connection from "./connection.js";

export const getAll = async () => {
  const [results] = await connection.execute("SELECT * FROM people;");

  return results;
};

export const getById = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM people WHERE id = ?;",
    [id],
  );

  return result;
};

export const getByEmail = async (email) => {
  const [result] = await connection.execute(
    "SELECT * FROM people WHERE email = ?;",
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
    `UPDATE people SET ${keys} WHERE id = ?`, // keys já vem no formato nome-da-key=?
    values, // value já vem no formato de array com os valores nas posições corretas inclusive o id
  );

  return results;
};
