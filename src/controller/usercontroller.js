import { StatusCodes } from 'http-status-codes';

import { signinservice, userservice } from '../service/userservices.js';
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

export const signin = async function (req, res) {
  try {
    const response = await signinservice(req.body);
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'Successfully Login'));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
