import connection from "./connection.js";

export const insertLogs = async (event, entity, person_id) => {
  await connection.execute(
    `INSERT INTO logs (event, timestamp, entity, person_id) VALUES (?, CURRENT_TIMESTAMP, ?, ?)`,
    [event, entity, person_id],
  );
};

export const getLogs = async (person_id) => {
  const [logs] = await connection.execute(
    `SELECT * FROM logs WHERE person_id = ?;`,
    [person_id],
  );

  return logs;
};
