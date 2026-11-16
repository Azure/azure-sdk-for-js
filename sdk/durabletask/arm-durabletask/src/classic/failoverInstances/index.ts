// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  forceFailoverAllowDataLoss,
  failover,
  listByScheduler,
  $delete,
  createOrReplace,
  get,
} from "../../api/failoverInstances/operations.js";
import type {
  FailoverInstancesForceFailoverAllowDataLossOptionalParams,
  FailoverInstancesFailoverOptionalParams,
  FailoverInstancesListBySchedulerOptionalParams,
  FailoverInstancesDeleteOptionalParams,
  FailoverInstancesCreateOrReplaceOptionalParams,
  FailoverInstancesGetOptionalParams,
} from "../../api/failoverInstances/options.js";
import type { FailoverInstance } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FailoverInstances operations. */
export interface FailoverInstancesOperations {
  /** Trigger a forced failover with potential data loss for the parent scheduler */
  forceFailoverAllowDataLoss: (
    resourceGroupName: string,
    schedulerName: string,
    options?: FailoverInstancesForceFailoverAllowDataLossOptionalParams,
  ) => PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
  /** Trigger a graceful failover for the parent scheduler */
  failover: (
    resourceGroupName: string,
    schedulerName: string,
    options?: FailoverInstancesFailoverOptionalParams,
  ) => PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
  /** List Failover Instances */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: FailoverInstancesListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<FailoverInstance>;
  /** Delete a Failover Instance */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: FailoverInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or Update a Failover Instance */
  createOrReplace: (
    resourceGroupName: string,
    schedulerName: string,
    resource: FailoverInstance,
    options?: FailoverInstancesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
  /** Get a Failover Instance */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    options?: FailoverInstancesGetOptionalParams,
  ) => Promise<FailoverInstance>;
}

function _getFailoverInstances(context: DurableTaskContext) {
  return {
    forceFailoverAllowDataLoss: (
      resourceGroupName: string,
      schedulerName: string,
      options?: FailoverInstancesForceFailoverAllowDataLossOptionalParams,
    ) => forceFailoverAllowDataLoss(context, resourceGroupName, schedulerName, options),
    failover: (
      resourceGroupName: string,
      schedulerName: string,
      options?: FailoverInstancesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, schedulerName, options),
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: FailoverInstancesListBySchedulerOptionalParams,
    ) => listByScheduler(context, resourceGroupName, schedulerName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: FailoverInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, options),
    createOrReplace: (
      resourceGroupName: string,
      schedulerName: string,
      resource: FailoverInstance,
      options?: FailoverInstancesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, schedulerName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: FailoverInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, options),
  };
}

export function _getFailoverInstancesOperations(
  context: DurableTaskContext,
): FailoverInstancesOperations {
  return {
    ..._getFailoverInstances(context),
  };
}
