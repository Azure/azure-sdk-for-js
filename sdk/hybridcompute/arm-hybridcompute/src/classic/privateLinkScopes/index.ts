// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  getValidationDetails,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  getValidationDetailsForMachine,
} from "../../api/privateLinkScopes/operations.js";
import {
  PrivateLinkScopesGetValidationDetailsOptionalParams,
  PrivateLinkScopesListOptionalParams,
  PrivateLinkScopesListByResourceGroupOptionalParams,
  PrivateLinkScopesDeleteOptionalParams,
  PrivateLinkScopesUpdateTagsOptionalParams,
  PrivateLinkScopesCreateOrUpdateOptionalParams,
  PrivateLinkScopesGetOptionalParams,
  PrivateLinkScopesGetValidationDetailsForMachineOptionalParams,
} from "../../api/privateLinkScopes/options.js";
import {
  PrivateLinkScopeValidationDetails,
  HybridComputePrivateLinkScope,
  TagsResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateLinkScopes operations. */
export interface PrivateLinkScopesOperations {
  /** Returns a Azure Arc PrivateLinkScope's validation details. */
  getValidationDetails: (
    location: string,
    privateLinkScopeId: string,
    options?: PrivateLinkScopesGetValidationDetailsOptionalParams,
  ) => Promise<PrivateLinkScopeValidationDetails>;
  /** Gets a list of all Azure Arc PrivateLinkScopes within a subscription. */
  list: (
    options?: PrivateLinkScopesListOptionalParams,
  ) => PagedAsyncIterableIterator<HybridComputePrivateLinkScope>;
  /** Gets a list of Azure Arc PrivateLinkScopes within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PrivateLinkScopesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HybridComputePrivateLinkScope>;
  /** Deletes a Azure Arc PrivateLinkScope. */
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
  ) => Promise<HybridComputePrivateLinkScope>;
  /** Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
  createOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    parameters: HybridComputePrivateLinkScope,
    options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
  ) => Promise<HybridComputePrivateLinkScope>;
  /** Returns a Azure Arc PrivateLinkScope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopesGetOptionalParams,
  ) => Promise<HybridComputePrivateLinkScope>;
  /** Returns a Azure Arc PrivateLinkScope's validation details for a given machine. */
  getValidationDetailsForMachine: (
    resourceGroupName: string,
    machineName: string,
    options?: PrivateLinkScopesGetValidationDetailsForMachineOptionalParams,
  ) => Promise<PrivateLinkScopeValidationDetails>;
}

function _getPrivateLinkScopes(context: HybridComputeManagementContext) {
  return {
    getValidationDetails: (
      location: string,
      privateLinkScopeId: string,
      options?: PrivateLinkScopesGetValidationDetailsOptionalParams,
    ) => getValidationDetails(context, location, privateLinkScopeId, options),
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
      parameters: HybridComputePrivateLinkScope,
      options?: PrivateLinkScopesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, scopeName, parameters, options),
    get: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopesGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, options),
    getValidationDetailsForMachine: (
      resourceGroupName: string,
      machineName: string,
      options?: PrivateLinkScopesGetValidationDetailsForMachineOptionalParams,
    ) => getValidationDetailsForMachine(context, resourceGroupName, machineName, options),
  };
}

export function _getPrivateLinkScopesOperations(
  context: HybridComputeManagementContext,
): PrivateLinkScopesOperations {
  return {
    ..._getPrivateLinkScopes(context),
  };
}
