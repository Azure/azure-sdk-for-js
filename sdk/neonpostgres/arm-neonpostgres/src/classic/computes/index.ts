// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Compute } from "../../models/models.js";
import {
  ComputesListOptionalParams,
  ComputesDeleteOptionalParams,
  ComputesUpdateOptionalParams,
  ComputesCreateOrUpdateOptionalParams,
  ComputesGetOptionalParams,
} from "../../api/computes/options.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/computes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Computes operations. */
export interface ComputesOperations {
  /** List Compute resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: ComputesListOptionalParams,
  ) => PagedAsyncIterableIterator<Compute>;
  /** Delete a Compute */
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
    computeName: string,
    options?: ComputesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Compute */
  update: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    computeName: string,
    properties: Compute,
    options?: ComputesUpdateOptionalParams,
  ) => PollerLike<OperationState<Compute>, Compute>;
  /** Create a Compute */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    computeName: string,
    resource: Compute,
    options?: ComputesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Compute>, Compute>;
  /** Get a Compute */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    computeName: string,
    options?: ComputesGetOptionalParams,
  ) => Promise<Compute>;
}

function _getComputes(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: ComputesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      computeName: string,
      options?: ComputesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        computeName,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      computeName: string,
      properties: Compute,
      options?: ComputesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        computeName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      computeName: string,
      resource: Compute,
      options?: ComputesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        computeName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      computeName: string,
      options?: ComputesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        computeName,
        options,
      ),
  };
}

export function _getComputesOperations(context: PostgresContext): ComputesOperations {
  return {
    ..._getComputes(context),
  };
}
