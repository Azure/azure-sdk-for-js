// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiTopicsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiTopicsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RaiTopicsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiTopicsGetOptionalParams extends OperationOptions {}
