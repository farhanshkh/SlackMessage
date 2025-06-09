import express from 'express';

import { signup } from '../../controller/usercontroller.js';
import { UserSignupSchema } from '../../validation/userSchemaSignup.js';
import { validate } from '../../validation/zodvalidation.js';

const router = express.Router();

router.post('/signup', validate(UserSignupSchema), signup);

export default router;
