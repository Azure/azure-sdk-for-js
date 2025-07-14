// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import { Scheduler, SchedulerUpdate } from "../../models/models.js";
import {
  SchedulersListBySubscriptionOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersGetOptionalParams,
} from "../../api/schedulers/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schedulers/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedulers operations. */
export interface SchedulersOperations {
  /** List Schedulers by subscription */
  listBySubscription: (
    options?: SchedulersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Scheduler>;
  /** List Schedulers by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SchedulersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Scheduler>;
  /** Delete a Scheduler */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Scheduler */
  update: (
    resourceGroupName: string,
    schedulerName: string,
    properties: SchedulerUpdate,
    options?: SchedulersUpdateOptionalParams,
  ) => PollerLike<OperationState<Scheduler>, Scheduler>;
  /** Create or update a Scheduler */
  createOrUpdate: (
    resourceGroupName: string,
    schedulerName: string,
    resource: Scheduler,
    options?: SchedulersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Scheduler>, Scheduler>;
  /** Get a Scheduler */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersGetOptionalParams,
  ) => Promise<Scheduler>;
}

function _getSchedulers(context: DurableTaskContext) {
  return {
    listBySubscription: (options?: SchedulersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchedulersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, options),
    update: (
      resourceGroupName: string,
      schedulerName: string,
      properties: SchedulerUpdate,
      options?: SchedulersUpdateOptionalParams,
    ) => update(context, resourceGroupName, schedulerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      resource: Scheduler,
      options?: SchedulersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, schedulerName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, options),
  };
}

export function _getSchedulersOperations(context: DurableTaskContext): SchedulersOperations {
  return {
    ..._getSchedulers(context),
  };
}
