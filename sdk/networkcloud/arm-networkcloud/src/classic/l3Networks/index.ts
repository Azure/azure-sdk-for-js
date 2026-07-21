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
} from "../../api/l3Networks/operations.js";
import {
  L3NetworksListBySubscriptionOptionalParams,
  L3NetworksListByResourceGroupOptionalParams,
  L3NetworksDeleteOptionalParams,
  L3NetworksUpdateOptionalParams,
  L3NetworksCreateOrUpdateOptionalParams,
  L3NetworksGetOptionalParams,
} from "../../api/l3Networks/options.js";
import { OperationStatusResult, L3Network } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a L3Networks operations. */
export interface L3NetworksOperations {
  /** Get a list of layer 3 (L3) networks in the provided subscription. */
  listBySubscription: (
    options?: L3NetworksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<L3Network>;
  /** Get a list of layer 3 (L3) networks in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: L3NetworksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<L3Network>;
  /** Delete the provided layer 3 (L3) network. */
  delete: (
    resourceGroupName: string,
    l3NetworkName: string,
    options?: L3NetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    l3NetworkName: string,
    options?: L3NetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    l3NetworkName: string,
    options?: L3NetworksDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update tags associated with the provided layer 3 (L3) network. */
  update: (
    resourceGroupName: string,
    l3NetworkName: string,
    options?: L3NetworksUpdateOptionalParams,
  ) => Promise<L3Network>;
  /** Create a new layer 3 (L3) network or update the properties of the existing network. */
  createOrUpdate: (
    resourceGroupName: string,
    l3NetworkName: string,
    l3NetworkParameters: L3Network,
    options?: L3NetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<L3Network>, L3Network>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    l3NetworkName: string,
    l3NetworkParameters: L3Network,
    options?: L3NetworksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<L3Network>, L3Network>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    l3NetworkName: string,
    l3NetworkParameters: L3Network,
    options?: L3NetworksCreateOrUpdateOptionalParams,
  ) => Promise<L3Network>;
  /** Get properties of the provided layer 3 (L3) network. */
  get: (
    resourceGroupName: string,
    l3NetworkName: string,
    options?: L3NetworksGetOptionalParams,
  ) => Promise<L3Network>;
}

function _getL3Networks(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: L3NetworksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: L3NetworksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      l3NetworkName: string,
      options?: L3NetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3NetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      l3NetworkName: string,
      options?: L3NetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, l3NetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      l3NetworkName: string,
      options?: L3NetworksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, l3NetworkName, options);
    },
    update: (
      resourceGroupName: string,
      l3NetworkName: string,
      options?: L3NetworksUpdateOptionalParams,
    ) => update(context, resourceGroupName, l3NetworkName, options),
    createOrUpdate: (
      resourceGroupName: string,
      l3NetworkName: string,
      l3NetworkParameters: L3Network,
      options?: L3NetworksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, l3NetworkName, l3NetworkParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      l3NetworkName: string,
      l3NetworkParameters: L3Network,
      options?: L3NetworksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        l3NetworkName,
        l3NetworkParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      l3NetworkName: string,
      l3NetworkParameters: L3Network,
      options?: L3NetworksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        l3NetworkName,
        l3NetworkParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      l3NetworkName: string,
      options?: L3NetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l3NetworkName, options),
  };
}

export function _getL3NetworksOperations(context: NetworkCloudContext): L3NetworksOperations {
  return {
    ..._getL3Networks(context),
  };
}
