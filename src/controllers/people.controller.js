import AppError from "../error/AppError.js";
import {
  createPeople,
  getPeople,
  getPeopleId,
  updatePeople,
} from "../services/people.service.js";

export const getPeopleController = async (_req, res) => {
  const { status, message } = await getPeople();

  return res.status(status).json(message);
};

export const getPeopleIdController = async (req, res) => {
  const { status, message } = await getPeopleId(req.params.id);

  if (status === 404) {
    throw new AppError(404, "Pessoa não encontrada!");
  }

  return res.status(status).json(message);
};

export const createPeopleController = async (req, res) => {
  const { status, message } = await createPeople(req.body);

  return res.status(status).json(message);
};

export const updatePeopleController = async (req, res) => {
  const { status, message } = await updatePeople(req.body, req.params.id);

  return res.status(status).json(message);
};
