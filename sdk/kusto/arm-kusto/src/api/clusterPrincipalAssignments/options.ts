// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClusterPrincipalAssignmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClusterPrincipalAssignmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClusterPrincipalAssignmentsGetOptionalParams extends OperationOptions {}
