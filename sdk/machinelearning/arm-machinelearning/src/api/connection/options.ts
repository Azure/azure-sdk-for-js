// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionListDeploymentsOptionalParams extends OperationOptions {
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionDeleteDeploymentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionCreateOrUpdateDeploymentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionGetDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionGetModelsOptionalParams extends OperationOptions {
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionGetAllModelsOptionalParams extends OperationOptions {}
