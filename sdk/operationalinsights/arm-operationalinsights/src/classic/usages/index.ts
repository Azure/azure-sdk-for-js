// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { list } from "../../api/usages/operations.js";
import { UsagesListOptionalParams } from "../../api/usages/options.js";
import { UsageMetric } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets a list of usage metrics for a workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: UsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<UsageMetric>;
}

function _getUsages(context: OperationalInsightsManagementContext) {
  return {
    list: (resourceGroupName: string, workspaceName: string, options?: UsagesListOptionalParams) =>
      list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getUsagesOperations(
  context: OperationalInsightsManagementContext,
): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
