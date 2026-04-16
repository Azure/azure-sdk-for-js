// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/managedDashboards/operations.js";
import type {
  ManagedDashboardsListBySubscriptionOptionalParams,
  ManagedDashboardsListOptionalParams,
  ManagedDashboardsDeleteOptionalParams,
  ManagedDashboardsUpdateOptionalParams,
  ManagedDashboardsCreateOptionalParams,
  ManagedDashboardsGetOptionalParams,
} from "../../api/managedDashboards/options.js";
import type { ManagedDashboard, ManagedDashboardUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedDashboards operations. */
export interface ManagedDashboardsOperations {
  /** List all resources of dashboards under the specified subscription. */
  listBySubscription: (
    options?: ManagedDashboardsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDashboard>;
  /** List all resources of dashboards under the specified resource group. */
  list: (
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
    resourceGroupName: string,
    dashboardName: string,
    options?: ManagedDashboardsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a dashboard for Grafana resource. */
  update: (
    resourceGroupName: string,
    dashboardName: string,
    requestBodyParameters: ManagedDashboardUpdateParameters,
    options?: ManagedDashboardsUpdateOptionalParams,
  ) => Promise<ManagedDashboard>;
  /** Create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard. */
  create: (
    resourceGroupName: string,
    dashboardName: string,
    requestBodyParameters: ManagedDashboard,
    options?: ManagedDashboardsCreateOptionalParams,
  ) => PollerLike<OperationState<ManagedDashboard>, ManagedDashboard>;
  /** Get the properties of a specific dashboard for grafana resource. */
  get: (
    resourceGroupName: string,
    dashboardName: string,
    options?: ManagedDashboardsGetOptionalParams,
  ) => Promise<ManagedDashboard>;
}

function _getManagedDashboards(context: DashboardManagementContext) {
  return {
    listBySubscription: (options?: ManagedDashboardsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: ManagedDashboardsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dashboardName: string,
      options?: ManagedDashboardsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dashboardName, options),
    update: (
      resourceGroupName: string,
      dashboardName: string,
      requestBodyParameters: ManagedDashboardUpdateParameters,
      options?: ManagedDashboardsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dashboardName, requestBodyParameters, options),
    create: (
      resourceGroupName: string,
      dashboardName: string,
      requestBodyParameters: ManagedDashboard,
      options?: ManagedDashboardsCreateOptionalParams,
    ) => create(context, resourceGroupName, dashboardName, requestBodyParameters, options),
    get: (
      resourceGroupName: string,
      dashboardName: string,
      options?: ManagedDashboardsGetOptionalParams,
    ) => get(context, resourceGroupName, dashboardName, options),
  };
}

export function _getManagedDashboardsOperations(
  context: DashboardManagementContext,
): ManagedDashboardsOperations {
  return {
    ..._getManagedDashboards(context),
  };
}
