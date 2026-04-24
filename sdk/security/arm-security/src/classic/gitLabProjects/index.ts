// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/gitLabProjects/operations.js";
import type {
  GitLabProjectsListOptionalParams,
  GitLabProjectsGetOptionalParams,
} from "../../api/gitLabProjects/options.js";
import type { SecurityConnectorsDevOpsAPIGitLabProject } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GitLabProjects operations. */
export interface GitLabProjectsOperations {
  /** Gets a list of GitLab projects that are directly owned by given group and onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    groupFQName: string,
    options?: GitLabProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIGitLabProject>;
  /** Returns a monitored GitLab Project resource for a given fully-qualified group name and project name. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    groupFQName: string,
    projectName: string,
    options?: GitLabProjectsGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIGitLabProject>;
}

function _getGitLabProjects(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      groupFQName: string,
      options?: GitLabProjectsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, groupFQName, options),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      groupFQName: string,
      projectName: string,
      options?: GitLabProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, groupFQName, projectName, options),
  };
}

export function _getGitLabProjectsOperations(
  context: SecurityCenterContext,
): GitLabProjectsOperations {
  return {
    ..._getGitLabProjects(context),
  };
}
