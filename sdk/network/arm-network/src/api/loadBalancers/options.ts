// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateLoadBalancerToIpBasedRequest } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LoadBalancersSwapPublicIpAddressesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersListInboundNatRulePortMappingsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersMigrateToIpBasedOptionalParams extends OperationOptions {
  /** Parameters supplied to the migrateToIpBased Api. */
  parameters?: MigrateLoadBalancerToIpBasedRequest;
}

/** Optional parameters. */
export interface LoadBalancersListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
