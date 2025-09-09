// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext } from "../../api/postgresContext.js";
import { preflight, list, $delete, createOrUpdate, get } from "../../api/branches/operations.js";
import type {
  BranchesPreflightOptionalParams,
  BranchesListOptionalParams,
  BranchesDeleteOptionalParams,
  BranchesCreateOrUpdateOptionalParams,
  BranchesGetOptionalParams,
} from "../../api/branches/options.js";
import type {
  Branch,
  PreflightCheckParameters,
  PreflightCheckResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Branches operations. */
export interface BranchesOperations {
  /** Action to validate preflight checks. */
  preflight: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    parameters: PreflightCheckParameters,
    options?: BranchesPreflightOptionalParams,
  ) => Promise<PreflightCheckResult>;
  /** List Branch resources by Project */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: BranchesListOptionalParams,
  ) => PagedAsyncIterableIterator<Branch>;
  /** Delete a Branch */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: BranchesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a Branch */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    resource: Branch,
    options?: BranchesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Branch>, Branch>;
  /** Get a Branch */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: BranchesGetOptionalParams,
  ) => Promise<Branch>;
}

function _getBranches(context: PostgresContext) {
  return {
    preflight: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      parameters: PreflightCheckParameters,
      options?: BranchesPreflightOptionalParams,
    ) =>
      preflight(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        parameters,
        options,
      ),
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: BranchesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: BranchesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, projectName, branchName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      resource: Branch,
      options?: BranchesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: BranchesGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, projectName, branchName, options),
  };
}

export function _getBranchesOperations(context: PostgresContext): BranchesOperations {
  return {
    ..._getBranches(context),
  };
}
