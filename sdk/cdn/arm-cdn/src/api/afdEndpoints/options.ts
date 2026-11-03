// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AFDEndpointsValidateCustomDomainOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDEndpointsListResourceUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDEndpointsPurgeContentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDEndpointsListByProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDEndpointsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDEndpointsGetOptionalParams extends OperationOptions {}
