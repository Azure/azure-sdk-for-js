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
} from "../../api/ipPrefixes/operations.js";
import type {
  IpPrefixesListBySubscriptionOptionalParams,
  IpPrefixesListByResourceGroupOptionalParams,
  IpPrefixesDeleteOptionalParams,
  IpPrefixesUpdateOptionalParams,
  IpPrefixesCreateOptionalParams,
  IpPrefixesGetOptionalParams,
} from "../../api/ipPrefixes/options.js";
import type { IpPrefix, IpPrefixPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpPrefixes operations. */
export interface IpPrefixesOperations {
  /** Implements IpPrefixes list by subscription GET method. */
  listBySubscription: (
    options?: IpPrefixesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IpPrefix>;
  /** Implements IpPrefixes list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IpPrefixesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IpPrefix>;
  /** Implements IP Prefix DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ipPrefixName: string,
    options?: IpPrefixesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ipPrefixName: string,
    options?: IpPrefixesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ipPrefixName: string,
    options?: IpPrefixesDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the IP Prefix resource. */
  update: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefixPatch,
    options?: IpPrefixesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpPrefix>, IpPrefix>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefixPatch,
    options?: IpPrefixesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpPrefix>, IpPrefix>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefixPatch,
    options?: IpPrefixesUpdateOptionalParams,
  ) => Promise<IpPrefix>;
  /** Implements IP Prefix PUT method. */
  create: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefix,
    options?: IpPrefixesCreateOptionalParams,
  ) => PollerLike<OperationState<IpPrefix>, IpPrefix>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefix,
    options?: IpPrefixesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpPrefix>, IpPrefix>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    ipPrefixName: string,
    body: IpPrefix,
    options?: IpPrefixesCreateOptionalParams,
  ) => Promise<IpPrefix>;
  /** Implements IP Prefix GET method. */
  get: (
    resourceGroupName: string,
    ipPrefixName: string,
    options?: IpPrefixesGetOptionalParams,
  ) => Promise<IpPrefix>;
}

function _getIpPrefixes(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: IpPrefixesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IpPrefixesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ipPrefixName: string,
      options?: IpPrefixesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ipPrefixName, options),
    beginDelete: async (
      resourceGroupName: string,
      ipPrefixName: string,
      options?: IpPrefixesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ipPrefixName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ipPrefixName: string,
      options?: IpPrefixesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ipPrefixName, options);
    },
    update: (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefixPatch,
      options?: IpPrefixesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipPrefixName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefixPatch,
      options?: IpPrefixesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, ipPrefixName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefixPatch,
      options?: IpPrefixesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, ipPrefixName, body, options);
    },
    create: (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefix,
      options?: IpPrefixesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipPrefixName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefix,
      options?: IpPrefixesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, ipPrefixName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      ipPrefixName: string,
      body: IpPrefix,
      options?: IpPrefixesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, ipPrefixName, body, options);
    },
    get: (resourceGroupName: string, ipPrefixName: string, options?: IpPrefixesGetOptionalParams) =>
      get(context, resourceGroupName, ipPrefixName, options),
  };
}

export function _getIpPrefixesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): IpPrefixesOperations {
  return {
    ..._getIpPrefixes(context),
  };
}
