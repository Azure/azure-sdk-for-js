// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/protectableContainers/operations.js";
import { ProtectableContainersListOptionalParams } from "../../api/protectableContainers/options.js";
import { ProtectableContainerResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProtectableContainers operations. */
export interface ProtectableContainersOperations {
  /** Lists the containers that can be registered to Recovery Services Vault. */
  list: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    options?: ProtectableContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectableContainerResource>;
}

function _getProtectableContainers(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      options?: ProtectableContainersListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, fabricName, options),
  };
}

export function _getProtectableContainersOperations(
  context: RecoveryServicesBackupContext,
): ProtectableContainersOperations {
  return {
    ..._getProtectableContainers(context),
  };
}
