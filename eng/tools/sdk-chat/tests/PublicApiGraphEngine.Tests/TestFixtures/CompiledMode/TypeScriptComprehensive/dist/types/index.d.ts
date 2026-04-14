import type { PipelinePolicy, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type { Logger } from "some-logger";
import type { AnalyticsTracker } from "some-analytics";
import type { Resource, PagedResult, OperationResult } from "./models/index.js";

/** Options for configuring a client instance. */
export interface ClientOptions {
    /** The service endpoint to connect to. */
    endpoint: string;
    /** Request timeout in milliseconds. */
    timeout?: number;
    /** The API version to use. */
    apiVersion?: string;
}

/**
 * Extended client options for the ComprehensiveClient.
 */
export interface ComprehensiveClientOptions extends ClientOptions {
    retryPolicy?: PipelinePolicy;
    logger?: Logger;
    analytics?: AnalyticsTracker;
}

/**
 * Options for the getResource method.
 */
export interface GetResourceOptions {
    includeMetadata?: boolean;
}

/**
 * Options for retry behavior.
 */
export interface RetryOptions {
    maxRetries: number;
    retryDelayInMs: number;
    maxRetryDelayInMs: number;
}

/**
 * A string-keyed map of strings.
 */
export interface StringMap {
    [key: string]: string;
}

/**
 * A map of event names to handler functions.
 */
export interface EventMap {
    [eventName: string]: (...args: unknown[]) => void;
}

/**
 * Status of an operation result.
 */
export declare enum ResultStatus {
    Success = "Success",
    Failed = "Failed",
    Pending = "Pending",
    Cancelled = "Cancelled"
}

/**
 * Log level for diagnostics.
 */
export declare enum LogLevel {
    Debug = "Debug",
    Info = "Info",
    Warn = "Warn",
    Error = "Error"
}

/**
 * State of a resource.
 */
export declare const enum ResourceState {
    Active = "Active",
    Inactive = "Inactive",
    Deleted = "Deleted"
}

/**
 * The main client for interacting with the comprehensive service.
 */
export declare class ComprehensiveClient {
    constructor(endpoint: string, options?: ComprehensiveClientOptions);
    getResource(resourceId: string): Promise<Resource>;
    getResource(resourceId: string, options: GetResourceOptions): Promise<Resource>;
    deleteResource(resourceId: string): Promise<void>;
    deleteResource(resourceId: string, force: boolean): Promise<boolean>;
    listResources(): Promise<PagedResult<Resource>>;
    createResource(resource: Resource): Promise<OperationResult<Resource>>;
    static fromConnectionString(connectionString: string): ComprehensiveClient;
    get endpoint(): string;
    get apiVersion(): string;
    get requestTimeout(): number;
    set requestTimeout(value: number);
    sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
    _serializeResource(resource: Resource): string;
    _transformResponse<T>(raw: unknown): T;
}

/**
 * A utility class for serialization.
 */
export declare class _Serializer {
    serialize(): string;
    deserialize(): unknown;
}

/**
 * An internal helper class.
 */
export declare class _InternalHelper {
}

/**
 * A generic data store with advanced type operations.
 */
export declare class AdvancedTypes<T extends Record<string, unknown>> {
    merge(other: T): T;
    /** @deprecated Use a direct property access instead. */
    lookup(key: string): T | undefined;
}

export { Resource, PagedResult, OperationResult } from "./models/index.js";
export { StreamingClient, StreamEvent, StreamOptions, EventHandler } from "./streaming.js";
