// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupProtectedItems/operations.js";
import type { BackupProtectedItemsListOptionalParams } from "../../api/backupProtectedItems/options.js";
import type { ProtectedItemResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupProtectedItems operations. */
export interface BackupProtectedItemsOperations {
  /** Provides a pageable list of all items that are backed up within a vault. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupProtectedItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectedItemResource>;
}

function _getBackupProtectedItems(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupProtectedItemsListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupProtectedItemsOperations(
  context: RecoveryServicesBackupContext,
): BackupProtectedItemsOperations {
  return {
    ..._getBackupProtectedItems(context),
  };
}
