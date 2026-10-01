// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabasePrincipalAssignmentsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasePrincipalAssignmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasePrincipalAssignmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasePrincipalAssignmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasePrincipalAssignmentsGetOptionalParams extends OperationOptions {}
