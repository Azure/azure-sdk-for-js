// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listVirtualMachines,
  listBySubscription,
  listByResourceGroup,
  cancel,
  $delete,
  createOrUpdate,
  getOperationStatus,
  get,
} from "../../api/launchBulkInstancesOperation/operations.js";
import type {
  LaunchBulkInstancesOperationListVirtualMachinesOptionalParams,
  LaunchBulkInstancesOperationListBySubscriptionOptionalParams,
  LaunchBulkInstancesOperationListByResourceGroupOptionalParams,
  LaunchBulkInstancesOperationCancelOptionalParams,
  LaunchBulkInstancesOperationDeleteOptionalParams,
  LaunchBulkInstancesOperationCreateOrUpdateOptionalParams,
  LaunchBulkInstancesOperationGetOperationStatusOptionalParams,
  LaunchBulkInstancesOperationGetOptionalParams,
} from "../../api/launchBulkInstancesOperation/options.js";
import type {
  LocationBasedLaunchBulkInstancesOperation,
  OperationStatusResult,
  VirtualMachine,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LaunchBulkInstancesOperation operations. */
export interface LaunchBulkInstancesOperationOperations {
  /** List VirtualMachine resources of a LaunchBulkInstancesOperation. */
  listVirtualMachines: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: LaunchBulkInstancesOperationListVirtualMachinesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** List LaunchBulkInstancesOperation resources by subscriptionId. */
  listBySubscription: (
    location: string,
    options?: LaunchBulkInstancesOperationListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation>;
  /** List LaunchBulkInstancesOperation resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: LaunchBulkInstancesOperationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation>;
  /** Cancels LaunchBulkInstancesOperation instances that have not yet launched. */
  cancel: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: LaunchBulkInstancesOperationCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deletes LaunchBulkInstancesOperations. */
  delete: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: LaunchBulkInstancesOperationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates LaunchBulkInstancesOperations. */
  createOrUpdate: (
    resourceGroupName: string,
    location: string,
    name: string,
    resource: LocationBasedLaunchBulkInstancesOperation,
    options?: LaunchBulkInstancesOperationCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<LocationBasedLaunchBulkInstancesOperation>,
    LocationBasedLaunchBulkInstancesOperation
  >;
  /** Get the status of a LaunchBulkInstancesOperation. */
  getOperationStatus: (
    location: string,
    asyncOperationId: string,
    options?: LaunchBulkInstancesOperationGetOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets an instance of LaunchBulkInstancesOperations. */
  get: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: LaunchBulkInstancesOperationGetOptionalParams,
  ) => Promise<LocationBasedLaunchBulkInstancesOperation>;
}
function _getLaunchBulkInstancesOperation(context: ComputeContext) {
  return {
    listVirtualMachines: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: LaunchBulkInstancesOperationListVirtualMachinesOptionalParams,
    ) => listVirtualMachines(context, resourceGroupName, location, name, options),
    listBySubscription: (
      location: string,
      options?: LaunchBulkInstancesOperationListBySubscriptionOptionalParams,
    ) => listBySubscription(context, location, options),
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: LaunchBulkInstancesOperationListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    cancel: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: LaunchBulkInstancesOperationCancelOptionalParams,
    ) => cancel(context, resourceGroupName, location, name, options),
    delete: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: LaunchBulkInstancesOperationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, location, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      location: string,
      name: string,
      resource: LocationBasedLaunchBulkInstancesOperation,
      options?: LaunchBulkInstancesOperationCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, location, name, resource, options),
    getOperationStatus: (
      location: string,
      asyncOperationId: string,
      options?: LaunchBulkInstancesOperationGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, location, asyncOperationId, options),
    get: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: LaunchBulkInstancesOperationGetOptionalParams,
    ) => get(context, resourceGroupName, location, name, options),
  };
}
export function _getLaunchBulkInstancesOperationOperations(
  context: ComputeContext,
): LaunchBulkInstancesOperationOperations {
  return {
    ..._getLaunchBulkInstancesOperation(context),
  };
}
