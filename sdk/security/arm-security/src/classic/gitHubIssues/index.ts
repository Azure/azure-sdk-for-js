// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { create } from "../../api/gitHubIssues/operations.js";
import type { GitHubIssuesCreateOptionalParams } from "../../api/gitHubIssues/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GitHubIssues operations. */
export interface GitHubIssuesOperations {
  /** Creates a GitHub issue for the specified repository and assessment. */
  create: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    repoName: string,
    options?: GitHubIssuesCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    repoName: string,
    options?: GitHubIssuesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    repoName: string,
    options?: GitHubIssuesCreateOptionalParams,
  ) => Promise<void>;
}

function _getGitHubIssues(context: SecurityCenterContext) {
  return {
    create: (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      repoName: string,
      options?: GitHubIssuesCreateOptionalParams,
    ) => create(context, resourceGroupName, securityConnectorName, ownerName, repoName, options),
    beginCreate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      repoName: string,
      options?: GitHubIssuesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        securityConnectorName,
        ownerName,
        repoName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      repoName: string,
      options?: GitHubIssuesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        securityConnectorName,
        ownerName,
        repoName,
        options,
      );
    },
  };
}

export function _getGitHubIssuesOperations(context: SecurityCenterContext): GitHubIssuesOperations {
  return {
    ..._getGitHubIssues(context),
  };
}
