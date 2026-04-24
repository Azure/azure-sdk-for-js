// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { listAvailable, list, get } from "../../api/gitLabGroups/operations.js";
import type {
  GitLabGroupsListAvailableOptionalParams,
  GitLabGroupsListOptionalParams,
  GitLabGroupsGetOptionalParams,
} from "../../api/gitLabGroups/options.js";
import type {
  SecurityConnectorsDevOpsAPIGitLabGroup,
  SecurityConnectorsDevOpsAPIGitLabGroupListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GitLabGroups operations. */
export interface GitLabGroupsOperations {
  /** Returns a list of all GitLab groups accessible by the user token consumed by the connector. */
  listAvailable: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: GitLabGroupsListAvailableOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIGitLabGroupListResponse>;
  /** Returns a list of GitLab groups onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: GitLabGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIGitLabGroup>;
  /** Returns a monitored GitLab Group resource for a given fully-qualified name. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    groupFQName: string,
    options?: GitLabGroupsGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIGitLabGroup>;
}

function _getGitLabGroups(context: SecurityCenterContext) {
  return {
    listAvailable: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: GitLabGroupsListAvailableOptionalParams,
    ) => listAvailable(context, resourceGroupName, securityConnectorName, options),
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: GitLabGroupsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, options),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      groupFQName: string,
      options?: GitLabGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, groupFQName, options),
  };
}

export function _getGitLabGroupsOperations(context: SecurityCenterContext): GitLabGroupsOperations {
  return {
    ..._getGitLabGroups(context),
  };
}
