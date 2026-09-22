// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupProtectionContainers/operations.js";
import type { BackupProtectionContainersListOptionalParams } from "../../api/backupProtectionContainers/options.js";
import type { ProtectionContainerResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupProtectionContainers operations. */
export interface BackupProtectionContainersOperations {
  /** Lists the containers registered to Recovery Services Vault. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupProtectionContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainerResource>;
}

function _getBackupProtectionContainers(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupProtectionContainersListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupProtectionContainersOperations(
  context: RecoveryServicesBackupContext,
): BackupProtectionContainersOperations {
  return {
    ..._getBackupProtectionContainers(context),
  };
}
