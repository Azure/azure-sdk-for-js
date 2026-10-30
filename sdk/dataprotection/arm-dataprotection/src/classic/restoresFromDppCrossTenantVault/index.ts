// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { trigger } from "../../api/restoresFromDppCrossTenantVault/operations.js";
import type { RestoresFromDppCrossTenantVaultTriggerOptionalParams } from "../../api/restoresFromDppCrossTenantVault/options.js";
import type {
  OperationJobExtendedInfo,
  AzureBackupRestoreRequestUnion,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RestoresFromDppCrossTenantVault operations. */
export interface RestoresFromDppCrossTenantVaultOperations {
  /** Triggers restore for a backup instance of the mapped source vault in a different tenant. */
  trigger: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    body: AzureBackupRestoreRequestUnion,
    options?: RestoresFromDppCrossTenantVaultTriggerOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

function _getRestoresFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    trigger: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      body: AzureBackupRestoreRequestUnion,
      options?: RestoresFromDppCrossTenantVaultTriggerOptionalParams,
    ) =>
      trigger(
        context,
        resourceGroupName,
        vaultName,
        mappingName,
        backupInstanceName,
        body,
        options,
      ),
  };
}

export function _getRestoresFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): RestoresFromDppCrossTenantVaultOperations {
  return {
    ..._getRestoresFromDppCrossTenantVault(context),
  };
}
