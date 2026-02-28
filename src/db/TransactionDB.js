import connection from "./connection.js";

export const get = async () => {
  const [results] = await connection.execute("SELECT * FROM transactions;");

  return results;
};
