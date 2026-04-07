// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { update, get } from "../../api/databaseAutomaticTuning/operations.js";
import type {
  DatabaseAutomaticTuningUpdateOptionalParams,
  DatabaseAutomaticTuningGetOptionalParams,
} from "../../api/databaseAutomaticTuning/options.js";
import type { DatabaseAutomaticTuning } from "../../models/models.js";

/** Interface representing a DatabaseAutomaticTuning operations. */
export interface DatabaseAutomaticTuningOperations {
  /** Update automatic tuning properties for target database. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseAutomaticTuning,
    options?: DatabaseAutomaticTuningUpdateOptionalParams,
  ) => Promise<DatabaseAutomaticTuning>;
  /** Gets a database's automatic tuning. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseAutomaticTuningGetOptionalParams,
  ) => Promise<DatabaseAutomaticTuning>;
}

function _getDatabaseAutomaticTuning(context: SqlContext) {
  return {
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseAutomaticTuning,
      options?: DatabaseAutomaticTuningUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseAutomaticTuningGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabaseAutomaticTuningOperations(
  context: SqlContext,
): DatabaseAutomaticTuningOperations {
  return {
    ..._getDatabaseAutomaticTuning(context),
  };
}
