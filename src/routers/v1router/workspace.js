import express from 'express';

import { workspacecreatecontroller } from '../../controller/workspacecontroller.js';
import { IsAuthenticate } from '../../middleware/Authmiddleware.js';
import { workspaceschema } from '../../validation/workspaceschema.js';
import { validate } from '../../validation/zodvalidation.js';

const router = express.Router();

router.post(
  '/',
  IsAuthenticate,
  validate(workspaceschema),
  workspacecreatecontroller
);

export default router;
