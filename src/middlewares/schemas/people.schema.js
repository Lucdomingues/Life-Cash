import { z } from "zod";
// criando schema para validar o formato para create
export const createUserSchema = z.object({
  first_name: z
    .string("Nome precisa ser uma string!")
    .min(1, "Nome é obrigatório!"), // valida se é string, se existe e se tem no mínimo um caracter
  last_name: z
    .string("Sobrenome precisa ser uma string!")
    .min(1, "Sobrenome é obrigatório!"), // valida se é string, se existe e se tem no mínimo um caracter
  email: z.email("Email precisa estar em um formato válido!"), // Valida que é um email válido, string, existe
  phone: z.string("Telefone precisa ser uma string!").optional(), // Validade se é string e é opcional
  // active: z.boolean("É necessário ser um boolean"),
});
export const updateUserSchema = z.object({
  first_name: z
    .string("Nome precisa ser uma string!")
    .min(1, "Nome é obrigatório!")
    .optional(), // valida se é string, se existe e se tem no mínimo um caracter
  last_name: z
    .string("Sobrenome precisa ser uma string!")
    .min(1, "Sobrenome é obrigatório!")
    .optional(), // valida se é string, se existe e se tem no mínimo um caracter
  email: z.email("Email precisa estar em um formato válido!").optional(), // Valida que é um email válido, string, existe
  phone: z.string("Telefone precisa ser uma string!").optional(), // Validade se é string e é opcional
  // active: z.boolean("É necessário ser um boolean").optional(),
});
// criando schema para validar se id é um número válido
export const idSchema = z.object({
  id: z.coerce.number("O identificador precisa ser um número!"), // coerce tranforma o tipo para o especificado, depois valida o tipo
});
