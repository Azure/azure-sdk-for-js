// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { NeonRole } from "../../models/models.js";
import { NeonRolesListOptionalParams } from "../../api/neonRoles/options.js";
import { list } from "../../api/neonRoles/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NeonRoles operations. */
export interface NeonRolesOperations {
  /** List NeonRole resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: NeonRolesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeonRole>;
}

function _getNeonRoles(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: NeonRolesListOptionalParams,
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

export function _getNeonRolesOperations(
  context: PostgresContext,
): NeonRolesOperations {
  return {
    ..._getNeonRoles(context),
  };
}
