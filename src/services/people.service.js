import { create, getAll, getByEmail } from "../db/PeopleDB.js";
import AppError from "../error/AppError.js";

export const getPeople = async (id) => {
  const peoples = await getAll();

  if (peoples.length === 0) {
    // se não houver cadastros responderá com erro
    throw new AppError(404, "Pessoas não encontradas!");
  }

  return { status: 200, message: peoples };
};

export const createPeople = async (body) => {
  const createdPeople = await create(body);

  const bodyPeople = { id: createdPeople, ...body }; // Cria um objeto relacionando seu respectivo id com suas informações para a Response

  return { status: 201, message: bodyPeople };
};
