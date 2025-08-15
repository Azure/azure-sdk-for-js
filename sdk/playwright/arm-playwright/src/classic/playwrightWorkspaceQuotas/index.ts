// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext } from "../../api/playwrightManagementContext.js";
import { listByPlaywrightWorkspace, get } from "../../api/playwrightWorkspaceQuotas/operations.js";
import {
  PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  PlaywrightWorkspaceQuotasGetOptionalParams,
} from "../../api/playwrightWorkspaceQuotas/options.js";
import { QuotaName, PlaywrightWorkspaceQuota } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PlaywrightWorkspaceQuotas operations. */
export interface PlaywrightWorkspaceQuotasOperations {
  /** Lists quota resources for a given Playwright workspace. */
  listByPlaywrightWorkspace: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    options?: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<PlaywrightWorkspaceQuota>;
  /** Gets a Playwright workspace quota resource by name. */
  get: (
    resourceGroupName: string,
    playwrightWorkspaceName: string,
    quotaName: QuotaName,
    options?: PlaywrightWorkspaceQuotasGetOptionalParams,
  ) => Promise<PlaywrightWorkspaceQuota>;
}

function _getPlaywrightWorkspaceQuotas(context: PlaywrightManagementContext) {
  return {
    listByPlaywrightWorkspace: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      options?: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOptionalParams,
    ) => listByPlaywrightWorkspace(context, resourceGroupName, playwrightWorkspaceName, options),
    get: (
      resourceGroupName: string,
      playwrightWorkspaceName: string,
      quotaName: QuotaName,
      options?: PlaywrightWorkspaceQuotasGetOptionalParams,
    ) => get(context, resourceGroupName, playwrightWorkspaceName, quotaName, options),
  };
}

export function _getPlaywrightWorkspaceQuotasOperations(
  context: PlaywrightManagementContext,
): PlaywrightWorkspaceQuotasOperations {
  return {
    ..._getPlaywrightWorkspaceQuotas(context),
  };
}
