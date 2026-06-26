// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { get } from "../../api/generateDetailedCostReportOperationStatus/operations.js";
import { GenerateDetailedCostReportOperationStatusGetOptionalParams } from "../../api/generateDetailedCostReportOperationStatus/options.js";
import { GenerateDetailedCostReportOperationStatuses } from "../../models/models.js";

/** Interface representing a GenerateDetailedCostReportOperationStatus operations. */
export interface GenerateDetailedCostReportOperationStatusOperations {
  /** Get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header. */
  get: (
    operationId: string,
    scope: string,
    options?: GenerateDetailedCostReportOperationStatusGetOptionalParams,
  ) => Promise<GenerateDetailedCostReportOperationStatuses>;
}

function _getGenerateDetailedCostReportOperationStatus(context: CostManagementContext) {
  return {
    get: (
      operationId: string,
      scope: string,
      options?: GenerateDetailedCostReportOperationStatusGetOptionalParams,
    ) => get(context, operationId, scope, options),
  };
}

export function _getGenerateDetailedCostReportOperationStatusOperations(
  context: CostManagementContext,
): GenerateDetailedCostReportOperationStatusOperations {
  return {
    ..._getGenerateDetailedCostReportOperationStatus(context),
  };
}
