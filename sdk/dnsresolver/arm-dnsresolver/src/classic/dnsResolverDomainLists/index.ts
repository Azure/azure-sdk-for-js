// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  bulk,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolverDomainLists/operations.js";
import type {
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsGetOptionalParams,
} from "../../api/dnsResolverDomainLists/options.js";
import type {
  DnsResolverDomainList,
  DnsResolverDomainListPatch,
  DnsResolverDomainListBulk,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolverDomainLists operations. */
export interface DnsResolverDomainListsOperations {
  /** Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link. */
  bulk: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** Lists DNS resolver domain lists in all resource groups of a subscription. */
  list: (
    options?: DnsResolverDomainListsListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverDomainList>;
  /** Lists DNS resolver domain lists within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverDomainList>;
  /** Deletes a DNS resolver domain list. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS resolver domain list. */
  update: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** Creates or updates a DNS resolver domain list. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** Gets properties of a DNS resolver domain list. */
  get: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsGetOptionalParams,
  ) => Promise<DnsResolverDomainList>;
}

function _getDnsResolverDomainLists(context: DnsResolverManagementContext) {
  return {
    bulk: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListBulk,
      options?: DnsResolverDomainListsBulkOptionalParams,
    ) => bulk(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    list: (options?: DnsResolverDomainListsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DnsResolverDomainListsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      options?: DnsResolverDomainListsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverDomainListName, options),
    update: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListPatch,
      options?: DnsResolverDomainListsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainList,
      options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    get: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      options?: DnsResolverDomainListsGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverDomainListName, options),
  };
}

export function _getDnsResolverDomainListsOperations(
  context: DnsResolverManagementContext,
): DnsResolverDomainListsOperations {
  return {
    ..._getDnsResolverDomainLists(context),
  };
}
