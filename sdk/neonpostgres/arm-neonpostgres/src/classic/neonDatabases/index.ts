// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext } from "../../api/postgresContext.js";
import { $delete, createOrUpdate, list } from "../../api/neonDatabases/operations.js";
import type {
  NeonDatabasesDeleteOptionalParams,
  NeonDatabasesCreateOrUpdateOptionalParams,
  NeonDatabasesListOptionalParams,
} from "../../api/neonDatabases/options.js";
import type { NeonDatabase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeonDatabases operations. */
export interface NeonDatabasesOperations {
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
  /** List NeonDatabase resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: NeonDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeonDatabase>;
}

function _getNeonDatabases(context: PostgresContext) {
  return {
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
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonDatabasesListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
  };
}

export function _getNeonDatabasesOperations(context: PostgresContext): NeonDatabasesOperations {
  return {
    ..._getNeonDatabases(context),
  };
}
