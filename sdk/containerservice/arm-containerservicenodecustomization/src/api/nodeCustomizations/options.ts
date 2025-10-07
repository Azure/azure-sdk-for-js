// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NodeCustomizationsListVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeCustomizationsGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeCustomizationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeCustomizationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NodeCustomizationsDeleteVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NodeCustomizationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NodeCustomizationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NodeCustomizationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** The request should only proceed if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface NodeCustomizationsGetOptionalParams extends OperationOptions {}
