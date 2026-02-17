import express from "express";
import {
  createPeopleController,
  getPeopleController,
  getPeopleIdController,
} from "../controllers/people.controller.js";
import { validateFormat } from "../middlewares/index.js";
import {
  createUserSchema,
  idSchema,
} from "../middlewares/schemas/people.schema.js";

const router = express.Router(); // criamos um mini projeto de rotas, com várias funções para que possamos trabalhar com rotas

router.get("/", getPeopleController);
router.get("/:id", validateFormat(idSchema, "params"), getPeopleIdController);
router.post(
  "/",
  validateFormat(createUserSchema, "body"),
  createPeopleController,
);

export default router;
