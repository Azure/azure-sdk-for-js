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
} from "../../api/l2Networks/operations.js";
import {
  L2NetworksListBySubscriptionOptionalParams,
  L2NetworksListByResourceGroupOptionalParams,
  L2NetworksDeleteOptionalParams,
  L2NetworksUpdateOptionalParams,
  L2NetworksCreateOrUpdateOptionalParams,
  L2NetworksGetOptionalParams,
} from "../../api/l2Networks/options.js";
import { OperationStatusResult, L2Network } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a L2Networks operations. */
export interface L2NetworksOperations {
  /** Get a list of layer 2 (L2) networks in the provided subscription. */
  listBySubscription: (
    options?: L2NetworksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<L2Network>;
  /** Get a list of layer 2 (L2) networks in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: L2NetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<L2Network>;
  /** Delete the provided layer 2 (L2) network. */
  delete: (
    resourceGroupName: string,
    l2NetworkName: string,
    options?: L2NetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Update tags associated with the provided layer 2 (L2) network. */
  update: (
    resourceGroupName: string,
    l2NetworkName: string,
    options?: L2NetworksUpdateOptionalParams,
  ) => Promise<L2Network>;
  /** Create a new layer 2 (L2) network or update the properties of the existing network. */
  createOrUpdate: (
    resourceGroupName: string,
    l2NetworkName: string,
    l2NetworkParameters: L2Network,
    options?: L2NetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<L2Network>, L2Network>;
  /** Get properties of the provided layer 2 (L2) network. */
  get: (
    resourceGroupName: string,
    l2NetworkName: string,
    options?: L2NetworksGetOptionalParams,
  ) => Promise<L2Network>;
}

function _getL2Networks(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: L2NetworksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: L2NetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      l2NetworkName: string,
      options?: L2NetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l2NetworkName, options),
    update: (
      resourceGroupName: string,
      l2NetworkName: string,
      options?: L2NetworksUpdateOptionalParams,
    ) => update(context, resourceGroupName, l2NetworkName, options),
    createOrUpdate: (
      resourceGroupName: string,
      l2NetworkName: string,
      l2NetworkParameters: L2Network,
      options?: L2NetworksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, l2NetworkName, l2NetworkParameters, options),
    get: (
      resourceGroupName: string,
      l2NetworkName: string,
      options?: L2NetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l2NetworkName, options),
  };
}

export function _getL2NetworksOperations(context: NetworkCloudContext): L2NetworksOperations {
  return {
    ..._getL2Networks(context),
  };
}
