import { StatusCodes } from 'http-status-codes';

import channelrepositories from '../Repositories/channelrepositories.js';
import ClientError from '../utils/errors/Clienterror.js';
import { ismemeberworkspace } from './workspaceservice.js';

export const getworkspacebychannelidservice = async function (channelid, user) {
  try {
    const response = await channelrepositories.getchannlebyid(channelid);
    // console.log(response.workspaceid);
    if (!response) {
      throw new ClientError({
        message: 'channel not found with provided id',
        explanation: 'Invalid data sent from client side',
        StatusCode: StatusCodes.NOT_FOUND
      });
    }
    const isuserpartofmember = ismemeberworkspace(response.workspaceid, user);
    if (!isuserpartofmember) {
      throw new ClientError({
        message: 'user is not a part of workspace',
        explanation: 'Invalid data sent from client side',
        StatusCode: StatusCodes.UNAUTHORIZED
      });
    }
    return response;
  } catch (error) {
    console.log('error from channel service', error);
    throw error;
  }
};
