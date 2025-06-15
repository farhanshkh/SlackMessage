import express from 'express';

import channelrouter from './channel.js';
import userrouter from './users.js';
import workspacerouter from './workspace.js';

const router = express.Router();
router.use('/users', userrouter);
router.use('/workspace', workspacerouter);
router.use('/channel', channelrouter);

export default router;
