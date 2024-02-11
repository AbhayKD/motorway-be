import { Request, Response } from 'express';
import { ResponseWrapper } from '../utils/responseWrapper';

/**
 * healthcheck for server
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
export async function healthCheck(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res);
    response.ok({
        success: true,
        status: 200,
        data: {
            name: process.env.npm_package_name,
            version: process.env.npm_package_version,
        },
    });
}
