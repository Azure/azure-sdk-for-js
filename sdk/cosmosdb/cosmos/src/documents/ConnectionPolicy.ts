// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
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
  /**
   * Flag to enable/disable Per Partition Level Failover (PPAF). Defaults to true.
   * Automatically failovers to other available partitions when a partition becomes unavailable.
   * When enabled, enablePartitionLevelCircuitBreaker will also be set to true.
   * Note: Requires enableEndpointDiscovery to be true. Has no effect when endpoint discovery is disabled.
   */
  enablePartitionLevelFailover?: boolean;

  /**
   * Flag to enable/disable Per Partition Level Circuit Breaker (PPCB). Defaults to true.
   * Note: Requires enableEndpointDiscovery to be true. Has no effect when endpoint discovery is disabled.
   */
  enablePartitionLevelCircuitBreaker?: boolean;
}

/**
 * @hidden
 */
export const defaultConnectionPolicy: ConnectionPolicy = Object.freeze({
  connectionMode: ConnectionMode.Gateway,
  requestTimeout: 60000,
  enableEndpointDiscovery: true,
  preferredLocations: [],
  retryOptions: {
    maxRetryAttemptCount: Constants.ThrottledRequestMaxRetryAttemptCount,
    fixedRetryIntervalInMilliseconds: Constants.ThrottledRequestFixedRetryIntervalInMs,
    maxWaitTimeInSeconds: Constants.ThrottledRequestMaxWaitTimeInSeconds,
  },
  useMultipleWriteLocations: true,
  endpointRefreshRateInMs: 300000,
  enableBackgroundEndpointRefreshing: true,
  enablePartitionLevelFailover: true,
  enablePartitionLevelCircuitBreaker: true,
});
