// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScheduledQueryRuleReconcileNSPOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScheduledQueryRuleListNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledQueryRuleGetNSPOptionalParams extends OperationOptions {}
