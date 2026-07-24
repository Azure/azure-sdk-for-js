// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  delay,
  cancel,
  listResources,
  listByScheduledAction,
  get,
} from "../../api/occurrences/operations.js";
import type {
  OccurrencesDelayOptionalParams,
  OccurrencesCancelOptionalParams,
  OccurrencesListResourcesOptionalParams,
  OccurrencesListByScheduledActionOptionalParams,
  OccurrencesGetOptionalParams,
} from "../../api/occurrences/options.js";
import type {
  ResourceOperationResponse,
  CancelOccurrenceRequest,
  Occurrence,
  OccurrenceResource,
  DelayRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Occurrences operations. */
export interface OccurrencesOperations {
  /** Delay the occurrence to a later time. */
  delay: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    body: DelayRequest,
    options?: OccurrencesDelayOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
  /** Cancel the occurrence so its pending operations do not run. */
  cancel: (
    resourceGroupName: string,
    scheduledActionName: string,
    occurrenceId: string,
    body: CancelOccurrenceRequest,
    options?: OccurrencesCancelOptionalParams,
  ) => PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
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
function _getOccurrences(context: ComputeContext) {
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
export function _getOccurrencesOperations(context: ComputeContext): OccurrencesOperations {
  return {
    ..._getOccurrences(context),
  };
}
