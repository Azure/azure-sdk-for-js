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
  /** Runs the specified scheduled action immediately. */
  triggerManualOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsTriggerManualOccurrenceOptionalParams,
  ) => PollerLike<OperationState<Occurrence>, Occurrence>;
  /** Cancels the next occurrence of the specified scheduled action. */
  cancelNextOccurrence: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: CancelOccurrenceRequest,
    options?: ScheduledActionsCancelNextOccurrenceOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Enables the specified scheduled action so new occurrences run. */
  enable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsEnableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Disables the specified scheduled action so future occurrences do not run. */
  disable: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsDisableOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates resource-specific settings for the specified scheduled action. */
  patchResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourcePatchRequest,
    options?: ScheduledActionsPatchResourcesOptionalParams,
  ) => Promise<ResourceOperationResponse>;
  /** Removes resources from the specified scheduled action. */
  detachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceDetachRequest,
    options?: ScheduledActionsDetachResourcesOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Adds resources to the specified scheduled action. */
  attachResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    body: ResourceAttachRequest,
    options?: ScheduledActionsAttachResourcesOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Lists resources associated with the specified scheduled action. */
  listResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsListResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledActionResource>;
  /** Lists scheduled actions in the specified subscription. */
  listBySubscription: (
    options?: ScheduledActionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** Lists scheduled actions in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ScheduledActionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** Deletes the specified scheduled action. */
  delete: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: ScheduledActionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the specified scheduled action. */
  update: (
    resourceGroupName: string,
    scheduledActionName: string,
    properties: ScheduledActionUpdate,
    options?: ScheduledActionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a scheduled action. */
  createOrUpdate: (
    resourceGroupName: string,
    scheduledActionName: string,
    resource: ScheduledAction,
    options?: ScheduledActionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ScheduledAction>, ScheduledAction>;
  /** Gets the specified scheduled action. */
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
