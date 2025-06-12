import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverconfig.js';
import userRepository from '../Repositories/userrepositories.js';
import {
  customErrorResponse,
  internalErrorResponse
} from '../utils/errors/comman/response.js';

export const IsAuthenticate = async function (req, res, next) {
  try {
    const token = req.headers['access-token'];

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid Token provided',
          explanation: 'Invalid data sent from clinet side'
        })
      );
    }

    const response = jwt.verify(token, JWT_SECRET);

    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid Token provided',
          explanation: 'Invalid data sent from clinet side'
        })
      );
    }
    const user = await userRepository.getById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    console.log('Middleware error', error);
    if (error.name === 'JsonWebTokenError') {
      console.log('Inside webtoken');
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid Token provided',
          explanation: 'Invalid data sent from clinet side'
        })
      );
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
