// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { get } from "../../api/managedDatabaseRestoreDetails/operations.js";
import type { ManagedDatabaseRestoreDetailsGetOptionalParams } from "../../api/managedDatabaseRestoreDetails/options.js";
import type {
  ManagedDatabaseRestoreDetailsResult,
  RestoreDetailsName,
} from "../../models/models.js";

/** Interface representing a ManagedDatabaseRestoreDetails operations. */
export interface ManagedDatabaseRestoreDetailsOperations {
  /** Gets managed database restore details. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    restoreDetailsName: RestoreDetailsName,
    options?: ManagedDatabaseRestoreDetailsGetOptionalParams,
  ) => Promise<ManagedDatabaseRestoreDetailsResult>;
}

function _getManagedDatabaseRestoreDetails(context: SqlManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      databaseName: string,
      restoreDetailsName: RestoreDetailsName,
      options?: ManagedDatabaseRestoreDetailsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        restoreDetailsName,
        options,
      ),
  };
}

export function _getManagedDatabaseRestoreDetailsOperations(
  context: SqlManagementContext,
): ManagedDatabaseRestoreDetailsOperations {
  return {
    ..._getManagedDatabaseRestoreDetails(context),
  };
}
