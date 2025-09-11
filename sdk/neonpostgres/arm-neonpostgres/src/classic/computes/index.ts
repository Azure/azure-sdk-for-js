// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext } from "../../api/postgresContext.js";
import { list } from "../../api/computes/operations.js";
import type { ComputesListOptionalParams } from "../../api/computes/options.js";
import type { Compute } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
  };
}

export function _getComputesOperations(context: PostgresContext): ComputesOperations {
  return {
    ..._getComputes(context),
  };
}
