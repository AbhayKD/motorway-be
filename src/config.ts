import dotenv from 'dotenv';
import { Config } from './types';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
}

export const config: Config = {
    serviceName: process.env.SERVICENAME || 'APP',
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    db: {
        user: process.env.POSTGRES_DB_USER || '',
        database: process.env.POSTGRES_DB || '',
        password: process.env.POSTGRES_DB_PASS || '',
        host: process.env.POSTGRES_DB_HOST || '',
        port: Number(process.env.POSTGRES_DB_PORT) || 5432,
        max: Number(process.env.POSTGRES_DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.POSTGRES_DB_IDLE_TIMEOUT_MS) || 30000,
    },
};
