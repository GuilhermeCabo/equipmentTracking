export class AppError {
  constructor({ statusCode, message, errorType }) {
    this.statusCode = statusCode;
    this.message = message;
    this.errorType = errorType;
  }
}
