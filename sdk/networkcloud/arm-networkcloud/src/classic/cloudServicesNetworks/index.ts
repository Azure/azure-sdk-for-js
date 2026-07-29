// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/cloudServicesNetworks/operations.js";
import {
  CloudServicesNetworksListBySubscriptionOptionalParams,
  CloudServicesNetworksListByResourceGroupOptionalParams,
  CloudServicesNetworksDeleteOptionalParams,
  CloudServicesNetworksUpdateOptionalParams,
  CloudServicesNetworksCreateOrUpdateOptionalParams,
  CloudServicesNetworksGetOptionalParams,
} from "../../api/cloudServicesNetworks/options.js";
import { OperationStatusResult, CloudServicesNetwork } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudServicesNetworks operations. */
export interface CloudServicesNetworksOperations {
  /** Get a list of cloud services networks in the provided subscription. */
  listBySubscription: (
    options?: CloudServicesNetworksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CloudServicesNetwork>;
  /** Get a list of cloud services networks in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudServicesNetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudServicesNetwork>;
  /** Delete the provided cloud services network. */
  delete: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudServicesNetwork>, CloudServicesNetwork>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CloudServicesNetwork>, CloudServicesNetwork>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksUpdateOptionalParams,
  ) => Promise<CloudServicesNetwork>;
  /** Create a new cloud services network or update the properties of the existing cloud services network. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    cloudServicesNetworkParameters: CloudServicesNetwork,
    options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudServicesNetwork>, CloudServicesNetwork>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    cloudServicesNetworkParameters: CloudServicesNetwork,
    options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CloudServicesNetwork>, CloudServicesNetwork>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    cloudServicesNetworkParameters: CloudServicesNetwork,
    options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
  ) => Promise<CloudServicesNetwork>;
  /** Get properties of the provided cloud services network. */
  get: (
    resourceGroupName: string,
    cloudServicesNetworkName: string,
    options?: CloudServicesNetworksGetOptionalParams,
  ) => Promise<CloudServicesNetwork>;
}

function _getCloudServicesNetworks(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: CloudServicesNetworksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudServicesNetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudServicesNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, cloudServicesNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, cloudServicesNetworkName, options);
    },
    update: (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudServicesNetworkName, options),
    beginUpdate: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, cloudServicesNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, cloudServicesNetworkName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      cloudServicesNetworkParameters: CloudServicesNetwork,
      options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudServicesNetworkName,
        cloudServicesNetworkParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      cloudServicesNetworkParameters: CloudServicesNetwork,
      options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        cloudServicesNetworkName,
        cloudServicesNetworkParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      cloudServicesNetworkParameters: CloudServicesNetwork,
      options?: CloudServicesNetworksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        cloudServicesNetworkName,
        cloudServicesNetworkParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      cloudServicesNetworkName: string,
      options?: CloudServicesNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, cloudServicesNetworkName, options),
  };
}

export function _getCloudServicesNetworksOperations(
  context: NetworkCloudContext,
): CloudServicesNetworksOperations {
  return {
    ..._getCloudServicesNetworks(context),
  };
}
