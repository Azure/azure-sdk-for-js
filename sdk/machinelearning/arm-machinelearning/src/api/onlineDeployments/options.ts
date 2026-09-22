// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OnlineDeploymentsListSkusOptionalParams extends OperationOptions {
  /** Number of Skus to be retrieved in a page of results. */
  count?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface OnlineDeploymentsGetLogsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OnlineDeploymentsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Top of list. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface OnlineDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineDeploymentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineDeploymentsGetOptionalParams extends OperationOptions {}
