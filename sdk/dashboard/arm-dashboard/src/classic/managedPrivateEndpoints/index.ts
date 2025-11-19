// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import {
  list,
  $delete,
  update,
  create,
  get,
  refresh,
} from "../../api/managedPrivateEndpoints/operations.js";
import type {
  ManagedPrivateEndpointsListOptionalParams,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsUpdateOptionalParams,
  ManagedPrivateEndpointsCreateOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
  ManagedPrivateEndpointsRefreshOptionalParams,
} from "../../api/managedPrivateEndpoints/options.js";
import type {
  ManagedPrivateEndpointModel,
  ManagedPrivateEndpointUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedPrivateEndpoints operations. */
export interface ManagedPrivateEndpointsOperations {
  /** List all managed private endpoints of a grafana resource. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagedPrivateEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedPrivateEndpointModel>;
  /** Delete a managed private endpoint for a grafana resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a managed private endpoint for an existing grafana resource. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    managedPrivateEndpointName: string,
    requestBodyParameters: ManagedPrivateEndpointUpdateParameters,
    options?: ManagedPrivateEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel>;
  /** Create or update a managed private endpoint for a grafana resource. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    managedPrivateEndpointName: string,
    requestBodyParameters: ManagedPrivateEndpointModel,
    options?: ManagedPrivateEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel>;
  /** Get a specific managed private endpoint of a grafana resource. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsGetOptionalParams,
  ) => Promise<ManagedPrivateEndpointModel>;
  /** Refresh and sync managed private endpoints of a grafana resource to latest state. */
  refresh: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagedPrivateEndpointsRefreshOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getManagedPrivateEndpoints(context: DashboardManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagedPrivateEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, managedPrivateEndpointName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      managedPrivateEndpointName: string,
      requestBodyParameters: ManagedPrivateEndpointUpdateParameters,
      options?: ManagedPrivateEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        workspaceName,
        managedPrivateEndpointName,
        requestBodyParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      managedPrivateEndpointName: string,
      requestBodyParameters: ManagedPrivateEndpointModel,
      options?: ManagedPrivateEndpointsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        workspaceName,
        managedPrivateEndpointName,
        requestBodyParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, managedPrivateEndpointName, options),
    refresh: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagedPrivateEndpointsRefreshOptionalParams,
    ) => refresh(context, resourceGroupName, workspaceName, options),
  };
}

export function _getManagedPrivateEndpointsOperations(
  context: DashboardManagementContext,
): ManagedPrivateEndpointsOperations {
  return {
    ..._getManagedPrivateEndpoints(context),
  };
}
