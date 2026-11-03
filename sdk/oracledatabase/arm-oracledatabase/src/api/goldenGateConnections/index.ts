// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
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
} from "./operations.js";
export type {
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
} from "./options.js";
