// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LoadBalancerLoadBalancingRulesHealthOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancerLoadBalancingRulesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancerLoadBalancingRulesGetOptionalParams extends OperationOptions {}
