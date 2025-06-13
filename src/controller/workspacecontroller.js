import { StatusCodes } from 'http-status-codes';

import {
  addmemebertoworkspaceservice,
  createworkspaceservice,
  deleteworkspaceservice,
  getallworkspacebymemberidservice,
  getworkspacebyjoincodeservie,
  getworkspaceservice,
  updateworkspaceservice
} from '../service/workspaceservice.js';
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

export const getworkspacecontrollerbymemberid = async (req, res) => {
  try {
    const response = await getallworkspacebymemberidservice(req.user);
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'Successfully fetch record'));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const deleteworkspacecontroller = async (req, res) => {
  try {
    const response = await deleteworkspaceservice(
      req.params.workspaceid,
      req.user
    );
    console.log(response);
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'User Deleted Successfully'));
  } catch (error) {
    console.log('error from controller', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getworksapcecontroller = async (req, res) => {
  try {
    const response = await getworkspaceservice(
      req.params.workspaceid,
      req.user
    );
    console.log('value from controller getbyid', response);
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'succussfully fetch'));
  } catch (error) {
    console.log('controller of getworksapcecontroller', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const getworkspacebyjoincodecontroller = async function (req, res) {
  try {
    const response = await getworkspacebyjoincodeservie(
      req.params.joincode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'succussfully fetch'));
  } catch (error) {
    console.log(`controller from service layer`, error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const updateworkspacecontroller = async function (req, res) {
  try {
    const response = await updateworkspaceservice(
      req.params.workspaceId,
      req.body,
      req.user
    );
    console.log('response from workspace', response);
    return res
      .status(StatusCodes.OK)
      .json(successresponse(response, 'Updated Successfully'));
  } catch (error) {
    console.log(`controller update`, error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const addmemebertoworkspacecontroller = async function (req, res) {
  try {
    const response = await addmemebertoworkspaceservice(
      req.params.workspaceid,
      req.body.memberId,
      req.body.role
    );
    return res
      .status(StatusCodes.CREATED)
      .json(successresponse(response, 'Successfully added memnber'));
  } catch (error) {
    console.log(`controller addmember`, error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
