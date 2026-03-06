export interface Logger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
