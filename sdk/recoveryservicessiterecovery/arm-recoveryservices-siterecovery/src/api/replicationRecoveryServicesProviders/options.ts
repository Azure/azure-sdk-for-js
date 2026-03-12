// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationRecoveryServicesProvidersGetOptionalParams extends OperationOptions {}
