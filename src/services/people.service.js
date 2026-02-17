import { create, getAll, getById } from "../db/PeopleDB.js";
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
