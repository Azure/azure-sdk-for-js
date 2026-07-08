// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FirewallPoliciesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallPoliciesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallPoliciesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
