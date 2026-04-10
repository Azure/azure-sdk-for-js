// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  createOrUpdate,
  get,
} from "../../api/managedDatabaseSecurityAlertPolicies/operations.js";
import type {
  ManagedDatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ManagedDatabaseSecurityAlertPoliciesGetOptionalParams,
} from "../../api/managedDatabaseSecurityAlertPolicies/options.js";
import type {
  SecurityAlertPolicyName,
  ManagedDatabaseSecurityAlertPolicy,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseSecurityAlertPolicies operations. */
export interface ManagedDatabaseSecurityAlertPoliciesOperations {
  /** Gets a list of managed database's security alert policies. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedDatabaseSecurityAlertPolicy>;
  /** Creates or updates a database's security alert policy. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ManagedDatabaseSecurityAlertPolicy,
    options?: ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedDatabaseSecurityAlertPolicy>;
  /** Gets a managed database's security alert policy. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    options?: ManagedDatabaseSecurityAlertPoliciesGetOptionalParams,
  ) => Promise<ManagedDatabaseSecurityAlertPolicy>;
}

function _getManagedDatabaseSecurityAlertPolicies(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ManagedDatabaseSecurityAlertPolicy,
      options?: ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      options?: ManagedDatabaseSecurityAlertPoliciesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        securityAlertPolicyName,
        options,
      ),
  };
}

export function _getManagedDatabaseSecurityAlertPoliciesOperations(
  context: SqlManagementContext,
): ManagedDatabaseSecurityAlertPoliciesOperations {
  return {
    ..._getManagedDatabaseSecurityAlertPolicies(context),
  };
}
