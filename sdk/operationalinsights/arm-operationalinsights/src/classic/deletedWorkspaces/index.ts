// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { listByResourceGroup, list } from "../../api/deletedWorkspaces/operations.js";
import type {
  DeletedWorkspacesListByResourceGroupOptionalParams,
  DeletedWorkspacesListOptionalParams,
} from "../../api/deletedWorkspaces/options.js";
import type { Workspace } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedWorkspaces operations. */
export interface DeletedWorkspacesOperations {
  /** Gets recently deleted workspaces in a resource group, available for recovery. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DeletedWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Gets recently deleted workspaces in a subscription, available for recovery. */
  list: (options?: DeletedWorkspacesListOptionalParams) => PagedAsyncIterableIterator<Workspace>;
}
function _getDeletedWorkspaces(context: OperationalInsightsManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DeletedWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (options?: DeletedWorkspacesListOptionalParams) => list(context, options),
  };
}
export function _getDeletedWorkspacesOperations(
  context: OperationalInsightsManagementContext,
): DeletedWorkspacesOperations {
  return {
    ..._getDeletedWorkspaces(context),
  };
}
