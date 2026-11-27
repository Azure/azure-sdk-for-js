// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WavesRefreshOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WavesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WavesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WavesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WavesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
