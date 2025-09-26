// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { undelete, list, get } from "../../api/deletedBackupInstances/operations.js";
import type {
  DeletedBackupInstancesUndeleteOptionalParams,
  DeletedBackupInstancesListOptionalParams,
  DeletedBackupInstancesGetOptionalParams,
} from "../../api/deletedBackupInstances/options.js";
import type { DeletedBackupInstanceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeletedBackupInstances operations. */
export interface DeletedBackupInstancesOperations {
  /** A long-running resource action. */
  undelete: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: DeletedBackupInstancesUndeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets deleted backup instances belonging to a backup vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: DeletedBackupInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedBackupInstanceResource>;
  /** Gets a deleted backup instance with name in a backup vault */
  get: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    options?: DeletedBackupInstancesGetOptionalParams,
  ) => Promise<DeletedBackupInstanceResource>;
}

function _getDeletedBackupInstances(context: DataProtectionContext) {
  return {
    undelete: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: DeletedBackupInstancesUndeleteOptionalParams,
    ) => undelete(context, resourceGroupName, vaultName, backupInstanceName, options),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: DeletedBackupInstancesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      options?: DeletedBackupInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, backupInstanceName, options),
  };
}

export function _getDeletedBackupInstancesOperations(
  context: DataProtectionContext,
): DeletedBackupInstancesOperations {
  return {
    ..._getDeletedBackupInstances(context),
  };
}
