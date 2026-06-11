// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeBulkActionsContext } from "../../api/computeBulkActionsContext.js";
import {
  virtualMachinesCancelOperations,
  virtualMachinesGetOperationStatus,
  virtualMachinesExecuteDelete,
  virtualMachinesExecuteCreate,
  virtualMachinesExecuteStart,
  virtualMachinesExecuteHibernate,
  virtualMachinesExecuteDeallocate,
  listVirtualMachines,
  listBySubscription,
  listByResourceGroup,
  cancel,
  $delete,
  createOrUpdate,
  getOperationStatus,
  get,
} from "../../api/bulkActions/operations.js";
import type {
  BulkActionsVirtualMachinesCancelOperationsOptionalParams,
  BulkActionsVirtualMachinesGetOperationStatusOptionalParams,
  BulkActionsVirtualMachinesExecuteDeleteOptionalParams,
  BulkActionsVirtualMachinesExecuteCreateOptionalParams,
  BulkActionsVirtualMachinesExecuteStartOptionalParams,
  BulkActionsVirtualMachinesExecuteHibernateOptionalParams,
  BulkActionsVirtualMachinesExecuteDeallocateOptionalParams,
  BulkActionsListVirtualMachinesOptionalParams,
  BulkActionsListBySubscriptionOptionalParams,
  BulkActionsListByResourceGroupOptionalParams,
  BulkActionsCancelOptionalParams,
  BulkActionsDeleteOptionalParams,
  BulkActionsCreateOrUpdateOptionalParams,
  BulkActionsGetOperationStatusOptionalParams,
  BulkActionsGetOptionalParams,
} from "../../api/bulkActions/options.js";
import type {
  LocationBasedLaunchBulkInstancesOperation,
  OperationStatusResult,
  VirtualMachine,
  ExecuteDeallocateRequest,
  DeallocateResourceOperationResponse,
  ExecuteHibernateRequest,
  HibernateResourceOperationResponse,
  ExecuteStartRequest,
  StartResourceOperationResponse,
  ExecuteCreateRequest,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BulkActions operations. */
export interface BulkActionsOperations {
  /** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  virtualMachinesCancelOperations: (
    location: string,
    requestBody: CancelOperationsRequest,
    options?: BulkActionsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
  virtualMachinesGetOperationStatus: (
    location: string,
    requestBody: GetOperationStatusRequest,
    options?: BulkActionsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDelete: (
    location: string,
    requestBody: ExecuteDeleteRequest,
    options?: BulkActionsVirtualMachinesExecuteDeleteOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteCreate: (
    location: string,
    requestBody: ExecuteCreateRequest,
    options?: BulkActionsVirtualMachinesExecuteCreateOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
  /** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteStart: (
    location: string,
    requestBody: ExecuteStartRequest,
    options?: BulkActionsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteHibernate: (
    location: string,
    requestBody: ExecuteHibernateRequest,
    options?: BulkActionsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDeallocate: (
    location: string,
    requestBody: ExecuteDeallocateRequest,
    options?: BulkActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** List VirtualMachine resources of a LaunchBulkInstancesOperation. */
  listVirtualMachines: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkActionsListVirtualMachinesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** List LaunchBulkInstancesOperation resources by subscriptionId. */
  listBySubscription: (
    location: string,
    options?: BulkActionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation>;
  /** List LaunchBulkInstancesOperation resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: BulkActionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedLaunchBulkInstancesOperation>;
  /** Cancels LaunchBulkInstancesOperation instances that have not yet launched. */
  cancel: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkActionsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deletes LaunchBulkInstancesOperations. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkActionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates LaunchBulkInstancesOperations. */
  createOrUpdate: (
    resourceGroupName: string,
    location: string,
    name: string,
    resource: LocationBasedLaunchBulkInstancesOperation,
    options?: BulkActionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<LocationBasedLaunchBulkInstancesOperation>,
    LocationBasedLaunchBulkInstancesOperation
  >;
  /** Get the status of a LaunchBulkInstancesOperation. */
  getOperationStatus: (
    location: string,
    id: string,
    options?: BulkActionsGetOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets an instance of LaunchBulkInstancesOperations. */
  get: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkActionsGetOptionalParams,
  ) => Promise<LocationBasedLaunchBulkInstancesOperation>;
}

function _getBulkActions(context: ComputeBulkActionsContext) {
  return {
    virtualMachinesCancelOperations: (
      location: string,
      requestBody: CancelOperationsRequest,
      options?: BulkActionsVirtualMachinesCancelOperationsOptionalParams,
    ) => virtualMachinesCancelOperations(context, location, requestBody, options),
    virtualMachinesGetOperationStatus: (
      location: string,
      requestBody: GetOperationStatusRequest,
      options?: BulkActionsVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, location, requestBody, options),
    virtualMachinesExecuteDelete: (
      location: string,
      requestBody: ExecuteDeleteRequest,
      options?: BulkActionsVirtualMachinesExecuteDeleteOptionalParams,
    ) => virtualMachinesExecuteDelete(context, location, requestBody, options),
    virtualMachinesExecuteCreate: (
      location: string,
      requestBody: ExecuteCreateRequest,
      options?: BulkActionsVirtualMachinesExecuteCreateOptionalParams,
    ) => virtualMachinesExecuteCreate(context, location, requestBody, options),
    virtualMachinesExecuteStart: (
      location: string,
      requestBody: ExecuteStartRequest,
      options?: BulkActionsVirtualMachinesExecuteStartOptionalParams,
    ) => virtualMachinesExecuteStart(context, location, requestBody, options),
    virtualMachinesExecuteHibernate: (
      location: string,
      requestBody: ExecuteHibernateRequest,
      options?: BulkActionsVirtualMachinesExecuteHibernateOptionalParams,
    ) => virtualMachinesExecuteHibernate(context, location, requestBody, options),
    virtualMachinesExecuteDeallocate: (
      location: string,
      requestBody: ExecuteDeallocateRequest,
      options?: BulkActionsVirtualMachinesExecuteDeallocateOptionalParams,
    ) => virtualMachinesExecuteDeallocate(context, location, requestBody, options),
    listVirtualMachines: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkActionsListVirtualMachinesOptionalParams,
    ) => listVirtualMachines(context, resourceGroupName, location, name, options),
    listBySubscription: (location: string, options?: BulkActionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, location, options),
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: BulkActionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    cancel: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkActionsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, location, name, options),
    delete: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkActionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, location, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      location: string,
      name: string,
      resource: LocationBasedLaunchBulkInstancesOperation,
      options?: BulkActionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, location, name, resource, options),
    getOperationStatus: (
      location: string,
      id: string,
      options?: BulkActionsGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, location, id, options),
    get: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkActionsGetOptionalParams,
    ) => get(context, resourceGroupName, location, name, options),
  };
}

export function _getBulkActionsOperations(
  context: ComputeBulkActionsContext,
): BulkActionsOperations {
  return {
    ..._getBulkActions(context),
  };
}
