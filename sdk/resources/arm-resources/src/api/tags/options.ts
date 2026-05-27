// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TagsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsCreateOrUpdateValueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsDeleteValueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsDeleteAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsUpdateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsCreateOrUpdateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsGetAtScopeOptionalParams extends OperationOptions {}
