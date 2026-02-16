import connection from "./connection.js";

export const create = async ({ first_name, last_name, email, phone }) => {
  const [results] = await connection.execute(
    "INSERT INTO people (first_name, last_name, email, phone) VALUES (?, ?, ?, ?);",
    [first_name, last_name, email, phone],
  );

  return results.insertId;
};
