// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { get } from "../../api/maintenanceWindowOptions/operations.js";
import type { MaintenanceWindowOptionsGetOptionalParams } from "../../api/maintenanceWindowOptions/options.js";
import type { MaintenanceWindowOptions } from "../../models/models.js";

/** Interface representing a MaintenanceWindowOptions operations. */
export interface MaintenanceWindowOptionsOperations {
  /** Gets a list of available maintenance windows. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    maintenanceWindowOptionsName: string,
    options?: MaintenanceWindowOptionsGetOptionalParams,
  ) => Promise<MaintenanceWindowOptions>;
}

function _getMaintenanceWindowOptions(context: SqlContext) {
  return {
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      maintenanceWindowOptionsName: string,
      options?: MaintenanceWindowOptionsGetOptionalParams,
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

export function _getMaintenanceWindowOptionsOperations(
  context: SqlContext,
): MaintenanceWindowOptionsOperations {
  return {
    ..._getMaintenanceWindowOptions(context),
  };
}
