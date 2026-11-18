// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list } from "../../api/gitLabSubgroups/operations.js";
import type { GitLabSubgroupsListOptionalParams } from "../../api/gitLabSubgroups/options.js";
import type { GitLabGroupListResponse } from "../../models/securityConnectorsDevOpsAPI/models.js";

/** Interface representing a GitLabSubgroups operations. */
export interface GitLabSubgroupsOperations {
  /** Gets nested subgroups of given GitLab Group which are onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    groupFQName: string,
    options?: GitLabSubgroupsListOptionalParams,
  ) => Promise<GitLabGroupListResponse>;
}

function _getGitLabSubgroups(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      groupFQName: string,
      options?: GitLabSubgroupsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, groupFQName, options),
  };
}

export function _getGitLabSubgroupsOperations(
  context: SecurityCenterContext,
): GitLabSubgroupsOperations {
  return {
    ..._getGitLabSubgroups(context),
  };
}
