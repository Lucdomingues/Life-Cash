const mapErrorSql = (err) => {
  switch (err.code) {
    case "ER_DUP_ENTRY":
      return { status: 409, message: "Essa pessoa já está registrada!" };

    default:
      null;
  }
};

export default mapErrorSql;
