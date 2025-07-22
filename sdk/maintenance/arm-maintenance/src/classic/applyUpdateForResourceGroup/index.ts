// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { ApplyUpdate } from "../../models/models.js";
import { ApplyUpdateForResourceGroupListOptionalParams } from "../../api/applyUpdateForResourceGroup/options.js";
import { list } from "../../api/applyUpdateForResourceGroup/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplyUpdateForResourceGroup operations. */
export interface ApplyUpdateForResourceGroupOperations {
  /** Get Configuration records within a subscription and resource group */
  list: (
    resourceGroupName: string,
    options?: ApplyUpdateForResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplyUpdate>;
}

function _getApplyUpdateForResourceGroup(context: MaintenanceManagementContext) {
  return {
    list: (resourceGroupName: string, options?: ApplyUpdateForResourceGroupListOptionalParams) =>
      list(context, resourceGroupName, options),
  };
}

export function _getApplyUpdateForResourceGroupOperations(
  context: MaintenanceManagementContext,
): ApplyUpdateForResourceGroupOperations {
  return {
    ..._getApplyUpdateForResourceGroup(context),
  };
}
