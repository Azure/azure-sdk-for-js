// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ArcDeploymentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Whether to delete the Arc deployment even when its associated extension is disconnected. Defaults to false. */
  force?: boolean;
}

/** Optional parameters. */
export interface ArcDeploymentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcDeploymentsGetOptionalParams extends OperationOptions {}
