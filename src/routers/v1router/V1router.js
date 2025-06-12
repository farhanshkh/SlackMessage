import express from 'express';

import userrouter from './users.js';
import workspacerouter from './workspace.js';

const router = express.Router();
router.use('/users', userrouter);
router.use('/workspace', workspacerouter);

export default router;
