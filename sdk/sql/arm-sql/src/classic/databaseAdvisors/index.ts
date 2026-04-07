// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase, update, get } from "../../api/databaseAdvisors/operations.js";
import type {
  DatabaseAdvisorsListByDatabaseOptionalParams,
  DatabaseAdvisorsUpdateOptionalParams,
  DatabaseAdvisorsGetOptionalParams,
} from "../../api/databaseAdvisors/options.js";
import type { Advisor } from "../../models/models.js";

/** Interface representing a DatabaseAdvisors operations. */
export interface DatabaseAdvisorsOperations {
  /** Gets a list of database advisors. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseAdvisorsListByDatabaseOptionalParams,
  ) => Promise<Advisor[]>;
  /** Updates a database advisor. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    parameters: Advisor,
    options?: DatabaseAdvisorsUpdateOptionalParams,
  ) => Promise<Advisor>;
  /** Gets a database advisor. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    options?: DatabaseAdvisorsGetOptionalParams,
  ) => Promise<Advisor>;
}

function _getDatabaseAdvisors(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseAdvisorsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advisorName: string,
      parameters: Advisor,
      options?: DatabaseAdvisorsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advisorName: string,
      options?: DatabaseAdvisorsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, advisorName, options),
  };
}

export function _getDatabaseAdvisorsOperations(context: SqlContext): DatabaseAdvisorsOperations {
  return {
    ..._getDatabaseAdvisors(context),
  };
}
