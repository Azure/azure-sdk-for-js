// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DdosProtectionPlansListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DdosProtectionPlansListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DdosProtectionPlansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DdosProtectionPlansUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DdosProtectionPlansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DdosProtectionPlansGetOptionalParams extends OperationOptions {}
