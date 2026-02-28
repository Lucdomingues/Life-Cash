import express from "express";
import {
  createTransactionController,
  getAllController,
} from "../controllers/transaction.controller.js";
import { validateFormat } from "../middlewares/index.js";
import { transactionCreateSchema } from "../middlewares/schemas/transaction.schema.js";

const routes = express.Router();

routes.get("/", getAllController);
routes.post(
  "/",
  validateFormat(transactionCreateSchema, "body"),
  createTransactionController,
);

export default routes;
