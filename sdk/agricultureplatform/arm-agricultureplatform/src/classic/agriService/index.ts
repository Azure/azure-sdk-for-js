// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriculturePlatformContext } from "../../api/agriculturePlatformContext.js";
import {
  agriServiceListAvailableSolutions,
  agriServiceListBySubscription,
  agriServiceListByResourceGroup,
  agriServiceDelete,
  agriServiceUpdate,
  agriServiceCreateOrUpdate,
  agriServiceGet,
} from "../../api/agriService/index.js";
import {
  AgriServiceListAvailableSolutionsOptionalParams,
  AgriServiceListBySubscriptionOptionalParams,
  AgriServiceListByResourceGroupOptionalParams,
  AgriServiceDeleteOptionalParams,
  AgriServiceUpdateOptionalParams,
  AgriServiceCreateOrUpdateOptionalParams,
  AgriServiceGetOptionalParams,
} from "../../api/options.js";
import {
  AgriServiceResource,
  AgriServiceResourceUpdate,
  AvailableAgriSolutionListResult,
} from "../../models/models.js";
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
      agriServiceListAvailableSolutions(
        context,
        resourceGroupName,
        agriServiceResourceName,
        options,
      ),
    listBySubscription: (options?: AgriServiceListBySubscriptionOptionalParams) =>
      agriServiceListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AgriServiceListByResourceGroupOptionalParams,
    ) => agriServiceListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      options?: AgriServiceDeleteOptionalParams,
    ) => agriServiceDelete(context, resourceGroupName, agriServiceResourceName, options),
    update: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      properties: AgriServiceResourceUpdate,
      options?: AgriServiceUpdateOptionalParams,
    ) =>
      agriServiceUpdate(context, resourceGroupName, agriServiceResourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      agriServiceResourceName: string,
      resource: AgriServiceResource,
      options?: AgriServiceCreateOrUpdateOptionalParams,
    ) =>
      agriServiceCreateOrUpdate(
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
    ) => agriServiceGet(context, resourceGroupName, agriServiceResourceName, options),
  };
}

export function _getAgriServiceOperations(
  context: AgriculturePlatformContext,
): AgriServiceOperations {
  return {
    ..._getAgriService(context),
  };
}
