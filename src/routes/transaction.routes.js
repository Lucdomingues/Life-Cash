import express from "express";
import {
  createTransactionController,
  deleteTransactionController,
  getAllController,
} from "../controllers/transaction.controller.js";
import { validateFormat } from "../middlewares/index.js";
import { transactionCreateSchema } from "../middlewares/schemas/transaction.schema.js";
import { idSchema } from "../middlewares/schemas/id.schema.js";

const routes = express.Router();

routes.get("/", getAllController);
routes.post(
  "/",
  validateFormat(transactionCreateSchema, "body"),
  createTransactionController,
);
routes.delete(
  "/:id",
  validateFormat(idSchema, "params"),
  deleteTransactionController,
);

export default routes;
