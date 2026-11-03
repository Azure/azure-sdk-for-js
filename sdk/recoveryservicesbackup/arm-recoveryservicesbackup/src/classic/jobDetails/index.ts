// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/jobDetails/operations.js";
import type { JobDetailsGetOptionalParams } from "../../api/jobDetails/options.js";
import type { JobResource } from "../../models/models.js";

/** Interface representing a JobDetails operations. */
export interface JobDetailsOperations {
  /** Gets extended information associated with the job. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    jobName: string,
    options?: JobDetailsGetOptionalParams,
  ) => Promise<JobResource>;
}

function _getJobDetails(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      jobName: string,
      options?: JobDetailsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, jobName, options),
  };
}

export function _getJobDetailsOperations(
  context: RecoveryServicesBackupContext,
): JobDetailsOperations {
  return {
    ..._getJobDetails(context),
  };
}
