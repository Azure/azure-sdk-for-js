// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  listPrivateEndpointConnections,
  deletePrivateEndpointConnection,
  updatePrivateEndpointConnection,
  createOrUpdatePrivateEndpointConnection,
  getPrivateEndpointConnection,
  listPrivateLinks,
  getPrivateLink,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schedulers/operations.js";
import type {
  SchedulersListPrivateEndpointConnectionsOptionalParams,
  SchedulersDeletePrivateEndpointConnectionOptionalParams,
  SchedulersUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersGetPrivateEndpointConnectionOptionalParams,
  SchedulersListPrivateLinksOptionalParams,
  SchedulersGetPrivateLinkOptionalParams,
  SchedulersListBySubscriptionOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersGetOptionalParams,
} from "../../api/schedulers/options.js";
import type {
  Scheduler,
  PrivateEndpointConnection,
  SchedulerUpdate,
  SchedulerPrivateLinkResource,
  PrivateEndpointConnectionUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedulers operations. */
export interface SchedulersOperations {
  /** List private endpoint connections for the durable task scheduler */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersListPrivateEndpointConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete a private endpoint connection for the durable task scheduler */
  deletePrivateEndpointConnection: (
    resourceGroupName: string,
    schedulerName: string,
    privateEndpointConnectionName: string,
    options?: SchedulersDeletePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a private endpoint connection for the durable task scheduler */
  updatePrivateEndpointConnection: (
    resourceGroupName: string,
    schedulerName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionUpdate,
    options?: SchedulersUpdatePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Create or update a private endpoint connection for the durable task scheduler */
  createOrUpdatePrivateEndpointConnection: (
    resourceGroupName: string,
    schedulerName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnection,
    options?: SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Get a private endpoint connection for the durable task scheduler */
  getPrivateEndpointConnection: (
    resourceGroupName: string,
    schedulerName: string,
    privateEndpointConnectionName: string,
    options?: SchedulersGetPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** List private link resources for the durable task scheduler */
  listPrivateLinks: (
    resourceGroupName: string,
    schedulerName: string,
    options?: SchedulersListPrivateLinksOptionalParams,
  ) => PagedAsyncIterableIterator<SchedulerPrivateLinkResource>;
  /** Get a private link resource for the durable task scheduler */
  getPrivateLink: (
    resourceGroupName: string,
    schedulerName: string,
    privateLinkResourceName: string,
    options?: SchedulersGetPrivateLinkOptionalParams,
  ) => Promise<SchedulerPrivateLinkResource>;
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
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersListPrivateEndpointConnectionsOptionalParams,
    ) => listPrivateEndpointConnections(context, resourceGroupName, schedulerName, options),
    deletePrivateEndpointConnection: (
      resourceGroupName: string,
      schedulerName: string,
      privateEndpointConnectionName: string,
      options?: SchedulersDeletePrivateEndpointConnectionOptionalParams,
    ) =>
      deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        schedulerName,
        privateEndpointConnectionName,
        options,
      ),
    updatePrivateEndpointConnection: (
      resourceGroupName: string,
      schedulerName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionUpdate,
      options?: SchedulersUpdatePrivateEndpointConnectionOptionalParams,
    ) =>
      updatePrivateEndpointConnection(
        context,
        resourceGroupName,
        schedulerName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    createOrUpdatePrivateEndpointConnection: (
      resourceGroupName: string,
      schedulerName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnection,
      options?: SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams,
    ) =>
      createOrUpdatePrivateEndpointConnection(
        context,
        resourceGroupName,
        schedulerName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    getPrivateEndpointConnection: (
      resourceGroupName: string,
      schedulerName: string,
      privateEndpointConnectionName: string,
      options?: SchedulersGetPrivateEndpointConnectionOptionalParams,
    ) =>
      getPrivateEndpointConnection(
        context,
        resourceGroupName,
        schedulerName,
        privateEndpointConnectionName,
        options,
      ),
    listPrivateLinks: (
      resourceGroupName: string,
      schedulerName: string,
      options?: SchedulersListPrivateLinksOptionalParams,
    ) => listPrivateLinks(context, resourceGroupName, schedulerName, options),
    getPrivateLink: (
      resourceGroupName: string,
      schedulerName: string,
      privateLinkResourceName: string,
      options?: SchedulersGetPrivateLinkOptionalParams,
    ) =>
      getPrivateLink(context, resourceGroupName, schedulerName, privateLinkResourceName, options),
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
