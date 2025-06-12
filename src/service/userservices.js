import bycrpt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../Repositories/userrepositories.js';
import ClientError from '../utils/errors/Clienterror.js';
import { createtoken } from '../utils/errors/comman/Authtoken.js';
import ValidationError from '../utils/errors/validationerror.js';
export async function userservice(data) {
  try {
    const createusers = await userRepository.create(data);
    // console.log(createusers);
    return createusers;
  } catch (error) {
    console.log(`User service error`, error);

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
          error: ['A user with same email and username already exisit']
        },
        'A user with same email and username already exist '
      );
    }
  }
}

export const signinservice = async function (data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new ClientError({
        message: 'No registered user found with this email',
        explanation: 'Invalid details sent from Client side',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }
    const checkpassword = bycrpt.compareSync(data.password, user.password);
    //tocheckpassword you have to check current password and store password

    if (!checkpassword) {
      throw new ClientError({
        message: 'Password is Incorrect',
        explanation: 'Invalid details sent from client side',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
      token: createtoken({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('Signin service', error);
    throw error;
  }
};
