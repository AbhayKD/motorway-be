// config
export interface Config {
    serviceName: string;
    port: number;
    loggerLevel: string;
    db: PgConfig;
}

// dbUtils
export interface PgConfig {
    user: string;
    database: string;
    password: string;
    host: string;
    port: number;
    max: number;
    idleTimeoutMillis: number;
}

export enum VehicleState {
    QUOTED = 'quoted',
    SELLING = 'selling',
    SOLD = 'sold',
}

export interface VehicleStateAtTimestampResponse {
    vehicleId: string;
    timestamp: string;
    state: VehicleState;
    make: string;
    model: string;
}
