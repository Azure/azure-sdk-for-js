// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { $export } from "../../api/jobs/operations.js";
import type { JobsExportOptionalParams } from "../../api/jobs/options.js";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Triggers export of jobs specified by filters and returns an OperationID to track. */
  /**
   *  @fixme export is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  export: (
    vaultName: string,
    resourceGroupName: string,
    options?: JobsExportOptionalParams,
  ) => Promise<void>;
}

function _getJobs(context: RecoveryServicesBackupContext) {
  return {
    export: (vaultName: string, resourceGroupName: string, options?: JobsExportOptionalParams) =>
      $export(context, vaultName, resourceGroupName, options),
  };
}

export function _getJobsOperations(context: RecoveryServicesBackupContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
