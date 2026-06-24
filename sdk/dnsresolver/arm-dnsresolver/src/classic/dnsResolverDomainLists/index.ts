// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  bulk,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolverDomainLists/operations.js";
import {
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsGetOptionalParams,
} from "../../api/dnsResolverDomainLists/options.js";
import {
  DnsResolverDomainList,
  DnsResolverDomainListPatch,
  DnsResolverDomainListBulk,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolverDomainLists operations. */
export interface DnsResolverDomainListsOperations {
  /** Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link. */
  bulk: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** @deprecated use bulk instead */
  beginBulk: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>>;
  /** @deprecated use bulk instead */
  beginBulkAndWait: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListBulk,
    options?: DnsResolverDomainListsBulkOptionalParams,
  ) => Promise<DnsResolverDomainList>;
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
  delete: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    options?: DnsResolverDomainListsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS resolver domain list. */
  update: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainListPatch,
    options?: DnsResolverDomainListsUpdateOptionalParams,
  ) => Promise<DnsResolverDomainList>;
  /** Creates or updates a DNS resolver domain list. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverDomainListName: string,
    parameters: DnsResolverDomainList,
    options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
  ) => Promise<DnsResolverDomainList>;
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
    beginBulk: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListBulk,
      options?: DnsResolverDomainListsBulkOptionalParams,
    ) => {
      const poller = bulk(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBulkAndWait: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListBulk,
      options?: DnsResolverDomainListsBulkOptionalParams,
    ) => {
      return await bulk(context, resourceGroupName, dnsResolverDomainListName, parameters, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      options?: DnsResolverDomainListsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dnsResolverDomainListName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      options?: DnsResolverDomainListsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dnsResolverDomainListName, options);
    },
    update: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListPatch,
      options?: DnsResolverDomainListsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListPatch,
      options?: DnsResolverDomainListsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainListPatch,
      options?: DnsResolverDomainListsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainList,
      options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainList,
      options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverDomainListName: string,
      parameters: DnsResolverDomainList,
      options?: DnsResolverDomainListsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      );
    },
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
