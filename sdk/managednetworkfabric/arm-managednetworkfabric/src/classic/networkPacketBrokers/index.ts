// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkPacketBrokers/operations.js";
import type {
  NetworkPacketBrokersListBySubscriptionOptionalParams,
  NetworkPacketBrokersListByResourceGroupOptionalParams,
  NetworkPacketBrokersDeleteOptionalParams,
  NetworkPacketBrokersUpdateOptionalParams,
  NetworkPacketBrokersCreateOptionalParams,
  NetworkPacketBrokersGetOptionalParams,
} from "../../api/networkPacketBrokers/options.js";
import type { NetworkPacketBroker, NetworkPacketBrokerPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkPacketBrokers operations. */
export interface NetworkPacketBrokersOperations {
  /** Displays Network Packet Brokers list by subscription GET method. */
  listBySubscription: (
    options?: NetworkPacketBrokersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkPacketBroker>;
  /** Displays NetworkPacketBrokers list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkPacketBrokersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkPacketBroker>;
  /** Deletes Network Packet Broker. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the Network Packet Broker resource. */
  update: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    properties: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>;
  /** Creates a Network Packet Broker. */
  create: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    resource: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>;
  /** Retrieves details of this Network Packet Broker. */
  get: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersGetOptionalParams,
  ) => Promise<NetworkPacketBroker>;
}

function _getNetworkPacketBrokers(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: NetworkPacketBrokersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkPacketBrokersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      options?: NetworkPacketBrokersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkPacketBrokerName, options),
    update: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      properties: NetworkPacketBrokerPatch,
      options?: NetworkPacketBrokersUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkPacketBrokerName, properties, options),
    create: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      resource: NetworkPacketBroker,
      options?: NetworkPacketBrokersCreateOptionalParams,
    ) => create(context, resourceGroupName, networkPacketBrokerName, resource, options),
    get: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      options?: NetworkPacketBrokersGetOptionalParams,
    ) => get(context, resourceGroupName, networkPacketBrokerName, options),
  };
}

export function _getNetworkPacketBrokersOperations(
  context: ManagedNetworkFabricContext,
): NetworkPacketBrokersOperations {
  return {
    ..._getNetworkPacketBrokers(context),
  };
}
