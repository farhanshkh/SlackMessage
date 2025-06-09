import { StatusCodes } from 'http-status-codes';

class ValidationError extends Error {
  constructor(errorDetials, message) {
    super(message);
    this.name = 'ValidationError';
    let explanation = [];
    Object.keys(errorDetials.error).forEach((key) => {
      explanation.push(errorDetials.error[key]);
    });

    this.explanation = explanation;
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
