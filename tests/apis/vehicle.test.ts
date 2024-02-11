import { getVehicleStateAtTimestamp } from '../../src/controllers/vehicle';
import { Request, Response } from 'express';
import { getVehicleState } from '../../src/services/vehicle';
import { VehicleState, VehicleStateAtTimestampResponse } from '../../src/types';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../src/services/vehicle', () => ({
    getVehicleState: jest.fn(),
}));

describe('Vehicle API Endpoints', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let send: jest.Mock;

    beforeEach(() => {
        send = jest.fn();
        res = {
            status: jest.fn().mockReturnValue({ send }),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /vehicle/:vehicle_id/state-at-timestamp should return a state', async () => {
        (getVehicleState as jest.Mock).mockResolvedValueOnce({
            vehicleId: '1',
            make: 'Toyota',
            model: 'Corolla',
            state: VehicleState.SELLING,
            timestamp: '2022-09-09T10:00:00',
        });
        req = {
            params: { id: '1' },
            query: { timestamp: '2022-09-10T10:00:00+00' },
        };
        await getVehicleStateAtTimestamp(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(send).toHaveBeenCalledWith({
            status: 200,
            success: true,
            data: {
                vehicleId: '1',
                state: VehicleState.SELLING,
                make: 'Toyota',
                model: 'Corolla',
                timestamp: '2022-09-09T10:00:00',
            } as VehicleStateAtTimestampResponse,
        });
    });

    test('GET /vehicle/:vehicle_id/state-at-timestamp should not return a state', async () => {
        (getVehicleState as jest.Mock).mockResolvedValueOnce(null);
        req = {
            params: { id: '1' },
            query: { timestamp: '2022-09-10T10:00:00+00' },
        };
        await getVehicleStateAtTimestamp(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(send).toHaveBeenCalledWith({
            status: 200,
            success: true,
            data: null,
        });
    });

    test('GET /vehicle/:vehicle_id/state-at-timestamp should return 400 if invalid timestamp', async () => {
        // Mock the service to simulate a "vehicle not found" scenario
        (getVehicleState as jest.Mock).mockRejectedValueOnce(new Error('Invalid timestamp provided.'));

        req = {
            params: { vehicle_id: '1' },
            query: { timestamp: '2022-09-1T10:00:00+00' },
        };

        await getVehicleStateAtTimestamp(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(send).toHaveBeenCalledWith({
            data: { message: 'Invalid timestamp provided.', status: 'error' },
            success: false,
        }); // Or expect a specific error message
    });
});
