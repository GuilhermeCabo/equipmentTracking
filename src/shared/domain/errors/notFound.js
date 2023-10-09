import { AppError } from './appError.js';

export class NotFound extends AppError {
  constructor(entity) {
    super({
      statusCode: 404,
      message: `${entity} not found!`,
      errorType: 'Not found',
    });
  }
}
