// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
export interface ResolveServiceEndpointOptions {
  /**
   * This is to indicate the starting index for selecting servers.
   */
  startServiceEndpointIndex?: number;
  /**
   * Excludes one or more Azure regions for the operation.
   * <p>This option is only applied when enableEndPointDiscovery is set to true.</p>
   */
  excludedLocations?: string[];
}
