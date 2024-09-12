// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolContext } from "../../api/standbyPoolManagementContext.js";
import {
  StandbyContainerGroupPoolResource,
  StandbyContainerGroupPoolResourceUpdate,
} from "../../models/models.js";
import {
  standbyContainerGroupPoolsGet,
  standbyContainerGroupPoolsCreateOrUpdate,
  standbyContainerGroupPoolsDelete,
  standbyContainerGroupPoolsUpdate,
  standbyContainerGroupPoolsListByResourceGroup,
  standbyContainerGroupPoolsListBySubscription,
} from "../../api/standbyContainerGroupPools/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  StandbyContainerGroupPoolsGetOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
} from "../../models/options.js";

/** Interface representing a StandbyContainerGroupPools operations. */
export interface StandbyContainerGroupPoolsOperations {
  /** Get a StandbyContainerGroupPoolResource */
  get: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolsGetOptionalParams,
  ) => Promise<StandbyContainerGroupPoolResource>;
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
  /** Delete a StandbyContainerGroupPoolResource */
  delete: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a StandbyContainerGroupPoolResource */
  update: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    properties: StandbyContainerGroupPoolResourceUpdate,
    options?: StandbyContainerGroupPoolsUpdateOptionalParams,
  ) => Promise<StandbyContainerGroupPoolResource>;
  /** List StandbyContainerGroupPoolResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolResource>;
  /** List StandbyContainerGroupPoolResource resources by subscription ID */
  listBySubscription: (
    options?: StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolResource>;
}

export function getStandbyContainerGroupPools(
  context: StandbyPoolContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolsGetOptionalParams,
    ) =>
      standbyContainerGroupPoolsGet(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      resource: StandbyContainerGroupPoolResource,
      options?: StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
    ) =>
      standbyContainerGroupPoolsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolsDeleteOptionalParams,
    ) =>
      standbyContainerGroupPoolsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        options,
      ),
    update: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      properties: StandbyContainerGroupPoolResourceUpdate,
      options?: StandbyContainerGroupPoolsUpdateOptionalParams,
    ) =>
      standbyContainerGroupPoolsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        properties,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
    ) =>
      standbyContainerGroupPoolsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
    ) =>
      standbyContainerGroupPoolsListBySubscription(
        context,
        subscriptionId,
        options,
      ),
  };
}

export function getStandbyContainerGroupPoolsOperations(
  context: StandbyPoolContext,
  subscriptionId: string,
): StandbyContainerGroupPoolsOperations {
  return {
    ...getStandbyContainerGroupPools(context, subscriptionId),
  };
}
