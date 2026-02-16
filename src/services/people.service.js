import { create } from "../db/PeopleDB.js";
import AppError from "../error/AppError.js";

export const createPeople = async (body) => {
  try {
    const createdPeople = await create(body);

    const bodyPeople = { id: createdPeople, ...body };

    return { status: 201, message: bodyPeople };
  } catch (err) {
    throw new AppError(400, `Erro ao criar a pessoa! Error: ${err.message}`);
  }
};
