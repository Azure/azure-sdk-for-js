// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list, get } from "../../api/backupEngines/operations.js";
import {
  BackupEnginesListOptionalParams,
  BackupEnginesGetOptionalParams,
} from "../../api/backupEngines/options.js";
import { BackupEngineBaseResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupEngines operations. */
export interface BackupEnginesOperations {
  /** Backup management servers registered to Recovery Services Vault. Returns a pageable list of servers. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupEnginesListOptionalParams,
  ) => PagedAsyncIterableIterator<BackupEngineBaseResource>;
  /** Returns backup management server registered to Recovery Services Vault. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    backupEngineName: string,
    options?: BackupEnginesGetOptionalParams,
  ) => Promise<BackupEngineBaseResource>;
}

function _getBackupEngines(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupEnginesListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      backupEngineName: string,
      options?: BackupEnginesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, backupEngineName, options),
  };
}

export function _getBackupEnginesOperations(
  context: RecoveryServicesBackupContext,
): BackupEnginesOperations {
  return {
    ..._getBackupEngines(context),
  };
}
