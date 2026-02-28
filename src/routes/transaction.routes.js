import express from "express";
import { getAllController } from "../controllers/transaction.controller.js";

const routes = express.Router();

routes.get("/", getAllController);

export default routes;
