// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  listByVirtualNetwork,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolvers/operations.js";
import type {
  DnsResolversListByVirtualNetworkOptionalParams,
  DnsResolversListOptionalParams,
  DnsResolversListByResourceGroupOptionalParams,
  DnsResolversDeleteOptionalParams,
  DnsResolversUpdateOptionalParams,
  DnsResolversCreateOrUpdateOptionalParams,
  DnsResolversGetOptionalParams,
} from "../../api/dnsResolvers/options.js";
import type { DnsResolver, SubResource, DnsResolverPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolvers operations. */
export interface DnsResolversOperations {
  /** Lists DNS resolver resource IDs linked to a virtual network. */
  listByVirtualNetwork: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: DnsResolversListByVirtualNetworkOptionalParams,
  ) => PagedAsyncIterableIterator<SubResource>;
  /** Lists DNS resolvers in all resource groups of a subscription. */
  list: (options?: DnsResolversListOptionalParams) => PagedAsyncIterableIterator<DnsResolver>;
  /** Lists DNS resolvers within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DnsResolversListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolver>;
  /** Deletes a DNS resolver. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: DnsResolversDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolverPatch,
    options?: DnsResolversUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolver>, DnsResolver>;
  /** Creates or updates a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolver,
    options?: DnsResolversCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolver>, DnsResolver>;
  /** Gets properties of a DNS resolver. */
  get: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: DnsResolversGetOptionalParams,
  ) => Promise<DnsResolver>;
}

function _getDnsResolvers(context: DnsResolverManagementContext) {
  return {
    listByVirtualNetwork: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: DnsResolversListByVirtualNetworkOptionalParams,
    ) => listByVirtualNetwork(context, resourceGroupName, virtualNetworkName, options),
    list: (options?: DnsResolversListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DnsResolversListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: DnsResolversDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverName, options),
    update: (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolverPatch,
      options?: DnsResolversUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolver,
      options?: DnsResolversCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverName, parameters, options),
    get: (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: DnsResolversGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverName, options),
  };
}

export function _getDnsResolversOperations(
  context: DnsResolverManagementContext,
): DnsResolversOperations {
  return {
    ..._getDnsResolvers(context),
  };
}
