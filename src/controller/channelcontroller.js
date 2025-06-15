import { StatusCodes } from 'http-status-codes';

import { getworkspacebychannelidservice } from '../service/channelservice.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successresponse
} from '../utils/errors/comman/response.js';

export const getworkspacebychannelid = async function (req, res) {
  try {
    const response = await getworkspacebychannelidservice(
      req.params.channelid,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'Successfully fetch data'));
  } catch (error) {
    console.log('error from channel controller', error);
    if (error.StatusCode) {
      return res.status(error.StatusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
