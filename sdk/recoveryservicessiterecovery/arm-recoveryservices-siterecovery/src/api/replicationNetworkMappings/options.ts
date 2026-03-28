// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationNetworkMappingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationNetworkMappingsListByReplicationNetworksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationNetworkMappingsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationNetworkMappingsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationNetworkMappingsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationNetworkMappingsGetOptionalParams extends OperationOptions {}
