import express from "express";
import { createPeopleController } from "../controllers/people.controller.js";

const router = express.Router(); // criamos um mini projeto de rotas, com várias funções para que possamos trabalhar com rotas

router.post("/", createPeopleController);

export default router;
