import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelrepositories from '../Repositories/channelrepositories.js';
import userRepository from '../Repositories/userrepositories.js';
import workspacerepositories from '../Repositories/workspacerepositories.js';
import ClientError from '../utils/errors/Clienterror.js';
import { customErrorResponse } from '../utils/errors/comman/response.js';
import ValidationError from '../utils/errors/validationerror.js';

const isvalidmemberandadmin = (workspace, userid) => {
  return workspace.member.find(
    (member) => member.memberId.toString() === userid && member.role === 'admin'
  );
};

const ismemeberworkspace = (workspace, userid) => {
  return workspace.member.find(
    (member) => member.memberId.toString() === userid
  );
};

const ischannelAlreadyPartofworkspace = (workspace, channelname) => {
  return workspace.channels.find(
    (channel) => channel.name.toLowerCase() === channelname.toLowerCase()
  );
};

export const createworkspaceservice = async function (workspacedata) {
  try {
    const joincode = uuidv4().substring(0, 6).toUpperCase();
    const response = await workspacerepositories.create({
      name: workspacedata.name,
      description: workspacedata.description,
      joincode
    });
    console.log('from service layer', response);

    await workspacerepositories.addmemebertoworkspace(
      response._id,
      workspacedata.owner,
      'admin'
    );

    const updatres = await workspacerepositories.addchanneltoworkspace(
      response._id,
      'general'
    );

    return updatres;
  } catch (error) {
    console.log('error from servicelayer', error);

    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['Workspace of the same name is already exist']
        },
        'Workspace of the same name is already exist'
      );
    }
  }
};

export const getallworkspacebymemberidservice = async function (userid) {
  try {
    const response =
      await workspacerepositories.fetchallworkspacebymemberid(userid);
    console.log(response);
    return response;
  } catch (error) {
    console.log('error from workspace', error);
    throw error;
  }
};

export const deleteworkspaceservice = async function (workspaceid, userid) {
  const response = await workspacerepositories.getById(workspaceid);
  if (!response) {
    throw new ClientError({
      explanation: 'Invalid data sent from clinent',
      message: 'workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }
  const isAllowed = isvalidmemberandadmin(response, userid);
  console.log('value of isallowed', isAllowed);
  if (isAllowed) {
    await channelrepositories.deletemany(response.channels);
    const workspacedelete = await workspacerepositories.delete(workspaceid);
    return workspacedelete;
  }

  throw new ClientError({
    explanation: 'User is not an admin of the workspace',
    message: 'User is not an admin of the workspace',
    statusCode: StatusCodes.UNAUTHORIZED
  });
};

export const getworkspaceservice = async function (workspaceid, userid) {
  try {
    const workspace = await workspacerepositories.getById(workspaceid);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from clinet',
        message: 'Workspace is not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const ismember = ismemeberworkspace(workspace, userid);
    // console.log(ismember);

    if (!ismember) {
      throw new ClientError({
        explanation: 'invalid data sent from client side',
        message: 'User is not a member',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }
    return workspace;
  } catch (error) {
    console.log('getworkspacebyid', error);
    throw error;
  }
};

export const getworkspacebyjoincodeservie = async (joincode, userid) => {
  try {
    const workspace =
      await workspacerepositories.getworkspacebyjoincode(joincode);
    const ismember = ismemeberworkspace(workspace, userid);
    // console.log(ismember);

    if (!ismember) {
      throw new ClientError({
        explanation: 'invalid data sent from client side',
        message: 'User is not a member',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }
    return workspace;
  } catch (error) {
    console.log('error from getworkspacebyjoincode', error);
    throw error;
  }
};

export const updateworkspaceservice = async function (
  workspaceid,
  workspacedata,
  userid
) {
  try {
    const workspace = await workspacerepositories.getById(workspaceid);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from clinet',
        message: 'Workspace is not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const ismemberadmin = isvalidmemberandadmin(workspace, userid);
    console.log(ismemberadmin);
    if (!ismemberadmin) {
      throw new customErrorResponse({
        explanation: 'invalid data sent from client side',
        message: 'A member is not admin',
        StatusCodes: StatusCodes.UNAUTHORIZED
      });
    }
    const updateworkspace = await workspacerepositories.update(
      workspaceid,
      workspacedata
    );
    return updateworkspace;
  } catch (error) {
    console.log('error from updateservice layer', error);
    throw error;
  }
};

export const addmemebertoworkspaceservice = async function (
  workspaceid,
  memberid,
  role
) {
  try {
    const workspace = await workspacerepositories.getById(workspaceid);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from clinet',
        message: 'Workspace is not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isvaliduser = await userRepository.getById(memberid);
    if (!isvaliduser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const ismember = ismemeberworkspace(workspace, memberid);
    if (ismember) {
      throw new ClientError({
        explanation: 'invalid data sent from client side',
        message: 'User is already a member of the workspace',
        StatusCode: StatusCodes.FORBIDDEN
      });
    }
    const addmember = workspacerepositories.addmemebertoworkspace(
      workspaceid,
      memberid,
      role
    );
    return addmember;
  } catch (error) {
    console.log('error from addmember', error);
    throw error;
  }
};

export const addchanneltoworkspaceservice = async function (
  workspaceid,
  channelname
) {
  try {
    const workspace =
      await workspacerepositories.getworkspacedetailsbyid(workspaceid);

    if (!workspace) {
      throw new ClientError({
        message: 'workspace is invalid',
        explanation: 'Invalid data is sent from clinet',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const ischannel = ischannelAlreadyPartofworkspace(workspace, channelname);
    if (!ischannel) {
      throw new ClientError({
        message: 'workspace is invalid',
        explanation: 'Invalid data is sent from client',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const response = await workspacerepositories.addchanneltoworkspace(
      workspaceid,
      channelname
    );
    return response;
  } catch (error) {
    console.log('addchannel repositories', error);
    throw error;
  }
};
