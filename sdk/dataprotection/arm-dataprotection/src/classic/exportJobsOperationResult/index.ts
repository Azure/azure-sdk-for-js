// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/exportJobsOperationResult/operations.js";
import type { ExportJobsOperationResultGetOptionalParams } from "../../api/exportJobsOperationResult/options.js";
import type { ExportJobsResult } from "../../models/models.js";

/** Interface representing a ExportJobsOperationResult operations. */
export interface ExportJobsOperationResultOperations {
  /** Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: ExportJobsOperationResultGetOptionalParams,
  ) => Promise<ExportJobsResult | null>;
}

function _getExportJobsOperationResult(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      operationId: string,
      options?: ExportJobsOperationResultGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, operationId, options),
  };
}

export function _getExportJobsOperationResultOperations(
  context: DataProtectionContext,
): ExportJobsOperationResultOperations {
  return {
    ..._getExportJobsOperationResult(context),
  };
}
