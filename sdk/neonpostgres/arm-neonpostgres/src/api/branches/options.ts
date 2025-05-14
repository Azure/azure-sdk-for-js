// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BranchesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BranchesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BranchesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BranchesGetOptionalParams extends OperationOptions {}
