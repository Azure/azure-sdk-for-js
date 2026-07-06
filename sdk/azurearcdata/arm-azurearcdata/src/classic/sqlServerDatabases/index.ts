// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import { list, $delete, update, create, get } from "../../api/sqlServerDatabases/operations.js";
import type {
  SqlServerDatabasesListOptionalParams,
  SqlServerDatabasesDeleteOptionalParams,
  SqlServerDatabasesUpdateOptionalParams,
  SqlServerDatabasesCreateOptionalParams,
  SqlServerDatabasesGetOptionalParams,
} from "../../api/sqlServerDatabases/options.js";
import type { SqlServerDatabaseResource, SqlServerDatabaseUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlServerDatabases operations. */
export interface SqlServerDatabasesOperations {
  /** List the databases associated with the given Arc Sql Server. */
  list: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    options?: SqlServerDatabasesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerDatabaseResource>;
  /** Deletes an Arc Sql Server database resource. */
  delete: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    databaseName: string,
    options?: SqlServerDatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing database. */
  update: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    databaseName: string,
    sqlServerDatabaseUpdate: SqlServerDatabaseUpdate,
    options?: SqlServerDatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlServerDatabaseResource>, SqlServerDatabaseResource>;
  /** Creates or replaces an Arc Sql Server Database. */
  create: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    databaseName: string,
    sqlServerDatabaseResource: SqlServerDatabaseResource,
    options?: SqlServerDatabasesCreateOptionalParams,
  ) => Promise<SqlServerDatabaseResource>;
  /** Retrieves an Arc Sql Server database. */
  get: (
    resourceGroupName: string,
    sqlServerInstanceName: string,
    databaseName: string,
    options?: SqlServerDatabasesGetOptionalParams,
  ) => Promise<SqlServerDatabaseResource>;
}

function _getSqlServerDatabases(context: AzureArcDataContext) {
  return {
    list: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      options?: SqlServerDatabasesListOptionalParams,
    ) => list(context, resourceGroupName, sqlServerInstanceName, options),
    delete: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      databaseName: string,
      options?: SqlServerDatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlServerInstanceName, databaseName, options),
    update: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      databaseName: string,
      sqlServerDatabaseUpdate: SqlServerDatabaseUpdate,
      options?: SqlServerDatabasesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        databaseName,
        sqlServerDatabaseUpdate,
        options,
      ),
    create: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      databaseName: string,
      sqlServerDatabaseResource: SqlServerDatabaseResource,
      options?: SqlServerDatabasesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        sqlServerInstanceName,
        databaseName,
        sqlServerDatabaseResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      sqlServerInstanceName: string,
      databaseName: string,
      options?: SqlServerDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlServerInstanceName, databaseName, options),
  };
}

export function _getSqlServerDatabasesOperations(
  context: AzureArcDataContext,
): SqlServerDatabasesOperations {
  return {
    ..._getSqlServerDatabases(context),
  };
}
