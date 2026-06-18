// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/backupStatus/operations.js";
import { BackupStatusGetOptionalParams } from "../../api/backupStatus/options.js";
import { BackupStatusRequest, BackupStatusResponse } from "../../models/models.js";

/** Interface representing a BackupStatus operations. */
export interface BackupStatusOperations {
  /** Get the container backup status */
  get: (
    azureRegion: string,
    parameters: BackupStatusRequest,
    options?: BackupStatusGetOptionalParams,
  ) => Promise<BackupStatusResponse>;
}

function _getBackupStatus(context: RecoveryServicesBackupContext) {
  return {
    get: (
      azureRegion: string,
      parameters: BackupStatusRequest,
      options?: BackupStatusGetOptionalParams,
    ) => get(context, azureRegion, parameters, options),
  };
}

export function _getBackupStatusOperations(
  context: RecoveryServicesBackupContext,
): BackupStatusOperations {
  return {
    ..._getBackupStatus(context),
  };
}
