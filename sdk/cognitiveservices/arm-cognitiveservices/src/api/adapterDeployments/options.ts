// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdapterDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Proceed only when the current adapter deployment ETag matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface AdapterDeploymentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AdapterDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Proceed only when the current adapter deployment ETag matches this value. */
  ifMatch?: string;
  /** Proceed only when no current adapter deployment ETag matches this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface AdapterDeploymentsGetOptionalParams extends OperationOptions {}
