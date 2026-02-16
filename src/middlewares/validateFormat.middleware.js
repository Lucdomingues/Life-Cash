import AppError from "../error/AppError.js";

const validateFormat = (schema) => {
  // criamos um middleware genérico para validar o formato das requisições
  return (req, _res, next) => {
    const result = schema.safeParse(req.body); // nosso schema irá receber o req.body para validar se for true ele retornará sucess=true se não retornará ZodError

    if (!result.success) {
      const parseMessage = JSON.parse(result.error.message); // esse message vem como string
      const message = parseMessage.map((e) => e.message)[0]; // dentro do message tem um array com outro message, acessamos ele aqui
      throw new AppError(400, message); // lançamos uma exceção para o middleware de erro global
    }

    // req.body = result.data;  no zod podemos alterar tipos, e retornamos o result com o tipo alterado, porém para essa requisição não será necessário
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
