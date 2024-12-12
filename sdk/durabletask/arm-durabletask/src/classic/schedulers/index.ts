// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  SchedulersGetOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  schedulersGet,
  schedulersCreateOrUpdate,
  schedulersUpdate,
  schedulersDelete,
  schedulersListByResourceGroup,
  schedulersListBySubscription,
} from "../../api/schedulers/index.js";
import { Scheduler } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedulers operations. */
export interface SchedulersOperations {
  /** Get a Scheduler */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersGetOptionalParams,
  ) => Promise<Scheduler>;
  /** Create or update a Scheduler */
  createOrUpdate: (
    resourceGroupName: string,
    schedulerName: string,
    resource: Scheduler,
    options?: SchedulersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Scheduler>, Scheduler>;
  /** Update a Scheduler */
  update: (
    resourceGroupName: string,
    schedulerName: string,
    properties: Scheduler,
    options?: SchedulersUpdateOptionalParams,
  ) => PollerLike<OperationState<Scheduler>, Scheduler>;
  /** Delete a Scheduler */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Schedulers by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SchedulersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Scheduler>;
  /** List Schedulers by subscription */
  listBySubscription: (
    options?: SchedulersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Scheduler>;
}

export function getSchedulers(
  context: DurableTaskContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersGetOptionalParams,
    ) =>
      schedulersGet(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      resource: Scheduler,
      options?: SchedulersCreateOrUpdateOptionalParams,
    ) =>
      schedulersCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      schedulerName: string,
      properties: Scheduler,
      options?: SchedulersUpdateOptionalParams,
    ) =>
      schedulersUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersDeleteOptionalParams,
    ) =>
      schedulersDelete(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchedulersListByResourceGroupOptionalParams,
    ) =>
      schedulersListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: SchedulersListBySubscriptionOptionalParams,
    ) => schedulersListBySubscription(context, subscriptionId, options),
  };
}

export function getSchedulersOperations(
  context: DurableTaskContext,
  subscriptionId: string,
): SchedulersOperations {
  return {
    ...getSchedulers(context, subscriptionId),
  };
}
