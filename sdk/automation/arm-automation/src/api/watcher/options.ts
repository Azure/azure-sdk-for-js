// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WatcherStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatcherStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatcherListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface WatcherDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatcherUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatcherCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatcherGetOptionalParams extends OperationOptions {}
