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
} from "../../api/ipExtendedCommunities/operations.js";
import type {
  IpExtendedCommunitiesListBySubscriptionOptionalParams,
  IpExtendedCommunitiesListByResourceGroupOptionalParams,
  IpExtendedCommunitiesDeleteOptionalParams,
  IpExtendedCommunitiesUpdateOptionalParams,
  IpExtendedCommunitiesCreateOptionalParams,
  IpExtendedCommunitiesGetOptionalParams,
} from "../../api/ipExtendedCommunities/options.js";
import type { IpExtendedCommunity, IpExtendedCommunityPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpExtendedCommunities operations. */
export interface IpExtendedCommunitiesOperations {
  /** Implements IpExtendedCommunities list by subscription GET method. */
  listBySubscription: (
    options?: IpExtendedCommunitiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IpExtendedCommunity>;
  /** Implements IpExtendedCommunities list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IpExtendedCommunitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IpExtendedCommunity>;
  /** Implements IP Extended Community DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    options?: IpExtendedCommunitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    options?: IpExtendedCommunitiesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    options?: IpExtendedCommunitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the IP Extended Community resource. */
  update: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunityPatch,
    options?: IpExtendedCommunitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunityPatch,
    options?: IpExtendedCommunitiesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunityPatch,
    options?: IpExtendedCommunitiesUpdateOptionalParams,
  ) => Promise<IpExtendedCommunity>;
  /** Implements IP Extended Community PUT method. */
  create: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunity,
    options?: IpExtendedCommunitiesCreateOptionalParams,
  ) => PollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunity,
    options?: IpExtendedCommunitiesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    body: IpExtendedCommunity,
    options?: IpExtendedCommunitiesCreateOptionalParams,
  ) => Promise<IpExtendedCommunity>;
  /** Implements IP Extended Community GET method. */
  get: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    options?: IpExtendedCommunitiesGetOptionalParams,
  ) => Promise<IpExtendedCommunity>;
}

function _getIpExtendedCommunities(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: IpExtendedCommunitiesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IpExtendedCommunitiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      options?: IpExtendedCommunitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ipExtendedCommunityName, options),
    beginDelete: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      options?: IpExtendedCommunitiesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ipExtendedCommunityName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      options?: IpExtendedCommunitiesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ipExtendedCommunityName, options);
    },
    update: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunityPatch,
      options?: IpExtendedCommunitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipExtendedCommunityName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunityPatch,
      options?: IpExtendedCommunitiesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, ipExtendedCommunityName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunityPatch,
      options?: IpExtendedCommunitiesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, ipExtendedCommunityName, body, options);
    },
    create: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunity,
      options?: IpExtendedCommunitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipExtendedCommunityName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunity,
      options?: IpExtendedCommunitiesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, ipExtendedCommunityName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      body: IpExtendedCommunity,
      options?: IpExtendedCommunitiesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, ipExtendedCommunityName, body, options);
    },
    get: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      options?: IpExtendedCommunitiesGetOptionalParams,
    ) => get(context, resourceGroupName, ipExtendedCommunityName, options),
  };
}

export function _getIpExtendedCommunitiesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): IpExtendedCommunitiesOperations {
  return {
    ..._getIpExtendedCommunities(context),
  };
}
