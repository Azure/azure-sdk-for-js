// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CommunityCheckAddressSpaceAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunityListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunityListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunityDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunityUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunityCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunityGetOptionalParams extends OperationOptions {}
