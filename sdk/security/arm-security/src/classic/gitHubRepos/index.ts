// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/gitHubRepos/operations.js";
import type {
  GitHubReposListOptionalParams,
  GitHubReposGetOptionalParams,
} from "../../api/gitHubRepos/options.js";
import type { GitHubRepository } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GitHubRepos operations. */
export interface GitHubReposOperations {
  /** Returns a list of GitHub repositories onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    options?: GitHubReposListOptionalParams,
  ) => PagedAsyncIterableIterator<GitHubRepository>;
  /** Returns a monitored GitHub repository. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    repoName: string,
    options?: GitHubReposGetOptionalParams,
  ) => Promise<GitHubRepository>;
}

function _getGitHubRepos(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      options?: GitHubReposListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, ownerName, options),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      repoName: string,
      options?: GitHubReposGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, ownerName, repoName, options),
  };
}

export function _getGitHubReposOperations(context: SecurityCenterContext): GitHubReposOperations {
  return {
    ..._getGitHubRepos(context),
  };
}
