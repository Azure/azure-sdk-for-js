// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkScopesContext } from "../../api/privateLinkScopesContext.js";
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
import type { KubernetesConfigurationPrivateLinkScope, TagsResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkScopes operations. */
export interface PrivateLinkScopesOperations {
  /** Gets a list of all Azure Arc PrivateLinkScopes within a subscription. */
  list: (
    options?: PrivateLinkScopesListOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesConfigurationPrivateLinkScope>;
  /** Gets a list of Azure Arc PrivateLinkScopes within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PrivateLinkScopesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesConfigurationPrivateLinkScope>;
  /** Deletes a Azure Arc PrivateLinkScope. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
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
  ) => Promise<KubernetesConfigurationPrivateLinkScope>;
  /** Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    parameters: KubernetesConfigurationPrivateLinkScope,
    options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
  ) => Promise<KubernetesConfigurationPrivateLinkScope>;
  /** Returns a Azure Arc PrivateLinkScope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesGetOptionalParams,
  ) => Promise<KubernetesConfigurationPrivateLinkScope>;
}

function _getPrivateLinkScopes(context: PrivateLinkScopesContext) {
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
    updateTags: (
      resourceGroupName: string,
      scopeName: string,
      privateLinkScopeTags: TagsResource,
      options?: PrivateLinkScopesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, scopeName, privateLinkScopeTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      scopeName: string,
      parameters: KubernetesConfigurationPrivateLinkScope,
      options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, scopeName, parameters, options),
    get: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, options),
  };
}

export function _getPrivateLinkScopesOperations(
  context: PrivateLinkScopesContext,
): PrivateLinkScopesOperations {
  return {
    ..._getPrivateLinkScopes(context),
  };
}
