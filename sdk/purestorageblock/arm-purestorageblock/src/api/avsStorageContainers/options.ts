// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvsStorageContainersListByStoragePoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvsStorageContainersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvsStorageContainersGetOptionalParams extends OperationOptions {}
