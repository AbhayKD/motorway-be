import { Router } from 'express';

import healthCheck from './healthcheck';
import vehicleLive from './vehicle';

const router = Router();

router.use('/healthcheck', healthCheck);
router.use('/vehicle', vehicleLive);

export default router;
