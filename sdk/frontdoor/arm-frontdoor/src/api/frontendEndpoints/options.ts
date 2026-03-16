// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FrontendEndpointsDisableHttpsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontendEndpointsEnableHttpsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontendEndpointsListByFrontDoorOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontendEndpointsGetOptionalParams extends OperationOptions {}
