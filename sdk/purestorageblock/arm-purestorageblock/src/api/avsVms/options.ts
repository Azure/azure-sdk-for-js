// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvsVmsListByStoragePoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsVmsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvsVmsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsVmsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
