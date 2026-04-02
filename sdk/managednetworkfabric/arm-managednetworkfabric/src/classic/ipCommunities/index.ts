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
} from "../../api/ipCommunities/operations.js";
import type {
  IpCommunitiesListBySubscriptionOptionalParams,
  IpCommunitiesListByResourceGroupOptionalParams,
  IpCommunitiesDeleteOptionalParams,
  IpCommunitiesUpdateOptionalParams,
  IpCommunitiesCreateOptionalParams,
  IpCommunitiesGetOptionalParams,
} from "../../api/ipCommunities/options.js";
import type { IpCommunity, IpCommunityPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IpCommunities operations. */
export interface IpCommunitiesOperations {
  /** Implements IP Communities list by subscription GET method. */
  listBySubscription: (
    options?: IpCommunitiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IpCommunity>;
  /** Implements IP Communities list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IpCommunitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IpCommunity>;
  /** Implements IP Community DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ipCommunityName: string,
    options?: IpCommunitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ipCommunityName: string,
    options?: IpCommunitiesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ipCommunityName: string,
    options?: IpCommunitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the IP Community resource. */
  update: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunityPatch,
    options?: IpCommunitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpCommunity>, IpCommunity>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunityPatch,
    options?: IpCommunitiesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpCommunity>, IpCommunity>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunityPatch,
    options?: IpCommunitiesUpdateOptionalParams,
  ) => Promise<IpCommunity>;
  /** Implements an IP Community PUT method. */
  create: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunity,
    options?: IpCommunitiesCreateOptionalParams,
  ) => PollerLike<OperationState<IpCommunity>, IpCommunity>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunity,
    options?: IpCommunitiesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IpCommunity>, IpCommunity>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    ipCommunityName: string,
    body: IpCommunity,
    options?: IpCommunitiesCreateOptionalParams,
  ) => Promise<IpCommunity>;
  /** Implements an IP Community GET method. */
  get: (
    resourceGroupName: string,
    ipCommunityName: string,
    options?: IpCommunitiesGetOptionalParams,
  ) => Promise<IpCommunity>;
}

function _getIpCommunities(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: IpCommunitiesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IpCommunitiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ipCommunityName: string,
      options?: IpCommunitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ipCommunityName, options),
    beginDelete: async (
      resourceGroupName: string,
      ipCommunityName: string,
      options?: IpCommunitiesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ipCommunityName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ipCommunityName: string,
      options?: IpCommunitiesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ipCommunityName, options);
    },
    update: (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunityPatch,
      options?: IpCommunitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipCommunityName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunityPatch,
      options?: IpCommunitiesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, ipCommunityName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunityPatch,
      options?: IpCommunitiesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, ipCommunityName, body, options);
    },
    create: (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunity,
      options?: IpCommunitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipCommunityName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunity,
      options?: IpCommunitiesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, ipCommunityName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      ipCommunityName: string,
      body: IpCommunity,
      options?: IpCommunitiesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, ipCommunityName, body, options);
    },
    get: (
      resourceGroupName: string,
      ipCommunityName: string,
      options?: IpCommunitiesGetOptionalParams,
    ) => get(context, resourceGroupName, ipCommunityName, options),
  };
}

export function _getIpCommunitiesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): IpCommunitiesOperations {
  return {
    ..._getIpCommunities(context),
  };
}
