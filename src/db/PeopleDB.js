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
  console.log(result);

  return result;
};

export const create = async ({ first_name, last_name, email, phone }) => {
  const [results] = await connection.execute(
    "INSERT INTO people (first_name, last_name, email, phone) VALUES (?, ?, ?, ?);",
    [first_name, last_name, email, phone],
  );

  return results.insertId;
};
