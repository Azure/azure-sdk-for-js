// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/managedDashboards/operations.js";
import {
  ManagedDashboardsListBySubscriptionOptionalParams,
  ManagedDashboardsListOptionalParams,
  ManagedDashboardsDeleteOptionalParams,
  ManagedDashboardsUpdateOptionalParams,
  ManagedDashboardsCreateOptionalParams,
  ManagedDashboardsGetOptionalParams,
} from "../../api/managedDashboards/options.js";
import { ManagedDashboard, ManagedDashboardUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedDashboards operations. */
export interface ManagedDashboardsOperations {
  /** List all resources of dashboards under the specified subscription. */
  listBySubscription: (
    apiVersion: string,
    options?: ManagedDashboardsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDashboard>;
  /** List all resources of dashboards under the specified resource group. */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    options?: ManagedDashboardsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDashboard>;
  /** Delete a dashboard for Grafana resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    dashboardName: string,
    options?: ManagedDashboardsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a dashboard for Grafana resource. */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    dashboardName: string,
    requestBodyParameters: ManagedDashboardUpdateParameters,
    options?: ManagedDashboardsUpdateOptionalParams,
  ) => Promise<ManagedDashboard>;
  /** Create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard. */
  create: (
    apiVersion: string,
    resourceGroupName: string,
    dashboardName: string,
    requestBodyParameters: ManagedDashboard,
    options?: ManagedDashboardsCreateOptionalParams,
  ) => PollerLike<OperationState<ManagedDashboard>, ManagedDashboard>;
  /** Get the properties of a specific dashboard for grafana resource. */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    dashboardName: string,
    options?: ManagedDashboardsGetOptionalParams,
  ) => Promise<ManagedDashboard>;
}

function _getManagedDashboards(context: DashboardManagementContext) {
  return {
    listBySubscription: (
      apiVersion: string,
      options?: ManagedDashboardsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, apiVersion, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      options?: ManagedDashboardsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      dashboardName: string,
      options?: ManagedDashboardsDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, dashboardName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      dashboardName: string,
      requestBodyParameters: ManagedDashboardUpdateParameters,
      options?: ManagedDashboardsUpdateOptionalParams,
    ) =>
      update(context, apiVersion, resourceGroupName, dashboardName, requestBodyParameters, options),
    create: (
      apiVersion: string,
      resourceGroupName: string,
      dashboardName: string,
      requestBodyParameters: ManagedDashboard,
      options?: ManagedDashboardsCreateOptionalParams,
    ) =>
      create(context, apiVersion, resourceGroupName, dashboardName, requestBodyParameters, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      dashboardName: string,
      options?: ManagedDashboardsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, dashboardName, options),
  };
}

export function _getManagedDashboardsOperations(
  context: DashboardManagementContext,
): ManagedDashboardsOperations {
  return {
    ..._getManagedDashboards(context),
  };
}
