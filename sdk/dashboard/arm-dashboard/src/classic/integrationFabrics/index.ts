// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementContext } from "../../api/dashboardManagementContext.js";
import { list, $delete, update, create, get } from "../../api/integrationFabrics/operations.js";
import {
  IntegrationFabricsListOptionalParams,
  IntegrationFabricsDeleteOptionalParams,
  IntegrationFabricsUpdateOptionalParams,
  IntegrationFabricsCreateOptionalParams,
  IntegrationFabricsGetOptionalParams,
} from "../../api/integrationFabrics/options.js";
import { IntegrationFabric, IntegrationFabricUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IntegrationFabrics operations. */
export interface IntegrationFabricsOperations {
  /** List IntegrationFabric resources by ManagedGrafana */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    options?: IntegrationFabricsListOptionalParams,
  ) => PagedAsyncIterableIterator<IntegrationFabric>;
  /** Delete a IntegrationFabric */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    integrationFabricName: string,
    options?: IntegrationFabricsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a IntegrationFabric */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    integrationFabricName: string,
    requestBodyParameters: IntegrationFabricUpdateParameters,
    options?: IntegrationFabricsUpdateOptionalParams,
  ) => PollerLike<OperationState<IntegrationFabric>, IntegrationFabric>;
  /** Create a IntegrationFabric */
  create: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    integrationFabricName: string,
    requestBodyParameters: IntegrationFabric,
    options?: IntegrationFabricsCreateOptionalParams,
  ) => PollerLike<OperationState<IntegrationFabric>, IntegrationFabric>;
  /** Get a IntegrationFabric */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    workspaceName: string,
    integrationFabricName: string,
    options?: IntegrationFabricsGetOptionalParams,
  ) => Promise<IntegrationFabric>;
}

function _getIntegrationFabrics(context: DashboardManagementContext) {
  return {
    list: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      options?: IntegrationFabricsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, workspaceName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      integrationFabricName: string,
      options?: IntegrationFabricsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        workspaceName,
        integrationFabricName,
        options,
      ),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      integrationFabricName: string,
      requestBodyParameters: IntegrationFabricUpdateParameters,
      options?: IntegrationFabricsUpdateOptionalParams,
    ) =>
      update(
        context,
        apiVersion,
        resourceGroupName,
        workspaceName,
        integrationFabricName,
        requestBodyParameters,
        options,
      ),
    create: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      integrationFabricName: string,
      requestBodyParameters: IntegrationFabric,
      options?: IntegrationFabricsCreateOptionalParams,
    ) =>
      create(
        context,
        apiVersion,
        resourceGroupName,
        workspaceName,
        integrationFabricName,
        requestBodyParameters,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      workspaceName: string,
      integrationFabricName: string,
      options?: IntegrationFabricsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, workspaceName, integrationFabricName, options),
  };
}

export function _getIntegrationFabricsOperations(
  context: DashboardManagementContext,
): IntegrationFabricsOperations {
  return {
    ..._getIntegrationFabrics(context),
  };
}
