import express from 'express';

import { getworkspacebychannelid } from '../../controller/channelcontroller.js';
import { IsAuthenticate } from '../../middleware/Authmiddleware.js';

const router = express.Router();
router.get('/:channelid', IsAuthenticate, getworkspacebychannelid);

export default router;
