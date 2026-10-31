// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/extendedDatabaseBlobAuditingPolicies/operations.js";
import type {
  ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams,
} from "../../api/extendedDatabaseBlobAuditingPolicies/options.js";
import type { ExtendedDatabaseBlobAuditingPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtendedDatabaseBlobAuditingPolicies operations. */
export interface ExtendedDatabaseBlobAuditingPoliciesOperations {
  /** Lists extended auditing settings of a database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ExtendedDatabaseBlobAuditingPolicy>;
  /** Creates or updates an extended database's blob auditing policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: ExtendedDatabaseBlobAuditingPolicy,
    options?: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ExtendedDatabaseBlobAuditingPolicy>;
  /** Gets an extended database's blob auditing policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams,
  ) => Promise<ExtendedDatabaseBlobAuditingPolicy>;
}

function _getExtendedDatabaseBlobAuditingPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      parameters: ExtendedDatabaseBlobAuditingPolicy,
      options?: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, databaseName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getExtendedDatabaseBlobAuditingPoliciesOperations(
  context: SqlManagementContext,
): ExtendedDatabaseBlobAuditingPoliciesOperations {
  return {
    ..._getExtendedDatabaseBlobAuditingPolicies(context),
  };
}
