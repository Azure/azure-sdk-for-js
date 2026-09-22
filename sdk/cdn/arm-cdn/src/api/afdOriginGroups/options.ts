// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AFDOriginGroupsListResourceUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDOriginGroupsListByProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDOriginGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDOriginGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDOriginGroupsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDOriginGroupsGetOptionalParams extends OperationOptions {}
