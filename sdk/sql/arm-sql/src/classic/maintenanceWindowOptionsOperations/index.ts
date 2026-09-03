// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { get } from "../../api/maintenanceWindowOptionsOperations/operations.js";
import type { MaintenanceWindowOptionsOperationsGetOptionalParams } from "../../api/maintenanceWindowOptionsOperations/options.js";
import type { MaintenanceWindowOptions } from "../../models/models.js";

/** Interface representing a MaintenanceWindowOptionsOperations operations. */
export interface MaintenanceWindowOptionsOperationsOperations {
  /** Gets a list of available maintenance windows. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowOptionsName: string,
    options?: MaintenanceWindowOptionsOperationsGetOptionalParams,
  ) => Promise<MaintenanceWindowOptions>;
}

function _getMaintenanceWindowOptionsOperations(context: SqlManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      maintenanceWindowOptionsName: string,
      options?: MaintenanceWindowOptionsOperationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        maintenanceWindowOptionsName,
        options,
      ),
  };
}

export function _getMaintenanceWindowOptionsOperationsOperations(
  context: SqlManagementContext,
): MaintenanceWindowOptionsOperationsOperations {
  return {
    ..._getMaintenanceWindowOptionsOperations(context),
  };
}
