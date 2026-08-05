// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
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
} from "../../api/scheduledActions/operations.js";
import type {
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
} from "../../api/scheduledActions/options.js";
import type {
  ScheduledAction,
  ScheduledActionUpdate,
  ScheduledActionResource,
  ResourceAttachRequest,
  ResourceOperationResponse,
  ResourceDetachRequest,
  ResourcePatchRequest,
  CancelOccurrenceRequest,
  Occurrence,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** Trigger a manual occurrence of the scheduled action immediately, outside its normal schedule. */
  triggerManualOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsTriggerManualOccurrenceOptionalParams,
  ) => PollerLike<OperationState<Occurrence>, Occurrence>;
  /** Cancel the next scheduled occurrence of the scheduled action. */
  cancelNextOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: CancelOccurrenceRequest,
    options?: ScheduledActionsCancelNextOccurrenceOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Enable a previously disabled scheduled action so its future occurrences run. */
  enable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsEnableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Disable the scheduled action so its future occurrences do not run. */
  disable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsDisableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** A synchronous resource action. */
  patchResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourcePatchRequest,
    options?: ScheduledActionsPatchResourcesOptionalParams,
  ) => Promise<ResourceOperationResponse>;
  /** Detach resources from the scheduled action so they are excluded from future occurrences. */
  detachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceDetachRequest,
    options?: ScheduledActionsDetachResourcesOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Attach resources to the scheduled action so they are included in future occurrences. */
  attachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceAttachRequest,
    options?: ScheduledActionsAttachResourcesOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
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
  ) => PollerLike<OperationState<void>, void>;
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
}
function _getScheduledActions(context: ComputeContext) {
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
  };
}
export function _getScheduledActionsOperations(
  context: ComputeContext,
): ScheduledActionsOperations {
  return {
    ..._getScheduledActions(context),
  };
}
