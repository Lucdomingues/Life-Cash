import { getAll } from "../services/transaction.service.js";

export const getAllController = async (_req, res) => {
  const { status, message } = await getAll();

  return res.status(status).json(message);
};
