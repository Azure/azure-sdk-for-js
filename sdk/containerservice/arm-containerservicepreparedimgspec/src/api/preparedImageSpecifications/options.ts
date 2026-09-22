// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PreparedImageSpecificationsListVersionsOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface PreparedImageSpecificationsGetVersionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface PreparedImageSpecificationsListBySubscriptionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface PreparedImageSpecificationsListByResourceGroupOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface PreparedImageSpecificationsDeleteVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}
/** Optional parameters. */
export interface PreparedImageSpecificationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}
/** Optional parameters. */
export interface PreparedImageSpecificationsUpdateOptionalParams extends OperationOptions {
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}
/** Optional parameters. */
export interface PreparedImageSpecificationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** The request should only proceed if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
}
/** Optional parameters. */
export interface PreparedImageSpecificationsGetOptionalParams extends OperationOptions {}
