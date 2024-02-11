import express from 'express';

import { wrapper } from '../utils/exceptionWrapper';
import { healthCheck } from '../controllers/healthcheck';

const router = express.Router();

router.get('/', wrapper(healthCheck));

export default router;
