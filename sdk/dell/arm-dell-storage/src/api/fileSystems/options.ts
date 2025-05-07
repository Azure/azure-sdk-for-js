// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileSystemsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FileSystemsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FileSystemsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileSystemsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSystemsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileSystemsGetOptionalParams extends OperationOptions {}
