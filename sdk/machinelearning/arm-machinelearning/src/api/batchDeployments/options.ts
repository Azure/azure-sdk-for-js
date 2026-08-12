// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BatchDeploymentsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Top of list. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface BatchDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchDeploymentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchDeploymentsGetOptionalParams extends OperationOptions {}
