import User from '../schema/users.js';
import crudrepositories from './crudrepositories.js';

// export const getUserByEmail = async function (email) {
//   const user = await User.findOne({ email });
//   return user;
// };

// export const getUserByUsername = async function (name) {
//   const users = await User.findOne({ name: username });
//   return users;
// };

const userRepository = {
  ...crudrepositories(User),
  getUserByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },
  getUserByUsername: async function (username) {
    const users = await User.findOne({ username }).select('-password'); // this will exclude the password from this fetch
    return users;
  }
};

export default userRepository;
