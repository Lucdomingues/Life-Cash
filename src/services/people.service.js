import { create, getAll, getById, update } from "../db/PeopleDB.js";
import AppError from "../error/AppError.js";

export const getPeople = async () => {
  const peoples = await getAll();

  if (peoples.length === 0) {
    // se não houver cadastros responderá com erro
    throw new AppError(404, "Pessoas não encontradas!");
  }

  return { status: 200, message: peoples };
};

export const getPeopleId = async (id) => {
  const [people] = await getById(id);

  if (people === undefined) {
    // se não houver pessoa retornará um erro
    return { status: 404, message: "Pessoa não encontrada!" };
  }

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

  const bodyPeople = { id: createdPeople, ...body }; // Cria um objeto relacionando seu respectivo id com suas informações para a Response

  return { status: 201, message: bodyPeople };
};

export const updatePeople = async (body, id) => {
  const { status, message } = await getPeopleId(id); // busca a pessoa pelo id para verificar se realmente existe

  if (status === 404) throw new AppError(status, message); // lança erro caso não exista

  const keys = Object.keys(body).map((e) => `${e} = ?`); // pegamos a chave e tranformamos cada chave com valor ? para se adequar a query sql
  const transformKeyString = keys.toString(", "); // tranformamos em string com espaço, já podemos inserir na query
  const value = Object.values(body); // pegamos os valores
  value.push(id); // adicionamos o id ao final dele para se adequar a query sql

  await update(transformKeyString, value);

  return { status: 200, message: "Atualizado com sucesso!" };
};
