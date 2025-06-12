import { v4 as uuidv4 } from 'uuid';

import workspacerepositories from '../Repositories/workspacerepositories.js';
import ValidationError from '../utils/errors/validationerror.js';
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
