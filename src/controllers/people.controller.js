import { createPeople } from "../services/people.service.js";

export const createPeopleController = async (req, res) => {
  const { status, message } = await createPeople(req.body);

  return res.status(status).json(message);
};
