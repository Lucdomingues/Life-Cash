import z from "zod";
import Decimal from "decimal.js";

export const transactionCreateSchema = z.object({
  name: z.string("É necessário o campo name e que seja uma string!"),
  description: z
    .string("É necessário que description seja uma string")
    .optional(),
  price: z
    .number("O campo price precisa ser um número!")
    .positive("O campo price precisa ser um número positivo!")
    .refine(
      (val) => {
        const prD = new Decimal(val); // garante precisão exata para pontos flutuantes ou vírgulas

        return prD.decimalPlaces() <= 2; // decimalPlaces propriedade que retorna o número de casa decimais, se o número for maior ou que 2 retorna false
      },
      { message: "O campo price deve ter no máximo 2 casas decimais!" },
    ),
  type: z.enum(
    ["despesa", "renda"],
    "O campo type deve ter despesa ou renda apenas!",
  ),
  person_id: z.number("O campo person_id deve ser um número!"),
});
