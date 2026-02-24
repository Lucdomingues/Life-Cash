import connection from "./connection.js";

const insertLogs = async (event, person_id) => {
  await connection.execute(
    `INSERT INTO logs (event, timestamp, person_id) VALUES (?, CURRENT_TIMESTAMP, ?)`,
    [event, person_id],
  );
};

export default insertLogs;
