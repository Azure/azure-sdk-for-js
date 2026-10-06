// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  getAssignedDeployment,
  listAssignedDeploymentsByParent,
  unassignDeployment,
  assignDeployment,
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/goldenGateConnections/operations.js";
import type {
  GoldenGateConnectionsGetAssignedDeploymentOptionalParams,
  GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams,
  GoldenGateConnectionsUnassignDeploymentOptionalParams,
  GoldenGateConnectionsAssignDeploymentOptionalParams,
  GoldenGateConnectionsListByResourceGroupOptionalParams,
  GoldenGateConnectionsDeleteOptionalParams,
  GoldenGateConnectionsUpdateOptionalParams,
  GoldenGateConnectionsGetOptionalParams,
  GoldenGateConnectionsCreateOrUpdateOptionalParams,
  GoldenGateConnectionsListBySubscriptionOptionalParams,
} from "../../api/goldenGateConnections/options.js";
import type {
  GoldenGateConnection,
  GoldenGateConnectionUpdate,
  AssignUnassignDeployment,
  AssignedDeployment,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GoldenGateConnections operations. */
export interface GoldenGateConnectionsOperations {
  /** Get assigned deployment by GoldenGate connection. */
  getAssignedDeployment: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    assignmentId: string,
    options?: GoldenGateConnectionsGetAssignedDeploymentOptionalParams,
  ) => Promise<AssignedDeployment>;
  /** List assigned deployments by GoldenGate connection. */
  listAssignedDeploymentsByParent: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    options?: GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AssignedDeployment>;
  /** Unassign a GoldenGate deployment from a connection. */
  unassignDeployment: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    body: AssignUnassignDeployment,
    options?: GoldenGateConnectionsUnassignDeploymentOptionalParams,
  ) => PollerLike<OperationState<AssignedDeployment>, AssignedDeployment>;
  /** Assign a GoldenGate deployment to a connection. */
  assignDeployment: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    body: AssignUnassignDeployment,
    options?: GoldenGateConnectionsAssignDeploymentOptionalParams,
  ) => PollerLike<OperationState<AssignedDeployment>, AssignedDeployment>;
  /** List GoldenGateConnection resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GoldenGateConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GoldenGateConnection>;
  /** Delete a GoldenGateConnection */
  delete: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    options?: GoldenGateConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a GoldenGateConnection */
  update: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    properties: GoldenGateConnectionUpdate,
    options?: GoldenGateConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection>;
  /** Get a GoldenGateConnection */
  get: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    options?: GoldenGateConnectionsGetOptionalParams,
  ) => Promise<GoldenGateConnection>;
  /** Create a GoldenGateConnection */
  createOrUpdate: (
    resourceGroupName: string,
    goldenGateConnectionName: string,
    resource: GoldenGateConnection,
    options?: GoldenGateConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GoldenGateConnection>, GoldenGateConnection>;
  /** List GoldenGateConnection resources by subscription ID */
  listBySubscription: (
    options?: GoldenGateConnectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GoldenGateConnection>;
}

function _getGoldenGateConnections(context: OracleDatabaseManagementContext) {
  return {
    getAssignedDeployment: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      assignmentId: string,
      options?: GoldenGateConnectionsGetAssignedDeploymentOptionalParams,
    ) =>
      getAssignedDeployment(
        context,
        resourceGroupName,
        goldenGateConnectionName,
        assignmentId,
        options,
      ),
    listAssignedDeploymentsByParent: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      options?: GoldenGateConnectionsListAssignedDeploymentsByParentOptionalParams,
    ) =>
      listAssignedDeploymentsByParent(
        context,
        resourceGroupName,
        goldenGateConnectionName,
        options,
      ),
    unassignDeployment: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      body: AssignUnassignDeployment,
      options?: GoldenGateConnectionsUnassignDeploymentOptionalParams,
    ) => unassignDeployment(context, resourceGroupName, goldenGateConnectionName, body, options),
    assignDeployment: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      body: AssignUnassignDeployment,
      options?: GoldenGateConnectionsAssignDeploymentOptionalParams,
    ) => assignDeployment(context, resourceGroupName, goldenGateConnectionName, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GoldenGateConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      options?: GoldenGateConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, goldenGateConnectionName, options),
    update: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      properties: GoldenGateConnectionUpdate,
      options?: GoldenGateConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, goldenGateConnectionName, properties, options),
    get: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      options?: GoldenGateConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, goldenGateConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      goldenGateConnectionName: string,
      resource: GoldenGateConnection,
      options?: GoldenGateConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, goldenGateConnectionName, resource, options),
    listBySubscription: (options?: GoldenGateConnectionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getGoldenGateConnectionsOperations(
  context: OracleDatabaseManagementContext,
): GoldenGateConnectionsOperations {
  return {
    ..._getGoldenGateConnections(context),
  };
}
