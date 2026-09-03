// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list, get } from "../../api/recoveryPoints/operations.js";
import type {
  RecoveryPointsListOptionalParams,
  RecoveryPointsGetOptionalParams,
} from "../../api/recoveryPoints/options.js";
import type { AzureBackupRecoveryPointResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPoints operations. */
export interface RecoveryPointsOperations {
  /** Returns a list of Recovery Points for a DataSource in a vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: RecoveryPointsListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureBackupRecoveryPointResource>;
  /** Gets a Recovery Point using recoveryPointId for a Datasource. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    recoveryPointId: string,
    options?: RecoveryPointsGetOptionalParams,
  ) => Promise<AzureBackupRecoveryPointResource>;
}

function _getRecoveryPoints(context: DataProtectionContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: RecoveryPointsListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, backupInstanceName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      recoveryPointId: string,
      options?: RecoveryPointsGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, backupInstanceName, recoveryPointId, options),
  };
}

export function _getRecoveryPointsOperations(
  context: DataProtectionContext,
): RecoveryPointsOperations {
  return {
    ..._getRecoveryPoints(context),
  };
}
