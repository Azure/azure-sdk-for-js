// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { NeonDatabase } from "../../models/models.js";
import {
  NeonDatabasesListOptionalParams,
  NeonDatabasesDeleteOptionalParams,
  NeonDatabasesUpdateOptionalParams,
  NeonDatabasesCreateOrUpdateOptionalParams,
  NeonDatabasesGetOptionalParams,
} from "../../api/neonDatabases/options.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/neonDatabases/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeonDatabases operations. */
export interface NeonDatabasesOperations {
  /** List NeonDatabase resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: NeonDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeonDatabase>;
  /** Delete a NeonDatabase */
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
    neonDatabaseName: string,
    options?: NeonDatabasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a NeonDatabase */
  update: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonDatabaseName: string,
    properties: NeonDatabase,
    options?: NeonDatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<NeonDatabase>, NeonDatabase>;
  /** Create a NeonDatabase */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonDatabaseName: string,
    resource: NeonDatabase,
    options?: NeonDatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NeonDatabase>, NeonDatabase>;
  /** Get a NeonDatabase */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    neonDatabaseName: string,
    options?: NeonDatabasesGetOptionalParams,
  ) => Promise<NeonDatabase>;
}

function _getNeonDatabases(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonDatabasesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonDatabaseName: string,
      options?: NeonDatabasesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonDatabaseName: string,
      properties: NeonDatabase,
      options?: NeonDatabasesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonDatabaseName: string,
      resource: NeonDatabase,
      options?: NeonDatabasesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      neonDatabaseName: string,
      options?: NeonDatabasesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonDatabaseName,
        options,
      ),
  };
}

export function _getNeonDatabasesOperations(context: PostgresContext): NeonDatabasesOperations {
  return {
    ..._getNeonDatabases(context),
  };
}
