// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupProtectableItems/operations.js";
import { BackupProtectableItemsListOptionalParams } from "../../api/backupProtectableItems/options.js";
import { WorkloadProtectableItemResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupProtectableItems operations. */
export interface BackupProtectableItemsOperations {
  /**
   * Provides a pageable list of protectable objects within your subscription according to the query filter and the
   * pagination parameters.
   */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupProtectableItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadProtectableItemResource>;
}

function _getBackupProtectableItems(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupProtectableItemsListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupProtectableItemsOperations(
  context: RecoveryServicesBackupContext,
): BackupProtectableItemsOperations {
  return {
    ..._getBackupProtectableItems(context),
  };
}
