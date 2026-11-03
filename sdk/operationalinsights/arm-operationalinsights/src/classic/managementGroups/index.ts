// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { list } from "../../api/managementGroups/operations.js";
import { ManagementGroupsListOptionalParams } from "../../api/managementGroups/options.js";
import { ManagementGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagementGroups operations. */
export interface ManagementGroupsOperations {
  /** Gets a list of management groups connected to a workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagementGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagementGroup>;
}

function _getManagementGroups(context: OperationalInsightsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagementGroupsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getManagementGroupsOperations(
  context: OperationalInsightsManagementContext,
): ManagementGroupsOperations {
  return {
    ..._getManagementGroups(context),
  };
}
