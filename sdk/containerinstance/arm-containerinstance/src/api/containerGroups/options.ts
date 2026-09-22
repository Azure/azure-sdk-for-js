// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerGroupsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerGroupsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerGroupsRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerGroupsGetOptionalParams extends OperationOptions {}
