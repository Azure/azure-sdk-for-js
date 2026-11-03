// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { trigger } from "../../api/jobCancellations/operations.js";
import type { JobCancellationsTriggerOptionalParams } from "../../api/jobCancellations/options.js";

/** Interface representing a JobCancellations operations. */
export interface JobCancellationsOperations {
  /**
   * Cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
   * GetCancelOperationResult API.
   */
  trigger: (
    vaultName: string,
    resourceGroupName: string,
    jobName: string,
    options?: JobCancellationsTriggerOptionalParams,
  ) => Promise<void>;
}

function _getJobCancellations(context: RecoveryServicesBackupContext) {
  return {
    trigger: (
      vaultName: string,
      resourceGroupName: string,
      jobName: string,
      options?: JobCancellationsTriggerOptionalParams,
    ) => trigger(context, vaultName, resourceGroupName, jobName, options),
  };
}

export function _getJobCancellationsOperations(
  context: RecoveryServicesBackupContext,
): JobCancellationsOperations {
  return {
    ..._getJobCancellations(context),
  };
}
