// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectorsGetOptionalParams extends OperationOptions {}
