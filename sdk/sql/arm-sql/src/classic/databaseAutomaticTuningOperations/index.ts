// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { update, get } from "../../api/databaseAutomaticTuningOperations/operations.js";
import type {
  DatabaseAutomaticTuningOperationsUpdateOptionalParams,
  DatabaseAutomaticTuningOperationsGetOptionalParams,
} from "../../api/databaseAutomaticTuningOperations/options.js";
import type { DatabaseAutomaticTuning } from "../../models/models.js";

/** Interface representing a DatabaseAutomaticTuningOperations operations. */
export interface DatabaseAutomaticTuningOperationsOperations {
  /** Update automatic tuning properties for target database. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseAutomaticTuning,
    options?: DatabaseAutomaticTuningOperationsUpdateOptionalParams,
  ) => Promise<DatabaseAutomaticTuning>;
  /** Gets a database's automatic tuning. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseAutomaticTuningOperationsGetOptionalParams,
  ) => Promise<DatabaseAutomaticTuning>;
}

function _getDatabaseAutomaticTuningOperations(context: SqlManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseAutomaticTuning,
      options?: DatabaseAutomaticTuningOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseAutomaticTuningOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabaseAutomaticTuningOperationsOperations(
  context: SqlManagementContext,
): DatabaseAutomaticTuningOperationsOperations {
  return {
    ..._getDatabaseAutomaticTuningOperations(context),
  };
}
