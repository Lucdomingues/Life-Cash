const mapErrorSql = (err) => {
  switch (err.code) {
    case "ER_DUP_ENTRY":
      return { status: 409, message: "Essa pessoa já está registrada!" };
    case "ER_NO_REFERENCED_ROW_2":
      return {
        status: 400,
        message:
          "Não é possível registrar com person_id inexistente na tabela referênciada!",
      };

    default:
      null;
  }
};

export default mapErrorSql;
