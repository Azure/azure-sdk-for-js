// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import {
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceUpdate,
} from "../../models/models.js";
import {
  StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
  StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsUpdateOptionalParams,
  StandbyVirtualMachinePoolsDeleteOptionalParams,
  StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsGetOptionalParams,
} from "../../api/standbyVirtualMachinePools/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/standbyVirtualMachinePools/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StandbyVirtualMachinePools operations. */
export interface StandbyVirtualMachinePoolsOperations {
  /** List StandbyVirtualMachinePoolResource resources by subscription ID */
  listBySubscription: (
    options?: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
  /** List StandbyVirtualMachinePoolResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
  /** Update a StandbyVirtualMachinePoolResource */
  update: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    properties: StandbyVirtualMachinePoolResourceUpdate,
    options?: StandbyVirtualMachinePoolsUpdateOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolResource>;
  /** Delete a StandbyVirtualMachinePoolResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
  /** Get a StandbyVirtualMachinePoolResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolsGetOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolResource>;
}

function _getStandbyVirtualMachinePools(context: StandbyPoolManagementContext) {
  return {
    listBySubscription: (options?: StandbyVirtualMachinePoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      properties: StandbyVirtualMachinePoolResourceUpdate,
      options?: StandbyVirtualMachinePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, standbyVirtualMachinePoolName, properties, options),
    delete: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, standbyVirtualMachinePoolName, options),
    createOrUpdate: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      resource: StandbyVirtualMachinePoolResource,
      options?: StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, standbyVirtualMachinePoolName, resource, options),
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, standbyVirtualMachinePoolName, options),
  };
}

export function _getStandbyVirtualMachinePoolsOperations(
  context: StandbyPoolManagementContext,
): StandbyVirtualMachinePoolsOperations {
  return {
    ..._getStandbyVirtualMachinePools(context),
  };
}
