// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsContext } from "../../api/deploymentsContext.js";
import {
  list,
  get,
  listAtSubscriptionScope,
  getAtSubscriptionScope,
  listAtManagementGroupScope,
  getAtManagementGroupScope,
  listAtTenantScope,
  getAtTenantScope,
  listAtScope,
  getAtScope,
} from "../../api/deploymentOperations/operations.js";
import {
  DeploymentOperationsListOptionalParams,
  DeploymentOperationsGetOptionalParams,
  DeploymentOperationsListAtSubscriptionScopeOptionalParams,
  DeploymentOperationsGetAtSubscriptionScopeOptionalParams,
  DeploymentOperationsListAtManagementGroupScopeOptionalParams,
  DeploymentOperationsGetAtManagementGroupScopeOptionalParams,
  DeploymentOperationsListAtTenantScopeOptionalParams,
  DeploymentOperationsGetAtTenantScopeOptionalParams,
  DeploymentOperationsListAtScopeOptionalParams,
  DeploymentOperationsGetAtScopeOptionalParams,
} from "../../api/deploymentOperations/options.js";
import { DeploymentOperation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeploymentOperations operations. */
export interface DeploymentOperationsOperations {
  /** Gets all deployments operations for a deployment. */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentOperation>;
  /** Gets a deployments operation. */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    operationId: string,
    options?: DeploymentOperationsGetOptionalParams,
  ) => Promise<DeploymentOperation>;
  /** Gets all deployments operations for a deployment. */
  listAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentOperationsListAtSubscriptionScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentOperation>;
  /** Gets a deployments operation. */
  getAtSubscriptionScope: (
    deploymentName: string,
    operationId: string,
    options?: DeploymentOperationsGetAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentOperation>;
  /** Gets all deployments operations for a deployment. */
  listAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentOperationsListAtManagementGroupScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentOperation>;
  /** Gets a deployments operation. */
  getAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    operationId: string,
    options?: DeploymentOperationsGetAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentOperation>;
  /** Gets all deployments operations for a deployment. */
  listAtTenantScope: (
    deploymentName: string,
    options?: DeploymentOperationsListAtTenantScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentOperation>;
  /** Gets a deployments operation. */
  getAtTenantScope: (
    deploymentName: string,
    operationId: string,
    options?: DeploymentOperationsGetAtTenantScopeOptionalParams,
  ) => Promise<DeploymentOperation>;
  /** Gets all deployments operations for a deployment. */
  listAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentOperationsListAtScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentOperation>;
  /** Gets a deployments operation. */
  getAtScope: (
    scope: string,
    deploymentName: string,
    operationId: string,
    options?: DeploymentOperationsGetAtScopeOptionalParams,
  ) => Promise<DeploymentOperation>;
}

function _getDeploymentOperations(context: DeploymentsContext) {
  return {
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentOperationsListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      operationId: string,
      options?: DeploymentOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, operationId, options),
    listAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentOperationsListAtSubscriptionScopeOptionalParams,
    ) => listAtSubscriptionScope(context, deploymentName, options),
    getAtSubscriptionScope: (
      deploymentName: string,
      operationId: string,
      options?: DeploymentOperationsGetAtSubscriptionScopeOptionalParams,
    ) => getAtSubscriptionScope(context, deploymentName, operationId, options),
    listAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentOperationsListAtManagementGroupScopeOptionalParams,
    ) => listAtManagementGroupScope(context, groupId, deploymentName, options),
    getAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      operationId: string,
      options?: DeploymentOperationsGetAtManagementGroupScopeOptionalParams,
    ) => getAtManagementGroupScope(context, groupId, deploymentName, operationId, options),
    listAtTenantScope: (
      deploymentName: string,
      options?: DeploymentOperationsListAtTenantScopeOptionalParams,
    ) => listAtTenantScope(context, deploymentName, options),
    getAtTenantScope: (
      deploymentName: string,
      operationId: string,
      options?: DeploymentOperationsGetAtTenantScopeOptionalParams,
    ) => getAtTenantScope(context, deploymentName, operationId, options),
    listAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentOperationsListAtScopeOptionalParams,
    ) => listAtScope(context, scope, deploymentName, options),
    getAtScope: (
      scope: string,
      deploymentName: string,
      operationId: string,
      options?: DeploymentOperationsGetAtScopeOptionalParams,
    ) => getAtScope(context, scope, deploymentName, operationId, options),
  };
}

export function _getDeploymentOperationsOperations(
  context: DeploymentsContext,
): DeploymentOperationsOperations {
  return {
    ..._getDeploymentOperations(context),
  };
}
