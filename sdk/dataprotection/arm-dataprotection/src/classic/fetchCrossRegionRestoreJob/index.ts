// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/fetchCrossRegionRestoreJob/operations.js";
import type { FetchCrossRegionRestoreJobGetOptionalParams } from "../../api/fetchCrossRegionRestoreJob/options.js";
import type { AzureBackupJobResource, CrossRegionRestoreJobRequest } from "../../models/models.js";

/** Interface representing a FetchCrossRegionRestoreJob operations. */
export interface FetchCrossRegionRestoreJobOperations {
  /** Fetches the Cross Region Restore Job */
  get: (
    resourceGroupName: string,
    location: string,
    parameters: CrossRegionRestoreJobRequest,
    options?: FetchCrossRegionRestoreJobGetOptionalParams,
  ) => Promise<AzureBackupJobResource>;
}

function _getFetchCrossRegionRestoreJob(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      location: string,
      parameters: CrossRegionRestoreJobRequest,
      options?: FetchCrossRegionRestoreJobGetOptionalParams,
    ) => get(context, resourceGroupName, location, parameters, options),
  };
}

export function _getFetchCrossRegionRestoreJobOperations(
  context: DataProtectionContext,
): FetchCrossRegionRestoreJobOperations {
  return {
    ..._getFetchCrossRegionRestoreJob(context),
  };
}
