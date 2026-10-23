// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/solutionDeployments/operations.js";
import type {
  SolutionDeploymentsListBySubscriptionOptionalParams,
  SolutionDeploymentsListByResourceGroupOptionalParams,
  SolutionDeploymentsDeleteOptionalParams,
  SolutionDeploymentsUpdateOptionalParams,
  SolutionDeploymentsCreateOrUpdateOptionalParams,
  SolutionDeploymentsGetOptionalParams,
} from "../../api/solutionDeployments/options.js";
import type { SolutionDeployment, SolutionDeploymentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionDeployments operations. */
export interface SolutionDeploymentsOperations {
  /** List by subscription */
  listBySubscription: (
    options?: SolutionDeploymentsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionDeployment>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SolutionDeploymentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionDeployment>;
  /** Delete a SolutionDeployment Resource */
  delete: (
    resourceGroupName: string,
    solutionDeploymentName: string,
    options?: SolutionDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a SolutionDeployment Resource */
  update: (
    resourceGroupName: string,
    solutionDeploymentName: string,
    properties: SolutionDeploymentUpdate,
    options?: SolutionDeploymentsUpdateOptionalParams,
  ) => Promise<SolutionDeployment>;
  /** Create or update a SolutionDeployment Resource */
  createOrUpdate: (
    resourceGroupName: string,
    solutionDeploymentName: string,
    resource: SolutionDeployment,
    options?: SolutionDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionDeployment>, SolutionDeployment>;
  /** Get a SolutionDeployment Resource */
  get: (
    resourceGroupName: string,
    solutionDeploymentName: string,
    options?: SolutionDeploymentsGetOptionalParams,
  ) => Promise<SolutionDeployment>;
}

function _getSolutionDeployments(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySubscription: (options?: SolutionDeploymentsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SolutionDeploymentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      solutionDeploymentName: string,
      options?: SolutionDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, solutionDeploymentName, options),
    update: (
      resourceGroupName: string,
      solutionDeploymentName: string,
      properties: SolutionDeploymentUpdate,
      options?: SolutionDeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, solutionDeploymentName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      solutionDeploymentName: string,
      resource: SolutionDeployment,
      options?: SolutionDeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, solutionDeploymentName, resource, options),
    get: (
      resourceGroupName: string,
      solutionDeploymentName: string,
      options?: SolutionDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, solutionDeploymentName, options),
  };
}

export function _getSolutionDeploymentsOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionDeploymentsOperations {
  return {
    ..._getSolutionDeployments(context),
  };
}
