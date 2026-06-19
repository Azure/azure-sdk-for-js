// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PreRulesResetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PreRulesRefreshCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PreRulesGetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface PreRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PreRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PreRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PreRulesGetOptionalParams extends OperationOptions {}
