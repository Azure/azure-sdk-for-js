// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecoveryPlansListOptionalParams extends OperationOptions {
  /** Skip over when retrieving results. */
  skipToken?: string;
  /** Number of elements to return when retrieving results. */
  top?: number;
}

/** Optional parameters. */
export interface RecoveryPlansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RecoveryPlansUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RecoveryPlansCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RecoveryPlansGetOptionalParams extends OperationOptions {}
