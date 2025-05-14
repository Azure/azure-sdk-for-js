// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Compute } from "../../models/models.js";
import { ComputesListOptionalParams } from "../../api/computes/options.js";
import { list } from "../../api/computes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
}

function _getComputes(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: ComputesListOptionalParams,
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

export function _getComputesOperations(
  context: PostgresContext,
): ComputesOperations {
  return {
    ..._getComputes(context),
  };
}
