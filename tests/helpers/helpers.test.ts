// import { Pool } from 'pg';
import { formatDateWithOffset } from '../../src/utils/helpers';
// import { getTimeModel, sampleTransactionModel } from '../../src/models/vehicle';

// mock pg/Pool in in src/utils/dbUtil
jest.mock('pg', () => {
    const result = {
        command: 'string',
        rowCount: 0,
    };
    const client = {
        query: () => {
            return result;
        },
        release: jest.fn(),
    };
    const methods = {
        connect: () => client,
        on: jest.fn(),
        query: jest.fn(),
    };
    return { Pool: jest.fn(() => methods) };
});

describe('formatDateWithOffset', () => {
    it('should format date with positive timezone offset', () => {
        // Assuming the test is run in a timezone with a positive offset
        const date = new Date('2020-01-01T00:00:00Z'); // UTC time
        const formattedDate = formatDateWithOffset(date);
        expect(formattedDate).toMatch(/2020-01-01T00:00:00.000\+\d{1,2}/);
    });

    it('formats the current date correctly', () => {
        const now = new Date();
        const offsetHours = -now.getTimezoneOffset() / 60;
        const expectedOffset = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;
        const formattedNow = formatDateWithOffset(now);
        expect(formattedNow).toContain(expectedOffset);
    });
});
