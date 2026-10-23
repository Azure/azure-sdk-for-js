// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/jobFromDppCrossTenantVault/operations.js";
import type { JobFromDppCrossTenantVaultGetOptionalParams } from "../../api/jobFromDppCrossTenantVault/options.js";
import type { AzureBackupJobResource } from "../../models/models.js";

/** Interface representing a JobFromDppCrossTenantVault operations. */
export interface JobFromDppCrossTenantVaultOperations {
  /** Gets a job of the mapped source vault in a different tenant. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    jobId: string,
    options?: JobFromDppCrossTenantVaultGetOptionalParams,
  ) => Promise<AzureBackupJobResource>;
}

function _getJobFromDppCrossTenantVault(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      jobId: string,
      options?: JobFromDppCrossTenantVaultGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, mappingName, jobId, options),
  };
}

export function _getJobFromDppCrossTenantVaultOperations(
  context: DataProtectionContext,
): JobFromDppCrossTenantVaultOperations {
  return {
    ..._getJobFromDppCrossTenantVault(context),
  };
}
