// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import {
  fetchAvailablePlugins,
  checkEnterpriseDetails,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/grafana/operations.js";
import type {
  GrafanaFetchAvailablePluginsOptionalParams,
  GrafanaCheckEnterpriseDetailsOptionalParams,
  GrafanaListOptionalParams,
  GrafanaListByResourceGroupOptionalParams,
  GrafanaDeleteOptionalParams,
  GrafanaUpdateOptionalParams,
  GrafanaCreateOptionalParams,
  GrafanaGetOptionalParams,
} from "../../api/grafana/options.js";
import type {
  ManagedGrafana,
  ManagedGrafanaUpdateParameters,
  EnterpriseDetails,
  GrafanaAvailablePluginListResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Grafana operations. */
export interface GrafanaOperations {
  /** A synchronous resource action. */
  fetchAvailablePlugins: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaFetchAvailablePluginsOptionalParams,
  ) => Promise<GrafanaAvailablePluginListResponse>;
  /** Retrieve enterprise add-on details information */
  checkEnterpriseDetails: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaCheckEnterpriseDetailsOptionalParams,
  ) => Promise<EnterpriseDetails>;
  /** List all resources of workspaces for Grafana under the specified subscription. */
  list: (options?: GrafanaListOptionalParams) => PagedAsyncIterableIterator<ManagedGrafana>;
  /** List all resources of workspaces for Grafana under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GrafanaListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedGrafana>;
  /** Delete a workspace for Grafana resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a workspace for Grafana resource. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    requestBodyParameters: ManagedGrafanaUpdateParameters,
    options?: GrafanaUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
  /** Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    requestBodyParameters: ManagedGrafana,
    options?: GrafanaCreateOptionalParams,
  ) => PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
  /** Get the properties of a specific workspace for Grafana resource. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaGetOptionalParams,
  ) => Promise<ManagedGrafana>;
}

function _getGrafana(context: DashboardManagementContext) {
  return {
    fetchAvailablePlugins: (
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaFetchAvailablePluginsOptionalParams,
    ) => fetchAvailablePlugins(context, resourceGroupName, workspaceName, options),
    checkEnterpriseDetails: (
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaCheckEnterpriseDetailsOptionalParams,
    ) => checkEnterpriseDetails(context, resourceGroupName, workspaceName, options),
    list: (options?: GrafanaListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GrafanaListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      requestBodyParameters: ManagedGrafanaUpdateParameters,
      options?: GrafanaUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, requestBodyParameters, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      requestBodyParameters: ManagedGrafana,
      options?: GrafanaCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, requestBodyParameters, options),
    get: (resourceGroupName: string, workspaceName: string, options?: GrafanaGetOptionalParams) =>
      get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getGrafanaOperations(context: DashboardManagementContext): GrafanaOperations {
  return {
    ..._getGrafana(context),
  };
}
