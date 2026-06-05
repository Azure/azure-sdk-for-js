// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsGetAuthTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsListCustomHostNameAnalysisOptionalParams extends OperationOptions {
  /** Custom hostname. */
  customHostname?: string;
}

/** Optional parameters. */
export interface ContainerAppsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsGetOptionalParams extends OperationOptions {}
