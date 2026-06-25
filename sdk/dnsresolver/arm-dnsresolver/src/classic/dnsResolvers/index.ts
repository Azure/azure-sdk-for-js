// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  listByVirtualNetwork,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolvers/operations.js";
import {
  DnsResolversListByVirtualNetworkOptionalParams,
  DnsResolversListOptionalParams,
  DnsResolversListByResourceGroupOptionalParams,
  DnsResolversDeleteOptionalParams,
  DnsResolversUpdateOptionalParams,
  DnsResolversCreateOrUpdateOptionalParams,
  DnsResolversGetOptionalParams,
} from "../../api/dnsResolvers/options.js";
import { DnsResolver, SubResource, DnsResolverPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: DnsResolversDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: DnsResolversDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: DnsResolversDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolverPatch,
    options?: DnsResolversUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolver>, DnsResolver>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolverPatch,
    options?: DnsResolversUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolver>, DnsResolver>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolverPatch,
    options?: DnsResolversUpdateOptionalParams,
  ) => Promise<DnsResolver>;
  /** Creates or updates a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolver,
    options?: DnsResolversCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolver>, DnsResolver>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolver,
    options?: DnsResolversCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolver>, DnsResolver>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    parameters: DnsResolver,
    options?: DnsResolversCreateOrUpdateOptionalParams,
  ) => Promise<DnsResolver>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: DnsResolversDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dnsResolverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: DnsResolversDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dnsResolverName, options);
    },
    update: (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolverPatch,
      options?: DnsResolversUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolverPatch,
      options?: DnsResolversUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, dnsResolverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolverPatch,
      options?: DnsResolversUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, dnsResolverName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolver,
      options?: DnsResolversCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolver,
      options?: DnsResolversCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      parameters: DnsResolver,
      options?: DnsResolversCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, dnsResolverName, parameters, options);
    },
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
