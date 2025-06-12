import { StatusCodes } from 'http-status-codes';

import { createworkspaceservice } from '../service/workspaceservice.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successresponse
} from '../utils/errors/comman/response.js';

export const workspacecreatecontroller = async function (req, res) {
  try {
    const user = req.user;

    const response = await createworkspaceservice({
      ...req.body,
      owner: user
    });
    console.log('from conroller response', response);
    return res
      .status(StatusCodes.CREATED)
      .json(successresponse(response, 'Created Workspace'));
  } catch (error) {
    console.log('Controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
