// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { listRepositories } from "../../api/sourceControlOperations/operations.js";
import type { SourceControlOperationsListRepositoriesOptionalParams } from "../../api/sourceControlOperations/options.js";
import type { RepositoryAccessProperties, Repo } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControlOperations operations. */
export interface SourceControlOperationsOperations {
  /** Gets a list of repositories metadata. */
  listRepositories: (
    resourceGroupName: string,
    workspaceName: string,
    repositoryAccess: RepositoryAccessProperties,
    options?: SourceControlOperationsListRepositoriesOptionalParams,
  ) => PagedAsyncIterableIterator<Repo>;
}

function _getSourceControlOperations(context: SecurityInsightsContext) {
  return {
    listRepositories: (
      resourceGroupName: string,
      workspaceName: string,
      repositoryAccess: RepositoryAccessProperties,
      options?: SourceControlOperationsListRepositoriesOptionalParams,
    ) => listRepositories(context, resourceGroupName, workspaceName, repositoryAccess, options),
  };
}

export function _getSourceControlOperationsOperations(
  context: SecurityInsightsContext,
): SourceControlOperationsOperations {
  return {
    ..._getSourceControlOperations(context),
  };
}
