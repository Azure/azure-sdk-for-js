// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MigrateLoadBalancerToIpBasedRequest,
  LoadBalancerDetailLevel,
} from "../../models/microsoft/network/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
  /** Controls verbosity of the returned load balancer resource. When set to 'Reduced', read-only back-reference collections (e.g., rules referencing frontendIPConfigurations) are omitted from the response. */
  detailLevel?: LoadBalancerDetailLevel;
}
