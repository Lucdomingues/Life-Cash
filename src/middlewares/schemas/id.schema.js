import { z } from "zod";

// criando schema para validar se id é um número válido
export const idSchema = z.object({
  id: z.coerce.number("O identificador precisa ser um número!"), // coerce tranforma o tipo para o especificado, depois valida o tipo
});
