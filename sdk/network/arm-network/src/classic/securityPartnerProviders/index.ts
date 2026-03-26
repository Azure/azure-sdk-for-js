// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/securityPartnerProviders/operations.js";
import type {
  SecurityPartnerProvidersListOptionalParams,
  SecurityPartnerProvidersListByResourceGroupOptionalParams,
  SecurityPartnerProvidersDeleteOptionalParams,
  SecurityPartnerProvidersUpdateTagsOptionalParams,
  SecurityPartnerProvidersCreateOrUpdateOptionalParams,
  SecurityPartnerProvidersGetOptionalParams,
} from "../../api/securityPartnerProviders/options.js";
import type { TagsObject, SecurityPartnerProvider } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityPartnerProviders operations. */
export interface SecurityPartnerProvidersOperations {
  /** Gets all the Security Partner Providers in a subscription. */
  list: (
    options?: SecurityPartnerProvidersListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityPartnerProvider>;
  /** Lists all Security Partner Providers in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SecurityPartnerProvidersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityPartnerProvider>;
  /** Deletes the specified Security Partner Provider. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    options?: SecurityPartnerProvidersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    options?: SecurityPartnerProvidersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    options?: SecurityPartnerProvidersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of a Security Partner Provider resource. */
  updateTags: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    parameters: TagsObject,
    options?: SecurityPartnerProvidersUpdateTagsOptionalParams,
  ) => Promise<SecurityPartnerProvider>;
  /** Creates or updates the specified Security Partner Provider. */
  createOrUpdate: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    parameters: SecurityPartnerProvider,
    options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SecurityPartnerProvider>, SecurityPartnerProvider>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    parameters: SecurityPartnerProvider,
    options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SecurityPartnerProvider>, SecurityPartnerProvider>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    parameters: SecurityPartnerProvider,
    options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
  ) => Promise<SecurityPartnerProvider>;
  /** Gets the specified Security Partner Provider. */
  get: (
    resourceGroupName: string,
    securityPartnerProviderName: string,
    options?: SecurityPartnerProvidersGetOptionalParams,
  ) => Promise<SecurityPartnerProvider>;
}

function _getSecurityPartnerProviders(context: NetworkManagementContext) {
  return {
    list: (options?: SecurityPartnerProvidersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SecurityPartnerProvidersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      options?: SecurityPartnerProvidersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, securityPartnerProviderName, options),
    beginDelete: async (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      options?: SecurityPartnerProvidersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, securityPartnerProviderName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      options?: SecurityPartnerProvidersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, securityPartnerProviderName, options);
    },
    updateTags: (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      parameters: TagsObject,
      options?: SecurityPartnerProvidersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, securityPartnerProviderName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      parameters: SecurityPartnerProvider,
      options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, securityPartnerProviderName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      parameters: SecurityPartnerProvider,
      options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        securityPartnerProviderName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      parameters: SecurityPartnerProvider,
      options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        securityPartnerProviderName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      securityPartnerProviderName: string,
      options?: SecurityPartnerProvidersGetOptionalParams,
    ) => get(context, resourceGroupName, securityPartnerProviderName, options),
  };
}

export function _getSecurityPartnerProvidersOperations(
  context: NetworkManagementContext,
): SecurityPartnerProvidersOperations {
  return {
    ..._getSecurityPartnerProviders(context),
  };
}
