// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DedicatedHsmListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DedicatedHsmListBySubscriptionOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DedicatedHsmListByResourceGroupOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface DedicatedHsmDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHsmUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHsmCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DedicatedHsmGetOptionalParams extends OperationOptions {}
