// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionContainerMappingsGetOptionalParams extends OperationOptions {}
