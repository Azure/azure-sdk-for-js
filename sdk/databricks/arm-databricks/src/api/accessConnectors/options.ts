// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessConnectorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessConnectorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessConnectorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccessConnectorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccessConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccessConnectorsGetOptionalParams extends OperationOptions {}
