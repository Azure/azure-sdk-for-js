// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/exportJobsOperationResults/operations.js";
import type { ExportJobsOperationResultsGetOptionalParams } from "../../api/exportJobsOperationResults/options.js";
import type { OperationResultInfoBaseResource } from "../../models/models.js";

/** Interface representing a ExportJobsOperationResults operations. */
export interface ExportJobsOperationResultsOperations {
  /**
   * Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
   * contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: ExportJobsOperationResultsGetOptionalParams,
  ) => Promise<OperationResultInfoBaseResource>;
}

function _getExportJobsOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: ExportJobsOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getExportJobsOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ExportJobsOperationResultsOperations {
  return {
    ..._getExportJobsOperationResults(context),
  };
}
