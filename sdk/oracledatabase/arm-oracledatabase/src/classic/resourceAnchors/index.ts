// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/resourceAnchors/operations.js";
import {
  ResourceAnchorsListByResourceGroupOptionalParams,
  ResourceAnchorsDeleteOptionalParams,
  ResourceAnchorsUpdateOptionalParams,
  ResourceAnchorsGetOptionalParams,
  ResourceAnchorsCreateOrUpdateOptionalParams,
  ResourceAnchorsListBySubscriptionOptionalParams,
} from "../../api/resourceAnchors/options.js";
import { ResourceAnchor, ResourceAnchorUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ResourceAnchors operations. */
export interface ResourceAnchorsOperations {
  /** List ResourceAnchor resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ResourceAnchorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceAnchor>;
  /** Delete a ResourceAnchor */
  delete: (
    resourceGroupName: string,
    resourceAnchorName: string,
    options?: ResourceAnchorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ResourceAnchor */
  update: (
    resourceGroupName: string,
    resourceAnchorName: string,
    properties: ResourceAnchorUpdate,
    options?: ResourceAnchorsUpdateOptionalParams,
  ) => PollerLike<OperationState<ResourceAnchor>, ResourceAnchor>;
  /** Get a ResourceAnchor */
  get: (
    resourceGroupName: string,
    resourceAnchorName: string,
    options?: ResourceAnchorsGetOptionalParams,
  ) => Promise<ResourceAnchor>;
  /** Create a ResourceAnchor */
  createOrUpdate: (
    resourceGroupName: string,
    resourceAnchorName: string,
    resource: ResourceAnchor,
    options?: ResourceAnchorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ResourceAnchor>, ResourceAnchor>;
  /** List ResourceAnchor resources by subscription ID */
  listBySubscription: (
    options?: ResourceAnchorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceAnchor>;
}

function _getResourceAnchors(context: OracleDatabaseManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ResourceAnchorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceAnchorName: string,
      options?: ResourceAnchorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceAnchorName, options),
    update: (
      resourceGroupName: string,
      resourceAnchorName: string,
      properties: ResourceAnchorUpdate,
      options?: ResourceAnchorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceAnchorName, properties, options),
    get: (
      resourceGroupName: string,
      resourceAnchorName: string,
      options?: ResourceAnchorsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceAnchorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceAnchorName: string,
      resource: ResourceAnchor,
      options?: ResourceAnchorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceAnchorName, resource, options),
    listBySubscription: (options?: ResourceAnchorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getResourceAnchorsOperations(
  context: OracleDatabaseManagementContext,
): ResourceAnchorsOperations {
  return {
    ..._getResourceAnchors(context),
  };
}
