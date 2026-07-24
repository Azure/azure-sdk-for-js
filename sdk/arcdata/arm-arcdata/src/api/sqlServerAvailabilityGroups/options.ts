// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsAddDatabasesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsFailoverOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsDetailViewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
