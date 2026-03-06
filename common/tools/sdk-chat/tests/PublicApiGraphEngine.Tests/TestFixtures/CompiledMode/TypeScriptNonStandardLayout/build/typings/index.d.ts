export interface LayoutOptions {
    endpoint: string;
    timeout?: number;
}

export interface LayoutStatus {
    connected: boolean;
    uptime: number;
}

export declare class LayoutClient {
    constructor(options: LayoutOptions);
    initialize(): Promise<void>;
    getStatus(): LayoutStatus;
    close(): void;
}
