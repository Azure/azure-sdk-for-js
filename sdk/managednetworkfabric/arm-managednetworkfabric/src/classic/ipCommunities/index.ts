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
  /** API to update certain properties of the IP Community resource. */
  update: (
    resourceGroupName: string,
    ipCommunityName: string,
    properties: IpCommunityPatch,
    options?: IpCommunitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpCommunity>, IpCommunity>;
  /** Implements an IP Community PUT method. */
  create: (
    resourceGroupName: string,
    ipCommunityName: string,
    resource: IpCommunity,
    options?: IpCommunitiesCreateOptionalParams,
  ) => PollerLike<OperationState<IpCommunity>, IpCommunity>;
  /** Implements an IP Community GET method. */
  get: (
    resourceGroupName: string,
    ipCommunityName: string,
    options?: IpCommunitiesGetOptionalParams,
  ) => Promise<IpCommunity>;
}

function _getIpCommunities(context: ManagedNetworkFabricContext) {
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
    update: (
      resourceGroupName: string,
      ipCommunityName: string,
      properties: IpCommunityPatch,
      options?: IpCommunitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipCommunityName, properties, options),
    create: (
      resourceGroupName: string,
      ipCommunityName: string,
      resource: IpCommunity,
      options?: IpCommunitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipCommunityName, resource, options),
    get: (
      resourceGroupName: string,
      ipCommunityName: string,
      options?: IpCommunitiesGetOptionalParams,
    ) => get(context, resourceGroupName, ipCommunityName, options),
  };
}

export function _getIpCommunitiesOperations(
  context: ManagedNetworkFabricContext,
): IpCommunitiesOperations {
  return {
    ..._getIpCommunities(context),
  };
}
