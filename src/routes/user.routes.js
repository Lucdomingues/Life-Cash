import express from "express";
import {
  createPeopleController,
  getPeopleController,
  getPeopleIdController,
} from "../controllers/people.controller.js";
import { validateFormat } from "../middlewares/index.js";
import { createUserSchema } from "../middlewares/schemas/people.schema.js";

const router = express.Router(); // criamos um mini projeto de rotas, com várias funções para que possamos trabalhar com rotas

router.get("/", getPeopleController);
router.get("/:id", getPeopleIdController);
router.post("/", validateFormat(createUserSchema), createPeopleController);

export default router;
