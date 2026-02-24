import { insertLogs, getLogs } from "../db/LogsDB.js";
import {
  actived,
  create,
  disabled,
  getAll,
  getById,
  update,
} from "../db/PeopleDB.js";
import AppError from "../error/AppError.js";

export const getPeople = async () => {
  const peoples = await getAll();

  if (peoples.length === 0) throw new AppError(404, "Pessoas não encontradas!"); // se não houver cadastros responderá com erro

  return { status: 200, message: peoples };
};

export const getPeopleId = async (id) => {
  const [people] = await getById(id);

  if (people === undefined) throw new AppError(404, "Pessoa não encontrada!"); // se não houver pessoa retornará um erro

  return { status: 200, message: people };
};

export const createPeople = async (body) => {
  const keys = Object.keys(body);
  const transformKeyString = keys.toString(", ");
  const value = Object.values(body);
  const tranformQuestion = value.map(() => "?").toString(", ");

  const createdPeople = await create(
    transformKeyString,
    value,
    tranformQuestion,
  ); // a validação se o usuário já existe está no mapErrorSql.js

  await insertLogs("CREATED_PEOPLE", "people", createdPeople); // inseri log para registrar no histórico a criação dessa pessoa

  const bodyPeople = { id: createdPeople, ...body }; // Cria um objeto relacionando seu respectivo id com suas informações para a Response

  return { status: 201, message: bodyPeople };
};

export const updatePeople = async (body, id) => {
  const keys = Object.keys(body).map((e) => `${e} = ?`); // pegamos a chave e tranformamos cada chave com valor ? para se adequar a query sql
  const transformKeyString = keys.toString(", "); // tranformamos em string com espaço, já podemos inserir na query
  const value = Object.values(body); // pegamos os valores
  value.push(id); // adicionamos o id ao final dele para se adequar a query sql

  const updated = await update(transformKeyString, value);

  if (updated.affectedRows === 0)
    throw new AppError(404, "Pessoa não encontrada"); // lança erro caso não exista

  await insertLogs("UPDATED_PEOPLE", "people", id); // inseri log para registrar no histórico a atualização dessa pessoa

  return { status: 200, message: "Atualizado com sucesso!" };
};

export const deletedPeople = async (id) => {
  const del = await disabled(id);

  if (del.affectedRows === 0)
    throw new AppError(404, "Pessoa não encontrada ou desabilitada!"); // lança erro caso não exista

  await insertLogs("DELETED_PEOPLE", "people", id); // inseri log para registrar no histórico a desativação dessa pessoa

  return { status: 200, message: "Desativado com sucesso!" };
};

export const activedPeople = async (id) => {
  const act = await actived(id);

  if (act.affectedRows === 0)
    throw new AppError(404, "Pessoa não encontrada ou já está ativa!"); // lança erro caso não exista

  await insertLogs("ACTIVED_PEOPLE", "people", id); // inseri log para registrar no histórico a desativação dessa pessoa

  return { status: 200, message: "Ativada com sucesso!" };
};

export const getPeopleLogs = async (id) => {
  const logs = await getLogs(id, "people");

  if (logs.length === 0) throw new AppError(404, "Logs não encontrados!"); // lança erro caso não exista

  return { status: 200, message: logs };
};
