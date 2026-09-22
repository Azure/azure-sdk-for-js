// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  regenerateKey,
  listSharedAccessKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/domains/operations.js";
import type {
  DomainsRegenerateKeyOptionalParams,
  DomainsListSharedAccessKeysOptionalParams,
  DomainsListBySubscriptionOptionalParams,
  DomainsListByResourceGroupOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "../../api/domains/options.js";
import type {
  Domain,
  DomainUpdateParameters,
  DomainSharedAccessKeys,
  DomainRegenerateKeyRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Domains operations. */
export interface DomainsOperations {
  /** Regenerate a shared access key for a domain. */
  regenerateKey: (
    resourceGroupName: string,
    domainName: string,
    regenerateKeyRequest: DomainRegenerateKeyRequest,
    options?: DomainsRegenerateKeyOptionalParams,
  ) => Promise<DomainSharedAccessKeys>;
  /** List the two keys used to publish to a domain. */
  listSharedAccessKeys: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsListSharedAccessKeysOptionalParams,
  ) => Promise<DomainSharedAccessKeys>;
  /** List all the domains under an Azure subscription. */
  listBySubscription: (
    options?: DomainsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Domain>;
  /** List all the domains under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DomainsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Domain>;
  /** Delete existing domain. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a domain with the specified parameters. */
  update: (
    resourceGroupName: string,
    domainName: string,
    domainUpdateParameters: DomainUpdateParameters,
    options?: DomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<Domain>, Domain>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    domainName: string,
    domainUpdateParameters: DomainUpdateParameters,
    options?: DomainsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Domain>, Domain>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    domainUpdateParameters: DomainUpdateParameters,
    options?: DomainsUpdateOptionalParams,
  ) => Promise<Domain>;
  /** Asynchronously creates or updates a new domain with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    domainInfo: Domain,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Domain>, Domain>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    domainInfo: Domain,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Domain>, Domain>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    domainInfo: Domain,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => Promise<Domain>;
  /** Get properties of a domain. */
  get: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsGetOptionalParams,
  ) => Promise<Domain>;
}

function _getDomains(context: EventGridManagementContext) {
  return {
    regenerateKey: (
      resourceGroupName: string,
      domainName: string,
      regenerateKeyRequest: DomainRegenerateKeyRequest,
      options?: DomainsRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, domainName, regenerateKeyRequest, options),
    listSharedAccessKeys: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsListSharedAccessKeysOptionalParams,
    ) => listSharedAccessKeys(context, resourceGroupName, domainName, options),
    listBySubscription: (options?: DomainsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DomainsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, domainName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, domainName, options);
    },
    update: (
      resourceGroupName: string,
      domainName: string,
      domainUpdateParameters: DomainUpdateParameters,
      options?: DomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, domainName, domainUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      domainName: string,
      domainUpdateParameters: DomainUpdateParameters,
      options?: DomainsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        domainName,
        domainUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      domainName: string,
      domainUpdateParameters: DomainUpdateParameters,
      options?: DomainsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, domainName, domainUpdateParameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      domainName: string,
      domainInfo: Domain,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, domainName, domainInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      domainName: string,
      domainInfo: Domain,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, domainName, domainInfo, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      domainName: string,
      domainInfo: Domain,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, domainName, domainInfo, options);
    },
    get: (resourceGroupName: string, domainName: string, options?: DomainsGetOptionalParams) =>
      get(context, resourceGroupName, domainName, options),
  };
}

export function _getDomainsOperations(context: EventGridManagementContext): DomainsOperations {
  return {
    ..._getDomains(context),
  };
}
