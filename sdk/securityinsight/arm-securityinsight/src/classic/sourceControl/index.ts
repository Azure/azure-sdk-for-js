// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { listRepositories } from "../../api/sourceControl/operations.js";
import { SourceControlListRepositoriesOptionalParams } from "../../api/sourceControl/options.js";
import { RepositoryAccessProperties, Repo } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControl operations. */
export interface SourceControlOperations {
  /** Gets a list of repositories metadata. */
  listRepositories: (
    resourceGroupName: string,
    workspaceName: string,
    repositoryAccess: RepositoryAccessProperties,
    options?: SourceControlListRepositoriesOptionalParams,
  ) => PagedAsyncIterableIterator<Repo>;
}

function _getSourceControl(context: SecurityInsightsContext) {
  return {
    listRepositories: (
      resourceGroupName: string,
      workspaceName: string,
      repositoryAccess: RepositoryAccessProperties,
      options?: SourceControlListRepositoriesOptionalParams,
    ) => listRepositories(context, resourceGroupName, workspaceName, repositoryAccess, options),
  };
}

export function _getSourceControlOperations(
  context: SecurityInsightsContext,
): SourceControlOperations {
  return {
    ..._getSourceControl(context),
  };
}
