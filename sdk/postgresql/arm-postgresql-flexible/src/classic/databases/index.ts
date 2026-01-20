// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer, $delete, create, get } from "../../api/databases/operations.js";
import type {
  DatabasesListByServerOptionalParams,
  DatabasesDeleteOptionalParams,
  DatabasesCreateOptionalParams,
  DatabasesGetOptionalParams,
} from "../../api/databases/options.js";
import type { Database } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Databases operations. */
export interface DatabasesOperations {
  /** Lists all databases in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: DatabasesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Database>;
  /** Deletes an existing database. */
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
  /** Creates a new database. */
  create: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: Database,
    options?: DatabasesCreateOptionalParams,
  ) => PollerLike<OperationState<Database>, Database>;
  /** Gets information about an existing database. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabasesGetOptionalParams,
  ) => Promise<Database>;
}

function _getDatabases(context: PostgreSQLManagementFlexibleServerContext) {
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
    create: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: Database,
      options?: DatabasesCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabasesOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): DatabasesOperations {
  return {
    ..._getDatabases(context),
  };
}
