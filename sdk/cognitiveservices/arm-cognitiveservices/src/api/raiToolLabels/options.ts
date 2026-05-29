// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RaiToolLabelsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiToolLabelsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RaiToolLabelsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RaiToolLabelsGetOptionalParams extends OperationOptions {}
