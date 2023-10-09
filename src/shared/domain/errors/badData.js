import { AppError } from './appError.js';

export class BadData extends AppError {
  constructor(message = 'Bad data') {
    super({ statusCode: 400, message, errorType: 'Bad data' });
    console.log(this);
  }
}
