// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import {
  delay,
  cancel,
  listResources,
  listByScheduledAction,
  get,
} from "../../api/occurrences/operations.js";
import {
  OccurrencesDelayOptionalParams,
  OccurrencesCancelOptionalParams,
  OccurrencesListResourcesOptionalParams,
  OccurrencesListByScheduledActionOptionalParams,
  OccurrencesGetOptionalParams,
} from "../../api/occurrences/options.js";
import {
  RecurringActionsResourceOperationResult,
  CancelOccurrenceRequest,
  Occurrence,
  OccurrenceResource,
  DelayRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Occurrences operations. */
export interface OccurrencesOperations {
  /** A long-running resource action. */
  delay: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    body: DelayRequest,
    options?: OccurrencesDelayOptionalParams,
  ) => PollerLike<
    OperationState<RecurringActionsResourceOperationResult>,
    RecurringActionsResourceOperationResult
  >;
  /** A synchronous resource action. */
  cancel: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    body: CancelOccurrenceRequest,
    options?: OccurrencesCancelOptionalParams,
  ) => Promise<RecurringActionsResourceOperationResult>;
  /** List resources attached to Scheduled Actions for the given occurrence */
  listResources: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    options?: OccurrencesListResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<OccurrenceResource>;
  /** List Occurrence resources by ScheduledAction */
  listByScheduledAction: (
    resourceGroupName: string,
    scheduledActionName: string,
    options?: OccurrencesListByScheduledActionOptionalParams,
  ) => PagedAsyncIterableIterator<Occurrence>;
  /** Get a Occurrence */
  get: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    options?: OccurrencesGetOptionalParams,
  ) => Promise<Occurrence>;
}

function _getOccurrences(context: ComputeScheduleContext) {
  return {
    delay: (
      resourceGroupName: string,
      scheduledActionName: string,
      occurrenceId: string,
      body: DelayRequest,
      options?: OccurrencesDelayOptionalParams,
    ) => delay(context, resourceGroupName, scheduledActionName, occurrenceId, body, options),
    cancel: (
      resourceGroupName: string,
      scheduledActionName: string,
      occurrenceId: string,
      body: CancelOccurrenceRequest,
      options?: OccurrencesCancelOptionalParams,
    ) => cancel(context, resourceGroupName, scheduledActionName, occurrenceId, body, options),
    listResources: (
      resourceGroupName: string,
      scheduledActionName: string,
      occurrenceId: string,
      options?: OccurrencesListResourcesOptionalParams,
    ) => listResources(context, resourceGroupName, scheduledActionName, occurrenceId, options),
    listByScheduledAction: (
      resourceGroupName: string,
      scheduledActionName: string,
      options?: OccurrencesListByScheduledActionOptionalParams,
    ) => listByScheduledAction(context, resourceGroupName, scheduledActionName, options),
    get: (
      resourceGroupName: string,
      scheduledActionName: string,
      occurrenceId: string,
      options?: OccurrencesGetOptionalParams,
    ) => get(context, resourceGroupName, scheduledActionName, occurrenceId, options),
  };
}

export function _getOccurrencesOperations(context: ComputeScheduleContext): OccurrencesOperations {
  return {
    ..._getOccurrences(context),
  };
}
