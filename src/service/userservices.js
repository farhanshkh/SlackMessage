import userRepository from '../Repositories/userrepositories.js';
import ValidationError from '../utils/errors/validationerror.js';
// import ValidationError from '../utils/errors/validationerror.js';

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

// userservice();
