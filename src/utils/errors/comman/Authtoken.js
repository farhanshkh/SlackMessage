import jwt from 'jsonwebtoken';

import { JWT_EXPIRY, JWT_SECRET } from '../../../config/serverconfig.js';

// export const createtoken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, {
//     expiresIn: JWT_EXPIRY
//   });
// };

export const createtoken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY
  });
};
