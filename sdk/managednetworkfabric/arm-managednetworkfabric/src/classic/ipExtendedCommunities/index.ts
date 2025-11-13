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
  /** API to update certain properties of the IP Extended Community resource. */
  update: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    properties: IpExtendedCommunityPatch,
    options?: IpExtendedCommunitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>;
  /** Implements IP Extended Community PUT method. */
  create: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    resource: IpExtendedCommunity,
    options?: IpExtendedCommunitiesCreateOptionalParams,
  ) => PollerLike<OperationState<IpExtendedCommunity>, IpExtendedCommunity>;
  /** Implements IP Extended Community GET method. */
  get: (
    resourceGroupName: string,
    ipExtendedCommunityName: string,
    options?: IpExtendedCommunitiesGetOptionalParams,
  ) => Promise<IpExtendedCommunity>;
}

function _getIpExtendedCommunities(context: ManagedNetworkFabricContext) {
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
    update: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      properties: IpExtendedCommunityPatch,
      options?: IpExtendedCommunitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipExtendedCommunityName, properties, options),
    create: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      resource: IpExtendedCommunity,
      options?: IpExtendedCommunitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipExtendedCommunityName, resource, options),
    get: (
      resourceGroupName: string,
      ipExtendedCommunityName: string,
      options?: IpExtendedCommunitiesGetOptionalParams,
    ) => get(context, resourceGroupName, ipExtendedCommunityName, options),
  };
}

export function _getIpExtendedCommunitiesOperations(
  context: ManagedNetworkFabricContext,
): IpExtendedCommunitiesOperations {
  return {
    ..._getIpExtendedCommunities(context),
  };
}
