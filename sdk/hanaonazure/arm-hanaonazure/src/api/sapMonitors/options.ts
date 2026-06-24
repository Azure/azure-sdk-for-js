// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SapMonitorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SapMonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SapMonitorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SapMonitorsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SapMonitorsGetOptionalParams extends OperationOptions {}
