// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/deletedProtectionContainers/operations.js";
import type { DeletedProtectionContainersListOptionalParams } from "../../api/deletedProtectionContainers/options.js";
import type { ProtectionContainerResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedProtectionContainers operations. */
export interface DeletedProtectionContainersOperations {
  /** Lists the soft deleted containers registered to Recovery Services Vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: DeletedProtectionContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectionContainerResource>;
}

function _getDeletedProtectionContainers(context: RecoveryServicesBackupContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: DeletedProtectionContainersListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
  };
}

export function _getDeletedProtectionContainersOperations(
  context: RecoveryServicesBackupContext,
): DeletedProtectionContainersOperations {
  return {
    ..._getDeletedProtectionContainers(context),
  };
}
