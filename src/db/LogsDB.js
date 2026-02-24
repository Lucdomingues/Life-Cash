import connection from "./connection.js";

const insertLogs = async (event, person_id) => {
  await connection.execute(
    `INSERT INTO logs (event, timestamp, person_id) VALUES (?, ?, ?)`,
    [event, new Date(), person_id],
  );
};

export default insertLogs;
