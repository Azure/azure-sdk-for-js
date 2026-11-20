// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { trigger } from "../../api/validateRestoreFromDppCrossTenantVault/operations.js";
import type { ValidateRestoreFromDppCrossTenantVaultTriggerOptionalParams } from "../../api/validateRestoreFromDppCrossTenantVault/options.js";
import type {
  OperationJobExtendedInfo,
  ValidateRestoreRequestObject,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ValidateRestoreFromDppCrossTenantVault operations. */
export interface ValidateRestoreFromDppCrossTenantVaultOperations {
  /** Validates whether restore can be triggered for a backup instance of the mapped source vault in a different tenant. */
  trigger: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    backupInstanceName: string,
    body: ValidateRestoreRequestObject,
    options?: ValidateRestoreFromDppCrossTenantVaultTriggerOptionalParams,
  ) => PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}

function _getValidateRestoreFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    trigger: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      backupInstanceName: string,
      body: ValidateRestoreRequestObject,
      options?: ValidateRestoreFromDppCrossTenantVaultTriggerOptionalParams,
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

export function _getValidateRestoreFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): ValidateRestoreFromDppCrossTenantVaultOperations {
  return {
    ..._getValidateRestoreFromDppCrossTenantVault(context),
  };
}
