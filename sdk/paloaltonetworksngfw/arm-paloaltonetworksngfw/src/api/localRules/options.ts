// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocalRulesResetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface LocalRulesRefreshCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface LocalRulesGetCountersOptionalParams extends OperationOptions {
  firewallName?: string;
}

/** Optional parameters. */
export interface LocalRulesListByLocalRulestacksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocalRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LocalRulesGetOptionalParams extends OperationOptions {}
