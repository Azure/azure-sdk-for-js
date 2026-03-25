// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/jobOperationResults/operations.js";
import type { JobOperationResultsGetOptionalParams } from "../../api/jobOperationResults/options.js";

/** Interface representing a JobOperationResults operations. */
export interface JobOperationResultsOperations {
  /** Fetches the result of any operation. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    jobName: string,
    operationId: string,
    options?: JobOperationResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getJobOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      jobName: string,
      operationId: string,
      options?: JobOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, jobName, operationId, options),
  };
}

export function _getJobOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): JobOperationResultsOperations {
  return {
    ..._getJobOperationResults(context),
  };
}
