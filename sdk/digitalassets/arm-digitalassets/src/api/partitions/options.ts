// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PartitionsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PartitionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PartitionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PartitionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PartitionsGetOptionalParams extends OperationOptions {}
