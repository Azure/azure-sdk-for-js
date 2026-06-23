// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetricsObjectFirewallListByFirewallsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetricsObjectFirewallDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MetricsObjectFirewallCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MetricsObjectFirewallGetOptionalParams extends OperationOptions {}
