import {
  createPeople,
  getPeople,
  getPeopleId,
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
