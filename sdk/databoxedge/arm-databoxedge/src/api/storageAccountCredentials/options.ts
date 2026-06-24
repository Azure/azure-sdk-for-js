// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageAccountCredentialsListByDataBoxEdgeDeviceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountCredentialsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountCredentialsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountCredentialsGetOptionalParams extends OperationOptions {}
