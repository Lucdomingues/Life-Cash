import express from "express";
import {
  activePeopleController,
  createPeopleController,
  deletePeopleController,
  getLogPeopleController,
  getPeopleController,
  getPeopleIdController,
  updatePeopleController,
} from "../controllers/people.controller.js";
import { validateFormat } from "../middlewares/index.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../middlewares/schemas/people.schema.js";
import { idSchema } from "../middlewares/schemas/id.schema.js";

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

router.patch(
  "/:id/deactivate",
  validateFormat(idSchema, "params"),
  deletePeopleController,
);

router.patch(
  "/:id/activate",
  validateFormat(idSchema, "params"),
  activePeopleController,
);

router.get(
  "/:id/logs",
  validateFormat(idSchema, "params"),
  getLogPeopleController,
);

export default router;
