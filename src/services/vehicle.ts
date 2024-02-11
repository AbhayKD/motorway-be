import { aquery } from '../utils/dbUtil';
import { formatDateWithOffset } from '../utils/helpers';
import { VehicleStateAtTimestampResponse } from '../types';

export function responseObject(data: any) {
    return {
        id: data.id,
        username: data.username,
        userType: 'admin',
    };
}

/**
 * Get vehicle state at timestamp
 * @param vehicleId
 * @param timestamp
 * @returns
 */
export async function getVehicleState(
    vehicleId: string,
    timestamp: Date,
): Promise<VehicleStateAtTimestampResponse | null | Error> {
    try {
        const sql = `SELECT 
                        "stateLogs"."state" AS state,
                        "stateLogs"."timestamp" AS timestamp,
                        "vehicles"."id" AS vehicleId,
                        "vehicles"."make" AS make,
                        "vehicles"."model" AS model
                    FROM 
                        "stateLogs"
                    INNER JOIN
                        vehicles vehicles ON "stateLogs"."vehicleId" = vehicles."id"
                    WHERE 
                        "stateLogs"."vehicleId" = $1
                        AND "stateLogs"."timestamp" <= $2
                    ORDER BY 
                        "stateLogs"."timestamp" DESC
                    LIMIT 1;`;
        const result = await aquery(sql, [vehicleId, formatDateWithOffset(timestamp)]);
        return result.rowCount == 1 ? (result.rows[0] as VehicleStateAtTimestampResponse) : null;
    } catch (error) {
        const e = error as Error;
        throw new Error(e.message);
    }
}
