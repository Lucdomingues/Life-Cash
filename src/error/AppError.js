export default class AppError extends Error {
  // herdamos a classe Error, para podermos personalizar nossos erros
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
