// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationStatusResultGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationStatusResultListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationStatusResultGetByAgentPoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationStatusResultListByAgentPoolOptionalParams extends OperationOptions {
  /** If true, only return operations that are currently active (not terminal). */
  activeOnly?: boolean;
}
