// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/privateLinkScopes/operations.js";
import type {
  PrivateLinkScopesListOptionalParams,
  PrivateLinkScopesListByResourceGroupOptionalParams,
  PrivateLinkScopesDeleteOptionalParams,
  PrivateLinkScopesUpdateTagsOptionalParams,
  PrivateLinkScopesCreateOrUpdateOptionalParams,
  PrivateLinkScopesGetOptionalParams,
} from "../../api/privateLinkScopes/options.js";
import type {
  AzureMonitorPrivateLinkScope,
  TagsResource,
} from "../../models/microsoft/privateLinkScopes/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateLinkScopes operations. */
export interface PrivateLinkScopesOperations {
  /** Gets a list of all Azure Monitor PrivateLinkScopes within a subscription. */
  list: (
    options?: PrivateLinkScopesListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureMonitorPrivateLinkScope>;
  /** Gets a list of Azure Monitor PrivateLinkScopes within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PrivateLinkScopesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AzureMonitorPrivateLinkScope>;
  /** Deletes a Azure Monitor PrivateLinkScope. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method. */
  updateTags: (
    resourceGroupName: string,
    scopeName: string,
    privateLinkScopeTags: TagsResource,
    options?: PrivateLinkScopesUpdateTagsOptionalParams,
  ) => Promise<AzureMonitorPrivateLinkScope>;
  /** Creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    azureMonitorPrivateLinkScopePayload: AzureMonitorPrivateLinkScope,
    options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
  ) => Promise<AzureMonitorPrivateLinkScope>;
  /** Returns a Azure Monitor PrivateLinkScope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesGetOptionalParams,
  ) => Promise<AzureMonitorPrivateLinkScope>;
}

function _getPrivateLinkScopes(context: MonitorContext) {
  return {
    list: (options?: PrivateLinkScopesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PrivateLinkScopesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, scopeName, options),
    beginDelete: async (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, scopeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, scopeName, options);
    },
    updateTags: (
      resourceGroupName: string,
      scopeName: string,
      privateLinkScopeTags: TagsResource,
      options?: PrivateLinkScopesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, scopeName, privateLinkScopeTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      scopeName: string,
      azureMonitorPrivateLinkScopePayload: AzureMonitorPrivateLinkScope,
      options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        azureMonitorPrivateLinkScopePayload,
        options,
      ),
    get: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, options),
  };
}

export function _getPrivateLinkScopesOperations(
  context: MonitorContext,
): PrivateLinkScopesOperations {
  return {
    ..._getPrivateLinkScopes(context),
  };
}
