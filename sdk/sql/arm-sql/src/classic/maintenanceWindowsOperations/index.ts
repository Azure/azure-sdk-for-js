// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { createOrUpdate, get } from "../../api/maintenanceWindowsOperations/operations.js";
import type {
  MaintenanceWindowsOperationsCreateOrUpdateOptionalParams,
  MaintenanceWindowsOperationsGetOptionalParams,
} from "../../api/maintenanceWindowsOperations/options.js";
import type { MaintenanceWindows } from "../../models/models.js";

/** Interface representing a MaintenanceWindowsOperations operations. */
export interface MaintenanceWindowsOperationsOperations {
  /** Sets maintenance windows settings for a database. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    parameters: MaintenanceWindows,
    options?: MaintenanceWindowsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets maintenance windows settings for a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsOperationsGetOptionalParams,
  ) => Promise<MaintenanceWindows>;
}

function _getMaintenanceWindowsOperations(context: SqlManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      maintenanceWindowName: string,
      parameters: MaintenanceWindows,
      options?: MaintenanceWindowsOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        maintenanceWindowName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      maintenanceWindowName: string,
      options?: MaintenanceWindowsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, maintenanceWindowName, options),
  };
}

export function _getMaintenanceWindowsOperationsOperations(
  context: SqlManagementContext,
): MaintenanceWindowsOperationsOperations {
  return {
    ..._getMaintenanceWindowsOperations(context),
  };
}
