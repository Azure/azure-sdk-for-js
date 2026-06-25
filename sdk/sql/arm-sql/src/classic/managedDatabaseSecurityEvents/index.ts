// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase } from "../../api/managedDatabaseSecurityEvents/operations.js";
import { ManagedDatabaseSecurityEventsListByDatabaseOptionalParams } from "../../api/managedDatabaseSecurityEvents/options.js";
import { SecurityEvent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedDatabaseSecurityEvents operations. */
export interface ManagedDatabaseSecurityEventsOperations {
  /** Gets a list of security events. */
  listByDatabase: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: ManagedDatabaseSecurityEventsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityEvent>;
}

function _getManagedDatabaseSecurityEvents(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      options?: ManagedDatabaseSecurityEventsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, managedInstanceName, databaseName, options),
  };
}

export function _getManagedDatabaseSecurityEventsOperations(
  context: SqlManagementContext,
): ManagedDatabaseSecurityEventsOperations {
  return {
    ..._getManagedDatabaseSecurityEvents(context),
  };
}
