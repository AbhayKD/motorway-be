// File: tests/controllers/healthcheck.test.ts
import { Request, Response } from 'express';
import { healthCheck } from '../../src/controllers/healthcheck'; // Adjust path as necessary

describe('Health Check Endpoint', () => {
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

    test('GET /healthcheck should return status 200 and a health check message', async () => {
        await healthCheck(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(send).toHaveBeenCalledWith({
            data: {
                name: 'motorway-takehome-backend',
                version: '1.0.0',
            },
            status: 200,
            success: true,
        });
    });
});
