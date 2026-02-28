import { getAll, createTransaction } from "../services/transaction.service.js";

export const getAllController = async (_req, res) => {
  const { status, message } = await getAll();

  return res.status(status).json(message);
};

export const createTransactionController = async (req, res) => {
  const { status, message } = await createTransaction(req.body);

  return res.status(status).json(message);
};
