import "dotenv/config";
import express from "express";
import { peopleRoutes, transactioRoutes } from "./routes/index.js";
import handlerGlobalError from "./error/middlewareError.js";

const app = express();

app.use(express.json()); // usamos o middleware json para trabalharmos com json
app.use("/people", peopleRoutes); // definimos aqui a rota de pessoas
app.use("/transaction", transactioRoutes); // definimos a rota transaction
app.use(handlerGlobalError); // middleware global de error, com o middleware de erro global não precisamos de try/catch em nosso controller

export default app;
