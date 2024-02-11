import { Pool, PoolClient, QueryResult } from 'pg';
import { config } from './../config';
import { logger } from './../utils/logger';
import { PgConfig } from '../types';

const pgconfig: PgConfig = {
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis,
};

const pool = new Pool(pgconfig);

logger.info(`DB Connection Settings: ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err: Error) {
    logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

/**
 * Create a client using one of the pooled connections
 *
 * @return client
 */
export const connect = async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
};

/**
 * Single query to client
 * @param sqlText
 * @param params
 * @returns { Promise<QueryResult<any>> }
 */
export const aquery = async (sqlText: string, params: any[] = []): Promise<QueryResult<any>> => {
    logger.debug(`aquery() sql: ${sqlText} | params: ${params}`);
    const client = await connect();
    try {
        const result = await client.query(sqlText, params);
        return result;
    } catch (e) {
        logger.info('here', e);
        throw e;
    } finally {
        client.release();
    }
};
