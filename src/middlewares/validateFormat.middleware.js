import AppError from "../error/AppError.js";

const validateFormat = (schema, property = "body") => {
  // criamos um middleware genérico para validar o formato das requisições
  return (req, _res, next) => {
    const result = schema.safeParse(req[property]); // nosso schema irá receber o req.propriedade para validar se for true ele retornará sucess=true se não retornará ZodError

    if (!result.success) {
      const message = result.error.issues[0].message; // pagamos a mensagem de erro
      throw new AppError(400, message); // lançamos uma exceção para o middleware de erro global
    }

    // req.body = result.data; // no zod podemos alterar tipos, e retornamos o result com o tipo alterado
    next();
  };
};

// zod retornará se for sucesso:
// {
//   success: true,
//   data: { ... }
// }
// ou se for erro:
// {
//   success: false,
//   error: ...
// }

export default validateFormat;
