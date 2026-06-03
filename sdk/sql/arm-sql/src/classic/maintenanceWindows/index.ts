// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { createOrUpdate, get } from "../../api/maintenanceWindows/operations.js";
import type {
  MaintenanceWindowsCreateOrUpdateOptionalParams,
  MaintenanceWindowsGetOptionalParams,
} from "../../api/maintenanceWindows/options.js";
import type { MaintenanceWindows } from "../../models/models.js";

/** Interface representing a MaintenanceWindows operations. */
export interface MaintenanceWindowsOperations {
  /** Sets maintenance windows settings for a database. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    parameters: MaintenanceWindows,
    options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets maintenance windows settings for a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsGetOptionalParams,
  ) => Promise<MaintenanceWindows>;
}

function _getMaintenanceWindows(context: SqlManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      maintenanceWindowName: string,
      parameters: MaintenanceWindows,
      options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
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
      options?: MaintenanceWindowsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, maintenanceWindowName, options),
  };
}

export function _getMaintenanceWindowsOperations(
  context: SqlManagementContext,
): MaintenanceWindowsOperations {
  return {
    ..._getMaintenanceWindows(context),
  };
}
