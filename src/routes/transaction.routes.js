import express from "express";
import {
  createTransactionController,
  getAllController,
} from "../controllers/transaction.controller.js";

const routes = express.Router();

routes.get("/", getAllController);
routes.post("/", createTransactionController);

export default routes;
