// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { listAvailable, list, get } from "../../api/gitHubOwners/operations.js";
import type {
  GitHubOwnersListAvailableOptionalParams,
  GitHubOwnersListOptionalParams,
  GitHubOwnersGetOptionalParams,
} from "../../api/gitHubOwners/options.js";
import type {
  GitHubOwner,
  GitHubOwnerListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GitHubOwners operations. */
export interface GitHubOwnersOperations {
  /** Returns a list of all GitHub owners accessible by the user token consumed by the connector. */
  listAvailable: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: GitHubOwnersListAvailableOptionalParams,
  ) => Promise<GitHubOwnerListResponse>;
  /** Returns a list of GitHub owners onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: GitHubOwnersListOptionalParams,
  ) => PagedAsyncIterableIterator<GitHubOwner>;
  /** Returns a monitored GitHub owner. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    ownerName: string,
    options?: GitHubOwnersGetOptionalParams,
  ) => Promise<GitHubOwner>;
}

function _getGitHubOwners(context: SecurityCenterContext) {
  return {
    listAvailable: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: GitHubOwnersListAvailableOptionalParams,
    ) => listAvailable(context, resourceGroupName, securityConnectorName, options),
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: GitHubOwnersListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, options),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      ownerName: string,
      options?: GitHubOwnersGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, ownerName, options),
  };
}

export function _getGitHubOwnersOperations(context: SecurityCenterContext): GitHubOwnersOperations {
  return {
    ..._getGitHubOwners(context),
  };
}
