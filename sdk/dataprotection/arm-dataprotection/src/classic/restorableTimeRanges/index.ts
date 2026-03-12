// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { find } from "../../api/restorableTimeRanges/operations.js";
import type { RestorableTimeRangesFindOptionalParams } from "../../api/restorableTimeRanges/options.js";
import type {
  AzureBackupFindRestorableTimeRangesRequest,
  AzureBackupFindRestorableTimeRangesResponseResource,
} from "../../models/models.js";

/** Interface representing a RestorableTimeRanges operations. */
export interface RestorableTimeRangesOperations {
  find: (
    resourceGroupName: string,
    vaultName: string,
    backupInstanceName: string,
    parameters: AzureBackupFindRestorableTimeRangesRequest,
    options?: RestorableTimeRangesFindOptionalParams,
  ) => Promise<AzureBackupFindRestorableTimeRangesResponseResource>;
}

function _getRestorableTimeRanges(context: DataProtectionContext) {
  return {
    find: (
      resourceGroupName: string,
      vaultName: string,
      backupInstanceName: string,
      parameters: AzureBackupFindRestorableTimeRangesRequest,
      options?: RestorableTimeRangesFindOptionalParams,
    ) => find(context, resourceGroupName, vaultName, backupInstanceName, parameters, options),
  };
}

export function _getRestorableTimeRangesOperations(
  context: DataProtectionContext,
): RestorableTimeRangesOperations {
  return {
    ..._getRestorableTimeRanges(context),
  };
}
