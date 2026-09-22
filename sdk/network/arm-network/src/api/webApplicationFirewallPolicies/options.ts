// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebApplicationFirewallPoliciesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebApplicationFirewallPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebApplicationFirewallPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebApplicationFirewallPoliciesGetOptionalParams extends OperationOptions {}
