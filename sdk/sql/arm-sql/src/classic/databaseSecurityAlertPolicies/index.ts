// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/databaseSecurityAlertPolicies/operations.js";
import type {
  DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  DatabaseSecurityAlertPoliciesGetOptionalParams,
} from "../../api/databaseSecurityAlertPolicies/options.js";
import type { DatabaseSecurityAlertPolicy, SecurityAlertPolicyName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseSecurityAlertPolicies operations. */
export interface DatabaseSecurityAlertPoliciesOperations {
  /** Gets a list of database's security alert policies. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseSecurityAlertPolicy>;
  /** Creates or updates a database's security alert policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: DatabaseSecurityAlertPolicy,
    options?: DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseSecurityAlertPolicy>;
  /** Gets a database's security alert policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    options?: DatabaseSecurityAlertPoliciesGetOptionalParams,
  ) => Promise<DatabaseSecurityAlertPolicy>;
}

function _getDatabaseSecurityAlertPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: DatabaseSecurityAlertPolicy,
      options?: DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      options?: DatabaseSecurityAlertPoliciesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, serverName, databaseName, securityAlertPolicyName, options),
  };
}

export function _getDatabaseSecurityAlertPoliciesOperations(
  context: SqlManagementContext,
): DatabaseSecurityAlertPoliciesOperations {
  return {
    ..._getDatabaseSecurityAlertPolicies(context),
  };
}
