import { create, get } from "../db/TransactionDB.js";
import AppError from "../error/AppError.js";

export const getAll = async () => {
  const result = await get();

  if (result.length === 0)
    throw new AppError(404, "Transações não encontradas!");

  return { status: 200, message: result };
};

export const createTransaction = async (body) => {
  const keys = Object.keys(body).toString(", "); // Pegamos as chaves do objeto e transformamos o arrays que é retornado em string separadas por vírgula
  const values = Object.values(body); // pegamos os valores apenas e recebemos em um array, aproveitamos do array para mandar a quantidade de parameters marker suficiente para a query
  const parametersMarker = values.map(() => "?").toString(", "); // retorna uma string que representará parameter Marker no sql

  const result = await create(keys, parametersMarker, values);

  const bodyReturn = { id: result.insertId, ...body }; // retornamos nova transação sem precisamos consultar no db

  return { status: 201, message: bodyReturn };
};
