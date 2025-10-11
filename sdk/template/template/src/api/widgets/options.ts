// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WidgetsListWidgetsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WidgetsDeleteWidgetOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WidgetsCreateOrUpdateWidgetOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WidgetsGetWidgetOperationStatusOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface WidgetsGetWidgetOptionalParams extends OperationOptions {}
