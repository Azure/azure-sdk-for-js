import type { Resource } from "./models/index.js";
import type { PagedResult } from "./models/index.js";

/**
 * An event emitted by the streaming client.
 */
export interface StreamEvent<T = unknown> {
    id: string;
    type: string;
    timestamp: number;
    data?: T;
}

/**
 * Options for configuring the streaming client.
 */
export interface StreamOptions {
    bufferSize: number;
    autoReconnect: boolean;
}

/**
 * Conditional type that extracts the event handler signature.
 */
export type EventHandler<TEvent> = TEvent extends StreamEvent<infer T> ? (data: T) => void : never;

/**
 * Client for streaming resources.
 */
export declare class StreamingClient {
    constructor();
    close(): void;
    stream(): AsyncIterableIterator<StreamEvent<unknown>>;
    stream<T>(eventType: string): AsyncIterableIterator<StreamEvent<T>>;
    streamPages(): AsyncIterableIterator<PagedResult<StreamEvent<unknown>>>;
    get isConnected(): boolean;
}
