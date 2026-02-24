import AppError from "../error/AppError.js";
import {
  createPeople,
  deletedPeople,
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

export const deletePeopleController = async (req, res) => {
  const { status, message } = await deletedPeople(req.params.id);

  return res.status(status).json(message);
};
