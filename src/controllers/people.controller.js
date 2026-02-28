import {
  activedPeople,
  createPeople,
  deletedPeople,
  getPeople,
  getPeopleId,
  getPeopleLogs,
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

export const activePeopleController = async (req, res) => {
  const { status, message } = await activedPeople(req.params.id);

  return res.status(status).json(message);
};

export const getLogPeopleController = async (req, res) => {
  const { status, message } = await getPeopleLogs(req.params.id);

  return res.status(status).json(message);
};
