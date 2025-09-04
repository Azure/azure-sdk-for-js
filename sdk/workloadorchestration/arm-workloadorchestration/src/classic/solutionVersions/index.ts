// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySolution,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/solutionVersions/operations.js";
import {
  SolutionVersionsListBySolutionOptionalParams,
  SolutionVersionsDeleteOptionalParams,
  SolutionVersionsUpdateOptionalParams,
  SolutionVersionsCreateOrUpdateOptionalParams,
  SolutionVersionsGetOptionalParams,
} from "../../api/solutionVersions/options.js";
import { SolutionVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SolutionVersions operations. */
export interface SolutionVersionsOperations {
  /** List Solution Version Resources */
  listBySolution: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    options?: SolutionVersionsListBySolutionOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionVersion>;
  /** Delete a Solution Version Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    solutionVersionName: string,
    options?: SolutionVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Solution Version Resource */
  update: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    solutionVersionName: string,
    properties: SolutionVersion,
    options?: SolutionVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
  /** Create or update a Solution Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    solutionVersionName: string,
    resource: SolutionVersion,
    options?: SolutionVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionVersion>, SolutionVersion>;
  /** Get a Solution Version Resource */
  get: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    solutionVersionName: string,
    options?: SolutionVersionsGetOptionalParams,
  ) => Promise<SolutionVersion>;
}

function _getSolutionVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySolution: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      options?: SolutionVersionsListBySolutionOptionalParams,
    ) => listBySolution(context, resourceGroupName, targetName, solutionName, options),
    delete: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      solutionVersionName: string,
      options?: SolutionVersionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, targetName, solutionName, solutionVersionName, options),
    update: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      solutionVersionName: string,
      properties: SolutionVersion,
      options?: SolutionVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        solutionVersionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      solutionVersionName: string,
      resource: SolutionVersion,
      options?: SolutionVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        solutionVersionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      solutionVersionName: string,
      options?: SolutionVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, targetName, solutionName, solutionVersionName, options),
  };
}

export function _getSolutionVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionVersionsOperations {
  return {
    ..._getSolutionVersions(context),
  };
}
