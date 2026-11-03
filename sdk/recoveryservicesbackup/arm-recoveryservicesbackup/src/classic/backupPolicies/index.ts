// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/backupPolicies/operations.js";
import type { BackupPoliciesListOptionalParams } from "../../api/backupPolicies/options.js";
import type { ProtectionPolicyResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupPolicies operations. */
export interface BackupPoliciesOperations {
  /**
   * Lists of backup policies associated with Recovery Services Vault. API provides pagination parameters to fetch
   * scoped results.
   */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionPolicyResource>;
}

function _getBackupPolicies(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupPoliciesListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupPoliciesOperations(
  context: RecoveryServicesBackupContext,
): BackupPoliciesOperations {
  return {
    ..._getBackupPolicies(context),
  };
}
