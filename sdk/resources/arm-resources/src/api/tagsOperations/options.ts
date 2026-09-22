// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TagsOperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsOperationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsOperationsCreateOrUpdateValueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsOperationsDeleteValueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagsOperationsDeleteAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsOperationsUpdateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsOperationsCreateOrUpdateAtScopeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TagsOperationsGetAtScopeOptionalParams extends OperationOptions {}
