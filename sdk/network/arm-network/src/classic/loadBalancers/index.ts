// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  swapPublicIpAddresses,
  listInboundNatRulePortMappings,
  migrateToIpBased,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/loadBalancers/operations.js";
import type {
  LoadBalancersSwapPublicIpAddressesOptionalParams,
  LoadBalancersListInboundNatRulePortMappingsOptionalParams,
  LoadBalancersMigrateToIpBasedOptionalParams,
  LoadBalancersListAllOptionalParams,
  LoadBalancersListOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersUpdateTagsOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersGetOptionalParams,
} from "../../api/loadBalancers/options.js";
import type {
  TagsObject,
  LoadBalancer,
  MigratedPools,
  QueryInboundNatRulePortMappingRequest,
  BackendAddressInboundNatRulePortMappings,
  LoadBalancerVipSwapRequest,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancers operations. */
export interface LoadBalancersOperations {
  /** Swaps VIPs between two load balancers. */
  swapPublicIpAddresses: (
    location: string,
    parameters: LoadBalancerVipSwapRequest,
    options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use swapPublicIpAddresses instead */
  beginSwapPublicIpAddresses: (
    location: string,
    parameters: LoadBalancerVipSwapRequest,
    options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use swapPublicIpAddresses instead */
  beginSwapPublicIpAddressesAndWait: (
    location: string,
    parameters: LoadBalancerVipSwapRequest,
    options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
  ) => Promise<void>;
  /** List of inbound NAT rule port mappings. */
  listInboundNatRulePortMappings: (
    groupName: string,
    loadBalancerName: string,
    backendPoolName: string,
    parameters: QueryInboundNatRulePortMappingRequest,
    options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
  ) => PollerLike<
    OperationState<BackendAddressInboundNatRulePortMappings>,
    BackendAddressInboundNatRulePortMappings
  >;
  /** @deprecated use listInboundNatRulePortMappings instead */
  beginListInboundNatRulePortMappings: (
    groupName: string,
    loadBalancerName: string,
    backendPoolName: string,
    parameters: QueryInboundNatRulePortMappingRequest,
    options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BackendAddressInboundNatRulePortMappings>,
      BackendAddressInboundNatRulePortMappings
    >
  >;
  /** @deprecated use listInboundNatRulePortMappings instead */
  beginListInboundNatRulePortMappingsAndWait: (
    groupName: string,
    loadBalancerName: string,
    backendPoolName: string,
    parameters: QueryInboundNatRulePortMappingRequest,
    options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
  ) => Promise<BackendAddressInboundNatRulePortMappings>;
  /** Migrate load balancer to IP Based */
  migrateToIpBased: (
    groupName: string,
    loadBalancerName: string,
    options?: LoadBalancersMigrateToIpBasedOptionalParams,
  ) => Promise<MigratedPools>;
  /** Gets all the load balancers in a subscription. */
  listAll: (
    options?: LoadBalancersListAllOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** Gets all the load balancers in a resource group. */
  list: (
    resourceGroupName: string,
    options?: LoadBalancersListOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
  /** Deletes the specified load balancer. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a load balancer tags. */
  updateTags: (
    resourceGroupName: string,
    loadBalancerName: string,
    parameters: TagsObject,
    options?: LoadBalancersUpdateTagsOptionalParams,
  ) => Promise<LoadBalancer>;
  /** Creates or updates a load balancer. */
  createOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    parameters: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    parameters: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LoadBalancer>, LoadBalancer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    parameters: LoadBalancer,
    options?: LoadBalancersCreateOrUpdateOptionalParams,
  ) => Promise<LoadBalancer>;
  /** Gets the specified load balancer. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancersGetOptionalParams,
  ) => Promise<LoadBalancer>;
}

function _getLoadBalancers(context: NetworkManagementContext) {
  return {
    swapPublicIpAddresses: (
      location: string,
      parameters: LoadBalancerVipSwapRequest,
      options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
    ) => swapPublicIpAddresses(context, location, parameters, options),
    beginSwapPublicIpAddresses: async (
      location: string,
      parameters: LoadBalancerVipSwapRequest,
      options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
    ) => {
      const poller = swapPublicIpAddresses(context, location, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwapPublicIpAddressesAndWait: async (
      location: string,
      parameters: LoadBalancerVipSwapRequest,
      options?: LoadBalancersSwapPublicIpAddressesOptionalParams,
    ) => {
      return await swapPublicIpAddresses(context, location, parameters, options);
    },
    listInboundNatRulePortMappings: (
      groupName: string,
      loadBalancerName: string,
      backendPoolName: string,
      parameters: QueryInboundNatRulePortMappingRequest,
      options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
    ) =>
      listInboundNatRulePortMappings(
        context,
        groupName,
        loadBalancerName,
        backendPoolName,
        parameters,
        options,
      ),
    beginListInboundNatRulePortMappings: async (
      groupName: string,
      loadBalancerName: string,
      backendPoolName: string,
      parameters: QueryInboundNatRulePortMappingRequest,
      options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
    ) => {
      const poller = listInboundNatRulePortMappings(
        context,
        groupName,
        loadBalancerName,
        backendPoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListInboundNatRulePortMappingsAndWait: async (
      groupName: string,
      loadBalancerName: string,
      backendPoolName: string,
      parameters: QueryInboundNatRulePortMappingRequest,
      options?: LoadBalancersListInboundNatRulePortMappingsOptionalParams,
    ) => {
      return await listInboundNatRulePortMappings(
        context,
        groupName,
        loadBalancerName,
        backendPoolName,
        parameters,
        options,
      );
    },
    migrateToIpBased: (
      groupName: string,
      loadBalancerName: string,
      options?: LoadBalancersMigrateToIpBasedOptionalParams,
    ) => migrateToIpBased(context, groupName, loadBalancerName, options),
    listAll: (options?: LoadBalancersListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: LoadBalancersListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, loadBalancerName, options),
    beginDelete: async (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, loadBalancerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, loadBalancerName, options);
    },
    updateTags: (
      resourceGroupName: string,
      loadBalancerName: string,
      parameters: TagsObject,
      options?: LoadBalancersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, loadBalancerName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      loadBalancerName: string,
      parameters: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, loadBalancerName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      loadBalancerName: string,
      parameters: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      parameters: LoadBalancer,
      options?: LoadBalancersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancersGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, options),
  };
}

export function _getLoadBalancersOperations(
  context: NetworkManagementContext,
): LoadBalancersOperations {
  return {
    ..._getLoadBalancers(context),
  };
}
