import { AppError } from './appError.js';

export class Internal extends AppError {
  constructor() {
    super({
      statusCode: 500,
      message: 'Internal server error',
      errorType: 'Internal',
    });
  }
}
