import express from "express";
import {
  createPeopleController,
  deletePeopleController,
  getPeopleController,
  getPeopleIdController,
  updatePeopleController,
} from "../controllers/people.controller.js";
import { validateFormat } from "../middlewares/index.js";
import {
  createUserSchema,
  idSchema,
  updateUserSchema,
} from "../middlewares/schemas/people.schema.js";

const router = express.Router(); // criamos um mini projeto de rotas, com várias funções para que possamos trabalhar com rotas

router.get("/", getPeopleController);
router.get("/:id", validateFormat(idSchema, "params"), getPeopleIdController);
router.post(
  "/",
  validateFormat(createUserSchema, "body"),
  createPeopleController,
);
router.put(
  "/:id",
  validateFormat(idSchema, "params"),
  validateFormat(updateUserSchema, "body"),
  updatePeopleController,
);

router.delete(
  "/:id",
  validateFormat(idSchema, "params"),
  deletePeopleController,
);

export default router;
