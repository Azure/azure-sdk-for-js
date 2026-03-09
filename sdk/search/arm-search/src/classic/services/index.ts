// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import {
  upgrade,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  checkNameAvailability,
} from "../../api/services/operations.js";
import type {
  ServicesUpgradeOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
  ServicesCheckNameAvailabilityOptionalParams,
} from "../../api/services/options.js";
import type {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  SearchService,
  SearchServiceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Services operations. */
export interface ServicesOperations {
  /** Upgrades the Azure AI Search service to the latest version available. */
  upgrade: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: ServicesUpgradeOptionalParams,
  ) => PollerLike<OperationState<SearchService>, SearchService>;
  /** Gets a list of all Search services in the given subscription. */
  listBySubscription: (
    options?: ServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SearchService>;
  /** Gets a list of all Search services in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SearchService>;
  /** Deletes a search service in the given resource group, along with its associated resources. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: ServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing search service in the given resource group. */
  update: (
    resourceGroupName: string,
    searchServiceName: string,
    service: SearchServiceUpdate,
    options?: ServicesUpdateOptionalParams,
  ) => Promise<SearchService>;
  /** Creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values. */
  createOrUpdate: (
    resourceGroupName: string,
    searchServiceName: string,
    service: SearchService,
    options?: ServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SearchService>, SearchService>;
  /** Gets the search service with the given name in the given resource group. */
  get: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: ServicesGetOptionalParams,
  ) => Promise<SearchService>;
  /** Checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net). */
  checkNameAvailability: (
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: ServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
}

function _getServices(context: SearchManagementContext) {
  return {
    upgrade: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: ServicesUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, searchServiceName, options),
    listBySubscription: (options?: ServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: ServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, searchServiceName, options),
    update: (
      resourceGroupName: string,
      searchServiceName: string,
      service: SearchServiceUpdate,
      options?: ServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, searchServiceName, service, options),
    createOrUpdate: (
      resourceGroupName: string,
      searchServiceName: string,
      service: SearchService,
      options?: ServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, searchServiceName, service, options),
    get: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: ServicesGetOptionalParams,
    ) => get(context, resourceGroupName, searchServiceName, options),
    checkNameAvailability: (
      checkNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: ServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityInput, options),
  };
}

export function _getServicesOperations(context: SearchManagementContext): ServicesOperations {
  return {
    ..._getServices(context),
  };
}
