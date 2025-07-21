// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import {
  ManagedGrafana,
  ManagedGrafanaUpdateParameters,
  EnterpriseDetails,
  GrafanaAvailablePluginListResponse,
} from "../../models/models.js";
import {
  GrafanaFetchAvailablePluginsOptionalParams,
  GrafanaCheckEnterpriseDetailsOptionalParams,
  GrafanaListOptionalParams,
  GrafanaListByResourceGroupOptionalParams,
  GrafanaDeleteOptionalParams,
  GrafanaUpdateOptionalParams,
  GrafanaCreateOptionalParams,
  GrafanaGetOptionalParams,
} from "../../api/grafana/options.js";
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
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Grafana operations. */
export interface GrafanaOperations {
  /** A synchronous resource action. */
  fetchAvailablePlugins: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaFetchAvailablePluginsOptionalParams,
  ) => Promise<GrafanaAvailablePluginListResponse>;
  /** Retrieve enterprise add-on details information */
  checkEnterpriseDetails: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaCheckEnterpriseDetailsOptionalParams,
  ) => Promise<EnterpriseDetails>;
  /** List all resources of workspaces for Grafana under the specified subscription. */
  list: (
    apiVersion: string,
    options?: GrafanaListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedGrafana>;
  /** List all resources of workspaces for Grafana under the specified resource group. */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a workspace for Grafana resource. */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    requestBodyParameters: ManagedGrafanaUpdateParameters,
    options?: GrafanaUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
  /** Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. */
  create: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    requestBodyParameters: ManagedGrafana,
    options?: GrafanaCreateOptionalParams,
  ) => PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
  /** Get the properties of a specific workspace for Grafana resource. */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: GrafanaGetOptionalParams,
  ) => Promise<ManagedGrafana>;
}

function _getGrafana(context: DashboardManagementContext) {
  return {
    fetchAvailablePlugins: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaFetchAvailablePluginsOptionalParams,
    ) => fetchAvailablePlugins(context, apiVersion, resourceGroupName, workspaceName, options),
    checkEnterpriseDetails: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaCheckEnterpriseDetailsOptionalParams,
    ) => checkEnterpriseDetails(context, apiVersion, resourceGroupName, workspaceName, options),
    list: (apiVersion: string, options?: GrafanaListOptionalParams) =>
      list(context, apiVersion, options),
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      options?: GrafanaListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, workspaceName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      requestBodyParameters: ManagedGrafanaUpdateParameters,
      options?: GrafanaUpdateOptionalParams,
    ) =>
      update(context, apiVersion, resourceGroupName, workspaceName, requestBodyParameters, options),
    create: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      requestBodyParameters: ManagedGrafana,
      options?: GrafanaCreateOptionalParams,
    ) =>
      create(context, apiVersion, resourceGroupName, workspaceName, requestBodyParameters, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: GrafanaGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, workspaceName, options),
  };
}

export function _getGrafanaOperations(context: DashboardManagementContext): GrafanaOperations {
  return {
    ..._getGrafana(context),
  };
}
