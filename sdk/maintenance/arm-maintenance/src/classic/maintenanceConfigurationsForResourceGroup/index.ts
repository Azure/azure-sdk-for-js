// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { MaintenanceConfiguration } from "../../models/models.js";
import { MaintenanceConfigurationsForResourceGroupListOptionalParams } from "../../api/maintenanceConfigurationsForResourceGroup/options.js";
import { list } from "../../api/maintenanceConfigurationsForResourceGroup/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MaintenanceConfigurationsForResourceGroup operations. */
export interface MaintenanceConfigurationsForResourceGroupOperations {
  /** Get Configuration records within a subscription and resource group */
  list: (
    resourceGroupName: string,
    options?: MaintenanceConfigurationsForResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceConfiguration>;
}

function _getMaintenanceConfigurationsForResourceGroup(context: MaintenanceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      options?: MaintenanceConfigurationsForResourceGroupListOptionalParams,
    ) => list(context, resourceGroupName, options),
  };
}

export function _getMaintenanceConfigurationsForResourceGroupOperations(
  context: MaintenanceManagementContext,
): MaintenanceConfigurationsForResourceGroupOperations {
  return {
    ..._getMaintenanceConfigurationsForResourceGroup(context),
  };
}
