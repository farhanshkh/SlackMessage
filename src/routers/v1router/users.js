import express from 'express';

import { signin, signup } from '../../controller/usercontroller.js';
import {
  UserSigninSchema,
  UserSignupSchema
} from '../../validation/userSchemaSignup.js';
import { validate } from '../../validation/zodvalidation.js';

const router = express.Router();

router.post('/signup', validate(UserSignupSchema), signup);

router.post('/signin', validate(UserSigninSchema), signin);

export default router;
