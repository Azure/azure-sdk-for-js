// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  SchedulersListBySubscriptionOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersGetOptionalParams,
} from "../../api/options.js";
import {
  schedulersListBySubscription,
  schedulersListByResourceGroup,
  schedulersDelete,
  schedulersUpdate,
  schedulersCreateOrUpdate,
  schedulersGet,
} from "../../api/schedulers/index.js";
import { Scheduler } from "../../models/models.js";
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
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Scheduler */
  update: (
    resourceGroupName: string,
    schedulerName: string,
    properties: Scheduler,
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
      schedulersListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchedulersListByResourceGroupOptionalParams,
    ) => schedulersListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersDeleteOptionalParams,
    ) => schedulersDelete(context, resourceGroupName, schedulerName, options),
    update: (
      resourceGroupName: string,
      schedulerName: string,
      properties: Scheduler,
      options?: SchedulersUpdateOptionalParams,
    ) => schedulersUpdate(context, resourceGroupName, schedulerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      resource: Scheduler,
      options?: SchedulersCreateOrUpdateOptionalParams,
    ) => schedulersCreateOrUpdate(context, resourceGroupName, schedulerName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersGetOptionalParams,
    ) => schedulersGet(context, resourceGroupName, schedulerName, options),
  };
}

export function _getSchedulersOperations(context: DurableTaskContext): SchedulersOperations {
  return {
    ..._getSchedulers(context),
  };
}
