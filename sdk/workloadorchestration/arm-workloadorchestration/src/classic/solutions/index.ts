// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByTarget,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/solutions/operations.js";
import {
  SolutionsListByTargetOptionalParams,
  SolutionsDeleteOptionalParams,
  SolutionsUpdateOptionalParams,
  SolutionsCreateOrUpdateOptionalParams,
  SolutionsGetOptionalParams,
} from "../../api/solutions/options.js";
import { Solution, SolutionUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Solutions operations. */
export interface SolutionsOperations {
  /** List Solution resources */
  listByTarget: (
    resourceGroupName: string,
    targetName: string,
    options?: SolutionsListByTargetOptionalParams,
  ) => PagedAsyncIterableIterator<Solution>;
  /** Delete a Solution Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    options?: SolutionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Solution Resource */
  update: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    properties: SolutionUpdate,
    options?: SolutionsUpdateOptionalParams,
  ) => PollerLike<OperationState<Solution>, Solution>;
  /** Create or update a Solution Resource */
  createOrUpdate: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    resource: Solution,
    options?: SolutionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Solution>, Solution>;
  /** Get a Solution resource */
  get: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    options?: SolutionsGetOptionalParams,
  ) => Promise<Solution>;
}

function _getSolutions(context: WorkloadOrchestrationManagementContext) {
  return {
    listByTarget: (
      resourceGroupName: string,
      targetName: string,
      options?: SolutionsListByTargetOptionalParams,
    ) => listByTarget(context, resourceGroupName, targetName, options),
    delete: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      options?: SolutionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, targetName, solutionName, options),
    update: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      properties: SolutionUpdate,
      options?: SolutionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, targetName, solutionName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      resource: Solution,
      options?: SolutionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, targetName, solutionName, resource, options),
    get: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      options?: SolutionsGetOptionalParams,
    ) => get(context, resourceGroupName, targetName, solutionName, options),
  };
}

export function _getSolutionsOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionsOperations {
  return {
    ..._getSolutions(context),
  };
}
