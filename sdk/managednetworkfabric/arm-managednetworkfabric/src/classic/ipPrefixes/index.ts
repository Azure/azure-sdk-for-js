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
  /** API to update certain properties of the IP Prefix resource. */
  update: (
    resourceGroupName: string,
    ipPrefixName: string,
    properties: IpPrefixPatch,
    options?: IpPrefixesUpdateOptionalParams,
  ) => PollerLike<OperationState<IpPrefix>, IpPrefix>;
  /** Implements IP Prefix PUT method. */
  create: (
    resourceGroupName: string,
    ipPrefixName: string,
    resource: IpPrefix,
    options?: IpPrefixesCreateOptionalParams,
  ) => PollerLike<OperationState<IpPrefix>, IpPrefix>;
  /** Implements IP Prefix GET method. */
  get: (
    resourceGroupName: string,
    ipPrefixName: string,
    options?: IpPrefixesGetOptionalParams,
  ) => Promise<IpPrefix>;
}

function _getIpPrefixes(context: ManagedNetworkFabricContext) {
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
    update: (
      resourceGroupName: string,
      ipPrefixName: string,
      properties: IpPrefixPatch,
      options?: IpPrefixesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ipPrefixName, properties, options),
    create: (
      resourceGroupName: string,
      ipPrefixName: string,
      resource: IpPrefix,
      options?: IpPrefixesCreateOptionalParams,
    ) => create(context, resourceGroupName, ipPrefixName, resource, options),
    get: (resourceGroupName: string, ipPrefixName: string, options?: IpPrefixesGetOptionalParams) =>
      get(context, resourceGroupName, ipPrefixName, options),
  };
}

export function _getIpPrefixesOperations(
  context: ManagedNetworkFabricContext,
): IpPrefixesOperations {
  return {
    ..._getIpPrefixes(context),
  };
}
