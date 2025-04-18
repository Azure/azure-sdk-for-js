// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Branch } from "../../models/models.js";
import {
  BranchesListOptionalParams,
  BranchesDeleteOptionalParams,
  BranchesUpdateOptionalParams,
  BranchesCreateOrUpdateOptionalParams,
  BranchesGetOptionalParams,
} from "../../api/branches/options.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/branches/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Branches operations. */
export interface BranchesOperations {
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
  /** Update a Branch */
  update: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    properties: Branch,
    options?: BranchesUpdateOptionalParams,
  ) => PollerLike<OperationState<Branch>, Branch>;
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
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: BranchesListOptionalParams,
    ) =>
      list(context, resourceGroupName, organizationName, projectName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: BranchesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      properties: Branch,
      options?: BranchesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        properties,
        options,
      ),
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
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
  };
}

export function _getBranchesOperations(
  context: PostgresContext,
): BranchesOperations {
  return {
    ..._getBranches(context),
  };
}
