// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/databaseBlobAuditingPolicies/operations.js";
import type {
  DatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  DatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  DatabaseBlobAuditingPoliciesGetOptionalParams,
} from "../../api/databaseBlobAuditingPolicies/options.js";
import type { DatabaseBlobAuditingPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseBlobAuditingPolicies operations. */
export interface DatabaseBlobAuditingPoliciesOperations {
  /** Lists auditing settings of a database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseBlobAuditingPolicy>;
  /** Creates or updates a database's blob auditing policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseBlobAuditingPolicy,
    options?: DatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseBlobAuditingPolicy>;
  /** Gets a database's blob auditing policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseBlobAuditingPoliciesGetOptionalParams,
  ) => Promise<DatabaseBlobAuditingPolicy>;
}

function _getDatabaseBlobAuditingPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: DatabaseBlobAuditingPolicy,
      options?: DatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseBlobAuditingPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getDatabaseBlobAuditingPoliciesOperations(
  context: SqlManagementContext,
): DatabaseBlobAuditingPoliciesOperations {
  return {
    ..._getDatabaseBlobAuditingPolicies(context),
  };
}
