// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase } from "../../api/managedDatabaseSecurityEvents/operations.js";
import type { ManagedDatabaseSecurityEventsListByDatabaseOptionalParams } from "../../api/managedDatabaseSecurityEvents/options.js";
import type { SecurityEvent } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

function _getManagedDatabaseSecurityEvents(context: SqlContext) {
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
  context: SqlContext,
): ManagedDatabaseSecurityEventsOperations {
  return {
    ..._getManagedDatabaseSecurityEvents(context),
  };
}
