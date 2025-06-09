import express from 'express';

import userrouter from './users.js';

const router = express.Router();
router.use('/users', userrouter);

export default router;
