// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/backupInstancesExtensionRouting/operations.js";
import type { BackupInstancesExtensionRoutingListOptionalParams } from "../../api/backupInstancesExtensionRouting/options.js";
import type { BackupInstanceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BackupInstancesExtensionRouting operations. */
export interface BackupInstancesExtensionRoutingOperations {
  /** Gets a list of backup instances associated with a tracked resource */
  list: (
    resourceId: string,
    options?: BackupInstancesExtensionRoutingListOptionalParams,
  ) => PagedAsyncIterableIterator<BackupInstanceResource>;
}

function _getBackupInstancesExtensionRouting(context: DataProtectionContext) {
  return {
    list: (resourceId: string, options?: BackupInstancesExtensionRoutingListOptionalParams) =>
      list(context, resourceId, options),
  };
}

export function _getBackupInstancesExtensionRoutingOperations(
  context: DataProtectionContext,
): BackupInstancesExtensionRoutingOperations {
  return {
    ..._getBackupInstancesExtensionRouting(context),
  };
}
