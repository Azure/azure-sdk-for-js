import type { RetryOptions } from "../retry/retryOptions.js";
import { ConnectionMode } from "./ConnectionMode.js";
/**
 * Represents the Connection policy associated with a CosmosClient in the Azure Cosmos DB database service.
 */
export interface ConnectionPolicy {
    /** Determines which mode to connect to Cosmos with. (Currently only supports Gateway option) */
    connectionMode?: ConnectionMode;
    /** Request timeout (time to wait for response from network peer). Represented in milliseconds. */
    requestTimeout?: number;
    /**
     * Flag to enable/disable automatic redirecting of requests based on read/write operations. Default true.
     * Required to call client.dispose() when this is set to true after destroying the CosmosClient inside another process or in the browser.
     */
    enableEndpointDiscovery?: boolean;
    /** List of azure regions to be used as preferred locations for read requests. */
    preferredLocations?: string[];
    /** RetryOptions object which defines several configurable properties used during retry. */
    retryOptions?: RetryOptions;
    /**
     * The flag that enables writes on any locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service.
     * Default is `true`.
     */
    useMultipleWriteLocations?: boolean;
    /** Rate in milliseconds at which the client will refresh the endpoints list in the background */
    endpointRefreshRateInMs?: number;
    /** Flag to enable/disable background refreshing of endpoints. Defaults to true.
     * Endpoint discovery using `enableEndpointsDiscovery` will still work for failed requests. */
    enableBackgroundEndpointRefreshing?: boolean;
}
/**
 * @hidden
 */
export declare const defaultConnectionPolicy: ConnectionPolicy;
//# sourceMappingURL=ConnectionPolicy.d.ts.map