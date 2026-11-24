// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessPolicyAssignmentOperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessPolicyAssignmentOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccessPolicyAssignmentOperationsCreateUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccessPolicyAssignmentOperationsGetOptionalParams extends OperationOptions {}
