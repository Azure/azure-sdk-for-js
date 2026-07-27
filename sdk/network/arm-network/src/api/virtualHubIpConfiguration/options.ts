// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualHubIpConfigurationListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualHubIpConfigurationDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubIpConfigurationCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubIpConfigurationGetOptionalParams extends OperationOptions {}
