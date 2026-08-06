// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AIManagerNamespacesRotateKeysOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AIManagerNamespacesListAccessKeysOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AIManagerNamespacesListCredentialOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AIManagerNamespacesListByAIManagerOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AIManagerNamespacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}
/** Optional parameters. */
export interface AIManagerNamespacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}
/** Optional parameters. */
export interface AIManagerNamespacesGetOptionalParams extends OperationOptions {}
