// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { find } from "../../api/restorableTimeRangesFromDppCrossTenantVault/operations.js";
import type { RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams } from "../../api/restorableTimeRangesFromDppCrossTenantVault/options.js";
import type {
  AzureBackupFindRestorableTimeRangesRequest,
  AzureBackupFindRestorableTimeRangesResponseResource,
} from "../../models/models.js";

/** Interface representing a RestorableTimeRangesFromDppCrossTenantVault operations. */
export interface RestorableTimeRangesFromDppCrossTenantVaultOperations {
  /** Finds the restorable time ranges for a backup instance of the mapped source vault in a different tenant. */
  find: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    body: AzureBackupFindRestorableTimeRangesRequest,
    options?: RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams,
  ) => Promise<AzureBackupFindRestorableTimeRangesResponseResource>;
}

function _getRestorableTimeRangesFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    find: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      body: AzureBackupFindRestorableTimeRangesRequest,
      options?: RestorableTimeRangesFromDppCrossTenantVaultFindOptionalParams,
    ) =>
      find(context, resourceGroupName, vaultName, mappingName, backupInstanceName, body, options),
  };
}

export function _getRestorableTimeRangesFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): RestorableTimeRangesFromDppCrossTenantVaultOperations {
  return {
    ..._getRestorableTimeRangesFromDppCrossTenantVault(context),
  };
}
