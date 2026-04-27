// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupProtectionIntent/operations.js";
import type { BackupProtectionIntentListOptionalParams } from "../../api/backupProtectionIntent/options.js";
import type { ProtectionIntentResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupProtectionIntent operations. */
export interface BackupProtectionIntentOperations {
  /** Provides a pageable list of all intents that are present within a vault. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupProtectionIntentListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionIntentResource>;
}

function _getBackupProtectionIntent(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupProtectionIntentListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupProtectionIntentOperations(
  context: RecoveryServicesBackupContext,
): BackupProtectionIntentOperations {
  return {
    ..._getBackupProtectionIntent(context),
  };
}
