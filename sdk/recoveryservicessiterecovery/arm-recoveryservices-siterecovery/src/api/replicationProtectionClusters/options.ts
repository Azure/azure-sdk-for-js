// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReplicationProtectionClustersListOptionalParams extends OperationOptions {
  /** The pagination token. Possible values: "FabricId" or "FabricId_CloudId" or null. */
  skipToken?: string;
  /** OData filter options. */
  filter?: string;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationProtectionClustersGetOperationResultsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReplicationProtectionClustersUnplannedFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersTestFailoverCleanupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersTestFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersRepairReplicationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersFailoverCommitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersApplyRecoveryPointOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReplicationProtectionClustersGetOptionalParams extends OperationOptions {}
