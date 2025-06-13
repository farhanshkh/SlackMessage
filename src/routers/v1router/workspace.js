import express from 'express';

import {
  addmemebertoworkspacecontroller,
  deleteworkspacecontroller,
  getworksapcecontroller,
  getworkspacebyjoincodecontroller,
  getworkspacecontrollerbymemberid,
  updateworkspacecontroller,
  workspacecreatecontroller
} from '../../controller/workspacecontroller.js';
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

router.get('/', IsAuthenticate, getworkspacecontrollerbymemberid);
router.delete('/:workspaceid', IsAuthenticate, deleteworkspacecontroller);
router.get('/:workspaceid', IsAuthenticate, getworksapcecontroller);
router.get('/join/:joincode', IsAuthenticate, getworkspacebyjoincodecontroller);
router.put('/:workspaceId', IsAuthenticate, updateworkspacecontroller);
router.put(
  '/:workspaceid/member',
  IsAuthenticate,
  addmemebertoworkspacecontroller
);

export default router;
