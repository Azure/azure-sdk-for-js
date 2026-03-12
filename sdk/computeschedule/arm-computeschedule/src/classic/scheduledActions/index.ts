// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import {
  triggerManualOccurrence,
  cancelNextOccurrence,
  enable,
  disable,
  patchResources,
  detachResources,
  attachResources,
  listResources,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  virtualMachinesGetOperationErrors,
  virtualMachinesCancelOperations,
  virtualMachinesGetOperationStatus,
  virtualMachinesExecuteDelete,
  virtualMachinesExecuteCreate,
  virtualMachinesExecuteStart,
  virtualMachinesExecuteHibernate,
  virtualMachinesExecuteDeallocate,
  virtualMachinesSubmitStart,
  virtualMachinesSubmitHibernate,
  virtualMachinesSubmitDeallocate,
} from "../../api/scheduledActions/operations.js";
import {
  ScheduledActionsTriggerManualOccurrenceOptionalParams,
  ScheduledActionsCancelNextOccurrenceOptionalParams,
  ScheduledActionsEnableOptionalParams,
  ScheduledActionsDisableOptionalParams,
  ScheduledActionsPatchResourcesOptionalParams,
  ScheduledActionsDetachResourcesOptionalParams,
  ScheduledActionsAttachResourcesOptionalParams,
  ScheduledActionsListResourcesOptionalParams,
  ScheduledActionsListBySubscriptionOptionalParams,
  ScheduledActionsListByResourceGroupOptionalParams,
  ScheduledActionsDeleteOptionalParams,
  ScheduledActionsUpdateOptionalParams,
  ScheduledActionsCreateOrUpdateOptionalParams,
  ScheduledActionsGetOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
} from "../../api/scheduledActions/options.js";
import {
  SubmitDeallocateRequest,
  DeallocateResourceOperationResponse,
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  ExecuteCreateRequest,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
  ScheduledAction,
  ScheduledActionUpdate,
  ScheduledActionResource,
  ResourceAttachRequest,
  RecurringActionsResourceOperationResult,
  ResourceDetachRequest,
  ResourcePatchRequest,
  CancelOccurrenceRequest,
  Occurrence,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** A synchronous resource action. */
  triggerManualOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsTriggerManualOccurrenceOptionalParams,
  ) => Promise<Occurrence>;
  /** A synchronous resource action. */
  cancelNextOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: CancelOccurrenceRequest,
    options?: ScheduledActionsCancelNextOccurrenceOptionalParams,
  ) => Promise<RecurringActionsResourceOperationResult>;
  /** A synchronous resource action. */
  enable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsEnableOptionalParams,
  ) => Promise<void>;
  /** A synchronous resource action. */
  disable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsDisableOptionalParams,
  ) => Promise<void>;
  /** A synchronous resource action. */
  patchResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourcePatchRequest,
    options?: ScheduledActionsPatchResourcesOptionalParams,
  ) => Promise<RecurringActionsResourceOperationResult>;
  /** A synchronous resource action. */
  detachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceDetachRequest,
    options?: ScheduledActionsDetachResourcesOptionalParams,
  ) => Promise<RecurringActionsResourceOperationResult>;
  /** A synchronous resource action. */
  attachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceAttachRequest,
    options?: ScheduledActionsAttachResourcesOptionalParams,
  ) => Promise<RecurringActionsResourceOperationResult>;
  /** List resources attached to Scheduled Actions */
  listResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsListResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledActionResource>;
  /** List ScheduledAction resources by subscription ID */
  listBySubscription: (
    options?: ScheduledActionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** List ScheduledAction resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ScheduledActionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** Delete a ScheduledAction */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ScheduledAction */
  update: (
    resourceGroupName: string,
    scheduledActionName: string,
    properties: ScheduledActionUpdate,
    options?: ScheduledActionsUpdateOptionalParams,
  ) => Promise<ScheduledAction>;
  /** Create a ScheduledAction */
  createOrUpdate: (
    resourceGroupName: string,
    scheduledActionName: string,
    resource: ScheduledAction,
    options?: ScheduledActionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ScheduledAction>, ScheduledAction>;
  /** Get a ScheduledAction */
  get: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsGetOptionalParams,
  ) => Promise<ScheduledAction>;
  /** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
  virtualMachinesGetOperationErrors: (
    locationparameter: string,
    requestBody: GetOperationErrorsRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ) => Promise<GetOperationErrorsResponse>;
  /** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  virtualMachinesCancelOperations: (
    locationparameter: string,
    requestBody: CancelOperationsRequest,
    options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
  virtualMachinesGetOperationStatus: (
    locationparameter: string,
    requestBody: GetOperationStatusRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDelete: (
    locationparameter: string,
    requestBody: ExecuteDeleteRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteCreate: (
    locationparameter: string,
    requestBody: ExecuteCreateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
  /** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteStart: (
    locationparameter: string,
    requestBody: ExecuteStartRequest,
    options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteHibernate: (
    locationparameter: string,
    requestBody: ExecuteHibernateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDeallocate: (
    locationparameter: string,
    requestBody: ExecuteDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitStart: (
    locationparameter: string,
    requestBody: SubmitStartRequest,
    options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitHibernate: (
    locationparameter: string,
    requestBody: SubmitHibernateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitDeallocate: (
    locationparameter: string,
    requestBody: SubmitDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
}

function _getScheduledActions(context: ComputeScheduleContext) {
  return {
    triggerManualOccurrence: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsTriggerManualOccurrenceOptionalParams,
    ) => triggerManualOccurrence(context, resourceGroupName, scheduledActionName, options),
    cancelNextOccurrence: (
      resourceGroupName: string,
      scheduledActionName: string,
      body: CancelOccurrenceRequest,
      options?: ScheduledActionsCancelNextOccurrenceOptionalParams,
    ) => cancelNextOccurrence(context, resourceGroupName, scheduledActionName, body, options),
    enable: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsEnableOptionalParams,
    ) => enable(context, resourceGroupName, scheduledActionName, options),
    disable: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsDisableOptionalParams,
    ) => disable(context, resourceGroupName, scheduledActionName, options),
    patchResources: (
      resourceGroupName: string,
      scheduledActionName: string,
      body: ResourcePatchRequest,
      options?: ScheduledActionsPatchResourcesOptionalParams,
    ) => patchResources(context, resourceGroupName, scheduledActionName, body, options),
    detachResources: (
      resourceGroupName: string,
      scheduledActionName: string,
      body: ResourceDetachRequest,
      options?: ScheduledActionsDetachResourcesOptionalParams,
    ) => detachResources(context, resourceGroupName, scheduledActionName, body, options),
    attachResources: (
      resourceGroupName: string,
      scheduledActionName: string,
      body: ResourceAttachRequest,
      options?: ScheduledActionsAttachResourcesOptionalParams,
    ) => attachResources(context, resourceGroupName, scheduledActionName, body, options),
    listResources: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsListResourcesOptionalParams,
    ) => listResources(context, resourceGroupName, scheduledActionName, options),
    listBySubscription: (options?: ScheduledActionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ScheduledActionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, scheduledActionName, options),
    update: (
      resourceGroupName: string,
      scheduledActionName: string,
      properties: ScheduledActionUpdate,
      options?: ScheduledActionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, scheduledActionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      scheduledActionName: string,
      resource: ScheduledAction,
      options?: ScheduledActionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, scheduledActionName, resource, options),
    get: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: ScheduledActionsGetOptionalParams,
    ) => get(context, resourceGroupName, scheduledActionName, options),
    virtualMachinesGetOperationErrors: (
      locationparameter: string,
      requestBody: GetOperationErrorsRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
    ) => virtualMachinesGetOperationErrors(context, locationparameter, requestBody, options),
    virtualMachinesCancelOperations: (
      locationparameter: string,
      requestBody: CancelOperationsRequest,
      options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
    ) => virtualMachinesCancelOperations(context, locationparameter, requestBody, options),
    virtualMachinesGetOperationStatus: (
      locationparameter: string,
      requestBody: GetOperationStatusRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDelete: (
      locationparameter: string,
      requestBody: ExecuteDeleteRequest,
      options?: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
    ) => virtualMachinesExecuteDelete(context, locationparameter, requestBody, options),
    virtualMachinesExecuteCreate: (
      locationparameter: string,
      requestBody: ExecuteCreateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
    ) => virtualMachinesExecuteCreate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteStart: (
      locationparameter: string,
      requestBody: ExecuteStartRequest,
      options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
    ) => virtualMachinesExecuteStart(context, locationparameter, requestBody, options),
    virtualMachinesExecuteHibernate: (
      locationparameter: string,
      requestBody: ExecuteHibernateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
    ) => virtualMachinesExecuteHibernate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDeallocate: (
      locationparameter: string,
      requestBody: ExecuteDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
    ) => virtualMachinesExecuteDeallocate(context, locationparameter, requestBody, options),
    virtualMachinesSubmitStart: (
      locationparameter: string,
      requestBody: SubmitStartRequest,
      options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
    ) => virtualMachinesSubmitStart(context, locationparameter, requestBody, options),
    virtualMachinesSubmitHibernate: (
      locationparameter: string,
      requestBody: SubmitHibernateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
    ) => virtualMachinesSubmitHibernate(context, locationparameter, requestBody, options),
    virtualMachinesSubmitDeallocate: (
      locationparameter: string,
      requestBody: SubmitDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
    ) => virtualMachinesSubmitDeallocate(context, locationparameter, requestBody, options),
  };
}

export function _getScheduledActionsOperations(
  context: ComputeScheduleContext,
): ScheduledActionsOperations {
  return {
    ..._getScheduledActions(context),
  };
}
