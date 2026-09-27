// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  getAssignedConnection,
  listAssignedConnectionsByParent,
  unassignConnection,
  assignConnection,
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/goldenGateDeployments/operations.js";
import type {
  GoldenGateDeploymentsGetAssignedConnectionOptionalParams,
  GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams,
  GoldenGateDeploymentsUnassignConnectionOptionalParams,
  GoldenGateDeploymentsAssignConnectionOptionalParams,
  GoldenGateDeploymentsListByResourceGroupOptionalParams,
  GoldenGateDeploymentsDeleteOptionalParams,
  GoldenGateDeploymentsUpdateOptionalParams,
  GoldenGateDeploymentsGetOptionalParams,
  GoldenGateDeploymentsCreateOrUpdateOptionalParams,
  GoldenGateDeploymentsListBySubscriptionOptionalParams,
} from "../../api/goldenGateDeployments/options.js";
import type {
  GoldenGateDeployment,
  GoldenGateDeploymentUpdate,
  AssignUnassignConnection,
  AssignedConnection,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GoldenGateDeployments operations. */
export interface GoldenGateDeploymentsOperations {
  /** Get assigned connection by GoldenGate deployment. */
  getAssignedConnection: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    assignmentId: string,
    options?: GoldenGateDeploymentsGetAssignedConnectionOptionalParams,
  ) => Promise<AssignedConnection>;
  /** List assigned connections by GoldenGate deployment. */
  listAssignedConnectionsByParent: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    options?: GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AssignedConnection>;
  /** Unassign a GoldenGate connection from a deployment. */
  unassignConnection: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    body: AssignUnassignConnection,
    options?: GoldenGateDeploymentsUnassignConnectionOptionalParams,
  ) => PollerLike<OperationState<AssignedConnection>, AssignedConnection>;
  /** Assign a GoldenGate connection to a deployment. */
  assignConnection: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    body: AssignUnassignConnection,
    options?: GoldenGateDeploymentsAssignConnectionOptionalParams,
  ) => PollerLike<OperationState<AssignedConnection>, AssignedConnection>;
  /** List GoldenGateDeployment resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GoldenGateDeploymentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GoldenGateDeployment>;
  /** Delete a GoldenGateDeployment */
  delete: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    options?: GoldenGateDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a GoldenGateDeployment */
  update: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    properties: GoldenGateDeploymentUpdate,
    options?: GoldenGateDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment>;
  /** Get a GoldenGateDeployment */
  get: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    options?: GoldenGateDeploymentsGetOptionalParams,
  ) => Promise<GoldenGateDeployment>;
  /** Create a GoldenGateDeployment */
  createOrUpdate: (
    resourceGroupName: string,
    goldenGateDeploymentName: string,
    resource: GoldenGateDeployment,
    options?: GoldenGateDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GoldenGateDeployment>, GoldenGateDeployment>;
  /** List GoldenGateDeployment resources by subscription ID */
  listBySubscription: (
    options?: GoldenGateDeploymentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GoldenGateDeployment>;
}

function _getGoldenGateDeployments(context: OracleDatabaseManagementContext) {
  return {
    getAssignedConnection: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      assignmentId: string,
      options?: GoldenGateDeploymentsGetAssignedConnectionOptionalParams,
    ) =>
      getAssignedConnection(
        context,
        resourceGroupName,
        goldenGateDeploymentName,
        assignmentId,
        options,
      ),
    listAssignedConnectionsByParent: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      options?: GoldenGateDeploymentsListAssignedConnectionsByParentOptionalParams,
    ) =>
      listAssignedConnectionsByParent(
        context,
        resourceGroupName,
        goldenGateDeploymentName,
        options,
      ),
    unassignConnection: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      body: AssignUnassignConnection,
      options?: GoldenGateDeploymentsUnassignConnectionOptionalParams,
    ) => unassignConnection(context, resourceGroupName, goldenGateDeploymentName, body, options),
    assignConnection: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      body: AssignUnassignConnection,
      options?: GoldenGateDeploymentsAssignConnectionOptionalParams,
    ) => assignConnection(context, resourceGroupName, goldenGateDeploymentName, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GoldenGateDeploymentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      options?: GoldenGateDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, goldenGateDeploymentName, options),
    update: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      properties: GoldenGateDeploymentUpdate,
      options?: GoldenGateDeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, goldenGateDeploymentName, properties, options),
    get: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      options?: GoldenGateDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, goldenGateDeploymentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      goldenGateDeploymentName: string,
      resource: GoldenGateDeployment,
      options?: GoldenGateDeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, goldenGateDeploymentName, resource, options),
    listBySubscription: (options?: GoldenGateDeploymentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getGoldenGateDeploymentsOperations(
  context: OracleDatabaseManagementContext,
): GoldenGateDeploymentsOperations {
  return {
    ..._getGoldenGateDeployments(context),
  };
}
