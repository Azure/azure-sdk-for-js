export interface DatabaseSettings {
    host: string;
    port: number;
    database: string;
}

export interface PoolSettings {
    min: number;
    max: number;
}

export interface LoggingSettings {
    level: string;
    output: string;
}

export interface AppSettings {
    db: DatabaseSettings;
    pool: PoolSettings;
    logging: LoggingSettings;
}

export interface ErrorDetail {
    code: string;
    message: string;
}

export interface SuccessDetail {
    data: unknown;
    timestamp: number;
}

export type ResolvedDBConfig = DatabaseSettings & PoolSettings;

export type SafeResult = { success: true; detail: SuccessDetail } | { success: false; detail: ErrorDetail };

export declare class EdgeCaseClient {
    getDBConfig(): ResolvedDBConfig;
    processResult(input: unknown): SafeResult;
    getSubmoduleNamespace(): AppSettings;
}
