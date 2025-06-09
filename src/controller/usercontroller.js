import { StatusCodes } from 'http-status-codes';

import { userservice } from '../service/userservices.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successresponse
} from '../utils/errors/comman/response.js';

export async function signup(req, res) {
  try {
    const user = await userservice(req.body);
    // console.log(user);
    return res
      .status(StatusCodes.CREATED)
      .json(successresponse(user, 'User Created Successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
}
