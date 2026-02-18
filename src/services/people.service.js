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
    throw new AppError(404, "Pessoa não encontradas!");
  }

  return { status: 200, message: people };
};

export const createPeople = async (body) => {
  const createdPeople = await create(body);

  const bodyPeople = { id: createdPeople, ...body }; // Cria um objeto relacionando seu respectivo id com suas informações para a Response

  return { status: 201, message: bodyPeople };
};

export const updatePeople = async (body, id) => {
  const keys = Object.keys(body).map((e) => `${e} = ?`); // pegamos a chave e tranformamos cada chave com valor ? para se adequar a query sql
  const transformKeyString = keys.toString(", "); // tranformamos em string com espaço, já podemos inserir na query
  const value = Object.values(body); // pegamos os valores
  value.push(id); // adicionamos o id ao final dele para se adequar a query sql

  const updatedPeople = await update(transformKeyString, value);

  return { status: 200, message: "Atualizado com sucesso!" };
};
