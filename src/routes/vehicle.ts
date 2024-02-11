import express from 'express';

import { wrapper } from '../utils/exceptionWrapper';
import { getVehicleStateAtTimestamp } from '../controllers/vehicle';

const router = express.Router();

router.get('/:vehicleId/state-at-timestamp', wrapper(getVehicleStateAtTimestamp));

export default router;
