import { AppError } from '../../domain/errors/appError.js';

const asyncHandler = (fn) => (request, response) =>
  Promise.resolve(fn(request, response)).catch((error) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        errorType: error.errorType,
        message: error.message,
      });
    }

    return response.status(500).json({ message: 'Internal server error' });
  });

export default asyncHandler;
