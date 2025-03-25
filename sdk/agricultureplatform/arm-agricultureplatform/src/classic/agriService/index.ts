// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriculturePlatformContext } from "../../api/agriculturePlatformContext.js";
import {
  AgriServiceResource,
  AgriServiceResourceUpdate,
  AvailableAgriSolutionListResult,
} from "../../models/models.js";
import {
  AgriServiceListAvailableSolutionsOptionalParams,
  AgriServiceListBySubscriptionOptionalParams,
  AgriServiceListByResourceGroupOptionalParams,
  AgriServiceDeleteOptionalParams,
  AgriServiceUpdateOptionalParams,
  AgriServiceCreateOrUpdateOptionalParams,
  AgriServiceGetOptionalParams,
} from "../../api/agriService/options.js";
import {
  listAvailableSolutions,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/agriService/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgriService operations. */
export interface AgriServiceOperations {
  /** Returns the list of available agri solutions. */
  listAvailableSolutions: (
    resourceGroupName: string,
    agriServiceResourceName: string,
    options?: AgriServiceListAvailableSolutionsOptionalParams,
  ) => Promise<AvailableAgriSolutionListResult>;
  /** List AgriServiceResource resources by subscription ID */
  listBySubscription: (
    options?: AgriServiceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AgriServiceResource>;
  /** List AgriServiceResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AgriServiceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AgriServiceResource>;
  /** Delete a AgriServiceResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    agriServiceResourceName: string,
    options?: AgriServiceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a AgriServiceResource */
  update: (
    resourceGroupName: string,
    agriServiceResourceName: string,
    properties: AgriServiceResourceUpdate,
    options?: AgriServiceUpdateOptionalParams,
  ) => PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
  /** Create a AgriServiceResource */
  createOrUpdate: (
    resourceGroupName: string,
    agriServiceResourceName: string,
    resource: AgriServiceResource,
    options?: AgriServiceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgriServiceResource>, AgriServiceResource>;
  /** Get a AgriServiceResource */
  get: (
    resourceGroupName: string,
    agriServiceResourceName: string,
    options?: AgriServiceGetOptionalParams,
  ) => Promise<AgriServiceResource>;
}

function _getAgriService(context: AgriculturePlatformContext) {
  return {
    listAvailableSolutions: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      options?: AgriServiceListAvailableSolutionsOptionalParams,
    ) =>
      listAvailableSolutions(
        context,
        resourceGroupName,
        agriServiceResourceName,
        options,
      ),
    listBySubscription: (
      options?: AgriServiceListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AgriServiceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      options?: AgriServiceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agriServiceResourceName, options),
    update: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      properties: AgriServiceResourceUpdate,
      options?: AgriServiceUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        agriServiceResourceName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      resource: AgriServiceResource,
      options?: AgriServiceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        agriServiceResourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      options?: AgriServiceGetOptionalParams,
    ) => get(context, resourceGroupName, agriServiceResourceName, options),
  };
}

export function _getAgriServiceOperations(
  context: AgriculturePlatformContext,
): AgriServiceOperations {
  return {
    ..._getAgriService(context),
  };
}
