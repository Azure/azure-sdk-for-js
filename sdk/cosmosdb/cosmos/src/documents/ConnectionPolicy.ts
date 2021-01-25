// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RetryOptions } from "../retry/retryOptions";
import { ConnectionMode } from "./ConnectionMode";
/**
 * Represents the Connection policy associated with a CosmosClient in the Azure Cosmos DB database service.
 */
export interface ConnectionPolicy {
  /** Determines which mode to connect to Cosmos with. (Currently only supports Gateway option) */
  connectionMode?: ConnectionMode;
  /** Request timeout (time to wait for response from network peer). Represented in milliseconds. */
  requestTimeout?: number;
  /** Flag to enable/disable automatic redirecting of requests based on read/write operations. */
  enableEndpointDiscovery?: boolean;
  /** List of azure regions to be used as preferred locations for read requests. */
  preferredLocations?: string[];
  /** RetryOptions object which defines several configurable properties used during retry. */
  retryOptions?: RetryOptions;
  /**
   * The flag that enables writes on any locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service.
   * Default is `false`.
   */
  useMultipleWriteLocations?: boolean;
}

/**
 * @ignore
 */
export const defaultConnectionPolicy = Object.freeze({
  connectionMode: ConnectionMode.Gateway,
  requestTimeout: 60000,
  enableEndpointDiscovery: true,
  preferredLocations: [],
  retryOptions: {},
  useMultipleWriteLocations: true
});
