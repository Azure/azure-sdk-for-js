// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CassandraClustersStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersDeallocateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Force to deallocate a cluster of Cluster Type Production. Force to deallocate a cluster of Cluster Type Production might cause data loss */
  xMsForceDeallocate?: string;
}

/** Optional parameters. */
export interface CassandraClustersGetBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersListBackupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersGetCommandAsyncOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersListCommandOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersInvokeCommandAsyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersInvokeCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CassandraClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersCreateUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CassandraClustersGetOptionalParams extends OperationOptions {}
