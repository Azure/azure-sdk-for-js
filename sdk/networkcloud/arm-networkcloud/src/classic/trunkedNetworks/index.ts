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
