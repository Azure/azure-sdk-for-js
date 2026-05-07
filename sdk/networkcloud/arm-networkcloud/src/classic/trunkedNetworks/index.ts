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
} from "../../api/trunkedNetworks/operations.js";
import {
  TrunkedNetworksListBySubscriptionOptionalParams,
  TrunkedNetworksListByResourceGroupOptionalParams,
  TrunkedNetworksDeleteOptionalParams,
  TrunkedNetworksUpdateOptionalParams,
  TrunkedNetworksCreateOrUpdateOptionalParams,
  TrunkedNetworksGetOptionalParams,
} from "../../api/trunkedNetworks/options.js";
import { OperationStatusResult, TrunkedNetwork } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TrunkedNetworks operations. */
export interface TrunkedNetworksOperations {
  /** Get a list of trunked networks in the provided subscription. */
  listBySubscription: (
    options?: TrunkedNetworksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<TrunkedNetwork>;
  /** Get a list of trunked networks in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: TrunkedNetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<TrunkedNetwork>;
  /** Delete the provided trunked network. */
  delete: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    options?: TrunkedNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    options?: TrunkedNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    options?: TrunkedNetworksDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update tags associated with the provided trunked network. */
  update: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    options?: TrunkedNetworksUpdateOptionalParams,
  ) => Promise<TrunkedNetwork>;
  /** Create a new trunked network or update the properties of the existing trunked network. */
  createOrUpdate: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    trunkedNetworkParameters: TrunkedNetwork,
    options?: TrunkedNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TrunkedNetwork>, TrunkedNetwork>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    trunkedNetworkParameters: TrunkedNetwork,
    options?: TrunkedNetworksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TrunkedNetwork>, TrunkedNetwork>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    trunkedNetworkParameters: TrunkedNetwork,
    options?: TrunkedNetworksCreateOrUpdateOptionalParams,
  ) => Promise<TrunkedNetwork>;
  /** Get properties of the provided trunked network. */
  get: (
    resourceGroupName: string,
    trunkedNetworkName: string,
    options?: TrunkedNetworksGetOptionalParams,
  ) => Promise<TrunkedNetwork>;
}

function _getTrunkedNetworks(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: TrunkedNetworksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: TrunkedNetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      trunkedNetworkName: string,
      options?: TrunkedNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, trunkedNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      trunkedNetworkName: string,
      options?: TrunkedNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, trunkedNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      trunkedNetworkName: string,
      options?: TrunkedNetworksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, trunkedNetworkName, options);
    },
    update: (
      resourceGroupName: string,
      trunkedNetworkName: string,
      options?: TrunkedNetworksUpdateOptionalParams,
    ) => update(context, resourceGroupName, trunkedNetworkName, options),
    createOrUpdate: (
      resourceGroupName: string,
      trunkedNetworkName: string,
      trunkedNetworkParameters: TrunkedNetwork,
      options?: TrunkedNetworksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        trunkedNetworkName,
        trunkedNetworkParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      trunkedNetworkName: string,
      trunkedNetworkParameters: TrunkedNetwork,
      options?: TrunkedNetworksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        trunkedNetworkName,
        trunkedNetworkParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      trunkedNetworkName: string,
      trunkedNetworkParameters: TrunkedNetwork,
      options?: TrunkedNetworksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        trunkedNetworkName,
        trunkedNetworkParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      trunkedNetworkName: string,
      options?: TrunkedNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, trunkedNetworkName, options),
  };
}

export function _getTrunkedNetworksOperations(
  context: NetworkCloudContext,
): TrunkedNetworksOperations {
  return {
    ..._getTrunkedNetworks(context),
  };
}
