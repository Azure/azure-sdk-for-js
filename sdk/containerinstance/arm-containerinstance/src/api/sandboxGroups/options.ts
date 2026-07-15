// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SandboxGroupsConnectOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SandboxGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SandboxGroupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SandboxGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SandboxGroupsListBySubscriptionOptionalParams extends OperationOptions {}
