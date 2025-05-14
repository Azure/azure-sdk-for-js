// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { NeonDatabase } from "../../models/models.js";
import { NeonDatabasesListOptionalParams } from "../../api/neonDatabases/options.js";
import { list } from "../../api/neonDatabases/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
}

function _getNeonDatabases(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonDatabasesListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
  };
}

export function _getNeonDatabasesOperations(
  context: PostgresContext,
): NeonDatabasesOperations {
  return {
    ..._getNeonDatabases(context),
  };
}
