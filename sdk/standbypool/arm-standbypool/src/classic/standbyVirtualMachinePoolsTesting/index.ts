// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/standbyVirtualMachinePoolsTesting/operations.js";
import type {
  StandbyVirtualMachinePoolsTestingListBySubscriptionOptionalParams,
  StandbyVirtualMachinePoolsTestingListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsTestingUpdateOptionalParams,
  StandbyVirtualMachinePoolsTestingDeleteOptionalParams,
  StandbyVirtualMachinePoolsTestingCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsTestingGetOptionalParams,
} from "../../api/standbyVirtualMachinePoolsTesting/options.js";
import type {
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StandbyVirtualMachinePoolsTesting operations. */
export interface StandbyVirtualMachinePoolsTestingOperations {
  /** List StandbyVirtualMachinePoolResource resources by subscription ID */
  listBySubscription: (
    options?: StandbyVirtualMachinePoolsTestingListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
  /** List StandbyVirtualMachinePoolResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StandbyVirtualMachinePoolsTestingListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolResource>;
  /** Update a StandbyVirtualMachinePoolResource */
  update: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    properties: StandbyVirtualMachinePoolResourceUpdate,
    options?: StandbyVirtualMachinePoolsTestingUpdateOptionalParams,
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
    options?: StandbyVirtualMachinePoolsTestingDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a StandbyVirtualMachinePoolResource */
  createOrUpdate: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    resource: StandbyVirtualMachinePoolResource,
    options?: StandbyVirtualMachinePoolsTestingCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<StandbyVirtualMachinePoolResource>,
    StandbyVirtualMachinePoolResource
  >;
  /** Get a StandbyVirtualMachinePoolResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolsTestingGetOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolResource>;
}

function _getStandbyVirtualMachinePoolsTesting(context: StandbyPoolManagementContext) {
  return {
    listBySubscription: (
      options?: StandbyVirtualMachinePoolsTestingListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StandbyVirtualMachinePoolsTestingListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      properties: StandbyVirtualMachinePoolResourceUpdate,
      options?: StandbyVirtualMachinePoolsTestingUpdateOptionalParams,
    ) => update(context, resourceGroupName, standbyVirtualMachinePoolName, properties, options),
    delete: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsTestingDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, standbyVirtualMachinePoolName, options),
    createOrUpdate: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      resource: StandbyVirtualMachinePoolResource,
      options?: StandbyVirtualMachinePoolsTestingCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, standbyVirtualMachinePoolName, resource, options),
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolsTestingGetOptionalParams,
    ) => get(context, resourceGroupName, standbyVirtualMachinePoolName, options),
  };
}

export function _getStandbyVirtualMachinePoolsTestingOperations(
  context: StandbyPoolManagementContext,
): StandbyVirtualMachinePoolsTestingOperations {
  return {
    ..._getStandbyVirtualMachinePoolsTesting(context),
  };
}
