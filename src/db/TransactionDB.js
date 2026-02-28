import connection from "./connection.js";

export const get = async () => {
  const [results] = await connection.execute("SELECT * FROM transactions;");

  return results;
};

export const create = async (columns, n_values, values) => {
  const [result] = await connection.execute(
    `INSERT INTO transactions (${columns}) VALUES (${n_values});`,
    values,
  );

  return result;
};

export const deleted = async (id) => {
  const [person] = await connection.execute(
    "SELECT person_id FROM transactions WHERE id = ?;", // busca o person_id para registrar no log
    [id],
  );

  const [result] = await connection.execute(
    "DELETE FROM transactions WHERE id = ?;",
    [id],
  );

  return { person: person[0], result };
};
