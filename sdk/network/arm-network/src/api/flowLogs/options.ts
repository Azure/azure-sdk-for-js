// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FlowLogsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FlowLogsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FlowLogsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FlowLogsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FlowLogsGetOptionalParams extends OperationOptions {}
