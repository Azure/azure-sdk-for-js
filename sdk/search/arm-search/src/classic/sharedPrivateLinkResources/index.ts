// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  get,
} from "../../api/sharedPrivateLinkResources/operations.js";
import type {
  SharedPrivateLinkResourcesListByServiceOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/sharedPrivateLinkResources/options.js";
import type { SharedPrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SharedPrivateLinkResources operations. */
export interface SharedPrivateLinkResourcesOperations {
  /** Gets a list of all shared private link resources managed by the given service. */
  listByService: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: SharedPrivateLinkResourcesListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Initiates the deletion of the shared private link resource from the search service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    searchServiceName: string,
    sharedPrivateLinkResourceName: string,
    options?: SharedPrivateLinkResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Initiates the creation or update of a shared private link resource managed by the search service in the given resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    searchServiceName: string,
    sharedPrivateLinkResourceName: string,
    sharedPrivateLinkResource: SharedPrivateLinkResource,
    options?: SharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** Gets the details of the shared private link resource managed by the search service in the given resource group. */
  get: (
    resourceGroupName: string,
    searchServiceName: string,
    sharedPrivateLinkResourceName: string,
    options?: SharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getSharedPrivateLinkResources(context: SearchManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: SharedPrivateLinkResourcesListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, searchServiceName, options),
    delete: (
      resourceGroupName: string,
      searchServiceName: string,
      sharedPrivateLinkResourceName: string,
      options?: SharedPrivateLinkResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        searchServiceName,
        sharedPrivateLinkResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      searchServiceName: string,
      sharedPrivateLinkResourceName: string,
      sharedPrivateLinkResource: SharedPrivateLinkResource,
      options?: SharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        searchServiceName,
        sharedPrivateLinkResourceName,
        sharedPrivateLinkResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      searchServiceName: string,
      sharedPrivateLinkResourceName: string,
      options?: SharedPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, searchServiceName, sharedPrivateLinkResourceName, options),
  };
}

export function _getSharedPrivateLinkResourcesOperations(
  context: SearchManagementContext,
): SharedPrivateLinkResourcesOperations {
  return {
    ..._getSharedPrivateLinkResources(context),
  };
}
