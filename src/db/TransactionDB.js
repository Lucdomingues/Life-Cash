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
