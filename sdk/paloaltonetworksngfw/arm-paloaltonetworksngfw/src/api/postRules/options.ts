// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PostRulesResetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PostRulesRefreshCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PostRulesGetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PostRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PostRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PostRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PostRulesGetOptionalParams extends OperationOptions {}
