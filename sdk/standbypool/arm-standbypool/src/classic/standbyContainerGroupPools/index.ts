// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import {
  StandbyContainerGroupPoolResource,
  StandbyContainerGroupPoolResourceUpdate,
} from "../../models/models.js";
import {
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsGetOptionalParams,
} from "../../api/standbyContainerGroupPools/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/standbyContainerGroupPools/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StandbyContainerGroupPools operations. */
export interface StandbyContainerGroupPoolsOperations {
  /** List StandbyContainerGroupPoolResource resources by subscription ID */
  listBySubscription: (
    options?: StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolResource>;
  /** List StandbyContainerGroupPoolResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolResource>;
  /** Update a StandbyContainerGroupPoolResource */
  update: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    properties: StandbyContainerGroupPoolResourceUpdate,
    options?: StandbyContainerGroupPoolsUpdateOptionalParams,
  ) => Promise<StandbyContainerGroupPoolResource>;
  /** Delete a StandbyContainerGroupPoolResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a StandbyContainerGroupPoolResource */
  createOrUpdate: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    resource: StandbyContainerGroupPoolResource,
    options?: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<StandbyContainerGroupPoolResource>,
    StandbyContainerGroupPoolResource
  >;
  /** Get a StandbyContainerGroupPoolResource */
  get: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolsGetOptionalParams,
  ) => Promise<StandbyContainerGroupPoolResource>;
}

function _getStandbyContainerGroupPools(context: StandbyPoolManagementContext) {
  return {
    listBySubscription: (options?: StandbyContainerGroupPoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      properties: StandbyContainerGroupPoolResourceUpdate,
      options?: StandbyContainerGroupPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, standbyContainerGroupPoolName, properties, options),
    delete: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, standbyContainerGroupPoolName, options),
    createOrUpdate: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      resource: StandbyContainerGroupPoolResource,
      options?: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, standbyContainerGroupPoolName, resource, options),
    get: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, standbyContainerGroupPoolName, options),
  };
}

export function _getStandbyContainerGroupPoolsOperations(
  context: StandbyPoolManagementContext,
): StandbyContainerGroupPoolsOperations {
  return {
    ..._getStandbyContainerGroupPools(context),
  };
}
