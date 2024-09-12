// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolContext } from "../../api/standbyPoolManagementContext.js";
import {
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceUpdate,
} from "../../models/models.js";
import {
  standbyVirtualMachinePoolsGet,
  standbyVirtualMachinePoolsCreateOrUpdate,
  standbyVirtualMachinePoolsDelete,
  standbyVirtualMachinePoolsUpdate,
  standbyVirtualMachinePoolsListByResourceGroup,
  standbyVirtualMachinePoolsListBySubscription,
} from "../../api/standbyVirtualMachinePools/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  StandbyVirtualMachinePoolsGetOptionalParams,
  StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsDeleteOptionalParams,
  StandbyVirtualMachinePoolsUpdateOptionalParams,
  StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
} from "../../models/options.js";

/** Interface representing a StandbyVirtualMachinePools operations. */
export interface StandbyVirtualMachinePoolsOperations {
  /** Get a StandbyVirtualMachinePoolResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolsGetOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolResource>;
  /** Create a StandbyVirtualMachinePoolResource */
  createOrUpdate: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    resource: StandbyVirtualMachinePoolResource,
    options?: StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<StandbyVirtualMachinePoolResource>,
    StandbyVirtualMachinePoolResource
  >;
  /** Delete a StandbyVirtualMachinePoolResource */
  delete: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a StandbyVirtualMachinePoolResource */
  update: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    properties: StandbyVirtualMachinePoolResourceUpdate,
    options?: StandbyVirtualMachinePoolsUpdateOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolResource>;
  /** List StandbyVirtualMachinePoolResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
  /** List StandbyVirtualMachinePoolResource resources by subscription ID */
  listBySubscription: (
    options?: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
}

export function getStandbyVirtualMachinePools(
  context: StandbyPoolContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsGetOptionalParams,
    ) =>
      standbyVirtualMachinePoolsGet(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      resource: StandbyVirtualMachinePoolResource,
      options?: StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
    ) =>
      standbyVirtualMachinePoolsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsDeleteOptionalParams,
    ) =>
      standbyVirtualMachinePoolsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
    update: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      properties: StandbyVirtualMachinePoolResourceUpdate,
      options?: StandbyVirtualMachinePoolsUpdateOptionalParams,
    ) =>
      standbyVirtualMachinePoolsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        properties,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
    ) =>
      standbyVirtualMachinePoolsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
    ) =>
      standbyVirtualMachinePoolsListBySubscription(
        context,
        subscriptionId,
        options,
      ),
  };
}

export function getStandbyVirtualMachinePoolsOperations(
  context: StandbyPoolContext,
  subscriptionId: string,
): StandbyVirtualMachinePoolsOperations {
  return {
    ...getStandbyVirtualMachinePools(context, subscriptionId),
  };
}
