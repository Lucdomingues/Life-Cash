import { get } from "../db/TransactionDB.js";
import AppError from "../error/AppError.js";

export const getAll = async () => {
  const result = await get();

  if (result.length === 0)
    throw new AppError(404, "Transações não encontradas!");

  return { status: 200, message: result };
};
