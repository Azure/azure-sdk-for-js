// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { get } from "../../api/generateDetailedCostReportOperationResults/operations.js";
import { GenerateDetailedCostReportOperationResultsGetOptionalParams } from "../../api/generateDetailedCostReportOperationResults/options.js";
import { GenerateDetailedCostReportOperationResult } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateDetailedCostReportOperationResults operations. */
export interface GenerateDetailedCostReportOperationResultsOperations {
  /** Gets the result of the specified operation. The link with this operationId is provided as a response header of the initial request. */
  get: (
    operationId: string,
    scope: string,
    options?: GenerateDetailedCostReportOperationResultsGetOptionalParams,
  ) => PollerLike<
    OperationState<GenerateDetailedCostReportOperationResult>,
    GenerateDetailedCostReportOperationResult
  >;
}

function _getGenerateDetailedCostReportOperationResults(context: CostManagementContext) {
  return {
    get: (
      operationId: string,
      scope: string,
      options?: GenerateDetailedCostReportOperationResultsGetOptionalParams,
    ) => get(context, operationId, scope, options),
  };
}

export function _getGenerateDetailedCostReportOperationResultsOperations(
  context: CostManagementContext,
): GenerateDetailedCostReportOperationResultsOperations {
  return {
    ..._getGenerateDetailedCostReportOperationResults(context),
  };
}
