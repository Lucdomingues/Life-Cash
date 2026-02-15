import "dotenv/config";
import mysql2 from "mysql2/promise";

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST || "database",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "secret",
  database: process.env.MYSQL_DATABASE || "api_data",
  waitForConnections: true, // esperar caso o limite de conexões for atingido
  connectionLimit: 10, // limite de 10 conexões simultâneas
  queueLimit: 0, // limite ilimitado de conexões em espera
});

export default connection;
