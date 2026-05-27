// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceSyncRulesListByCustomLocationIDOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceSyncRulesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceSyncRulesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceSyncRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceSyncRulesGetOptionalParams extends OperationOptions {}
