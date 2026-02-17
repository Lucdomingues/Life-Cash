import AppError from "./AppError.js";
import mapErrorSql from "./mapErrorSql.js";

const handlerGlobalError = (err, _req, res, _next) => {
  // com o middleware de erro global não precisamos de try/catch em nosso controller
  const errorSql = mapErrorSql(err); // mapeamento de erros vindos do mysql com base no code status
  if (errorSql) {
    // se o erro for truthy retorna esse erro
    return res.status(errorSql.status).json({ message: errorSql.message });
  }
  if (err instanceof AppError) {
    // error é uma instância da classe AppError, se for significa que é um erro definido no service, se não é um erro de servidor
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err.message);

  return res.status(500).json({ message: "Erro no servidor interno!" });
};

export default handlerGlobalError;
