import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/errors/comman/response.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('Zod validation', error);
      let explanation = [];
      let errormessage = '';
      console.log('value', error.message);
      console.log('received', error.received);

      error.errors.forEach((keys) => {
        explanation.push(keys.path[0] + ':' + keys.message);
        errormessage += ':' + keys.path[0] + ':' + keys.message;
      });
      //   console.log(error.error);
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errormessage,
          explanation: explanation
        })
      );
    }
  };
};
