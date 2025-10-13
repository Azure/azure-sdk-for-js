// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer, $delete, createOrUpdate, get } from "../../api/databases/operations.js";
import type {
  DatabasesListByServerOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesCreateOrUpdateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type { Database } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** List all the databases in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: DatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Deletes a database. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new database or updates an existing database. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** Gets information about a database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<Database>;
}

function _getDatabases(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: DatabasesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabasesOperations(
  context: MySQLManagementFlexibleServerContext,
): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}
