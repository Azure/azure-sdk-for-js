// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the Network Packet Broker resource. */
  update: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams,
  ) => Promise<NetworkPacketBroker>;
  /** Creates a Network Packet Broker. */
  create: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkPacketBroker>, NetworkPacketBroker>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams,
  ) => Promise<NetworkPacketBroker>;
  /** Retrieves details of this Network Packet Broker. */
  get: (
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersGetOptionalParams,
  ) => Promise<NetworkPacketBroker>;
}

function _getNetworkPacketBrokers(context: AzureNetworkFabricManagementServiceAPIContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      options?: NetworkPacketBrokersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkPacketBrokerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      options?: NetworkPacketBrokersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkPacketBrokerName, options);
    },
    update: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBrokerPatch,
      options?: NetworkPacketBrokersUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkPacketBrokerName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBrokerPatch,
      options?: NetworkPacketBrokersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkPacketBrokerName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBrokerPatch,
      options?: NetworkPacketBrokersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkPacketBrokerName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBroker,
      options?: NetworkPacketBrokersCreateOptionalParams,
    ) => create(context, resourceGroupName, networkPacketBrokerName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBroker,
      options?: NetworkPacketBrokersCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkPacketBrokerName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      body: NetworkPacketBroker,
      options?: NetworkPacketBrokersCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkPacketBrokerName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkPacketBrokerName: string,
      options?: NetworkPacketBrokersGetOptionalParams,
    ) => get(context, resourceGroupName, networkPacketBrokerName, options),
  };
}

export function _getNetworkPacketBrokersOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkPacketBrokersOperations {
  return {
    ..._getNetworkPacketBrokers(context),
  };
}
