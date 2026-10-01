// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FirewallPolicyRuleCollectionGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallPolicyRuleCollectionGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallPolicyRuleCollectionGroupsGetOptionalParams extends OperationOptions {}
