import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { ResponseWrapper } from '../utils/responseWrapper';
import { isValid, parseISO } from 'date-fns';
import { getVehicleState } from '../services/vehicle';

/**
 * Get state of the vehicle at time
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export async function getVehicleStateAtTimestamp(_req: Request, res: Response) {
    const vehicleId: string = _req?.params?.vehicleId;
    const timestamp = _req?.query?.timestamp as string;

    const response: ResponseWrapper = new ResponseWrapper(res);
    const parsedTimestamp = parseISO(timestamp);
    try {
        if (isValid(parsedTimestamp)) {
            const dateTime: Date = parsedTimestamp;
            return await response.ok({
                success: true,
                status: 200,
                data: await getVehicleState(vehicleId, dateTime),
            });
        } else {
            throw new Error('Invalid timestamp provided.');
        }
    } catch (error) {
        const e = error as Error;
        logger.error(`getVehicleState error: ${e.message}`);
        response.handle(
            {
                success: false,
                data: { status: 'error', message: e.message },
            },
            400,
        );
    }
}
