// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  createOperation,
  getOperationResults,
} from "../../api/generateCostDetailsReport/operations.js";
import {
  GenerateCostDetailsReportCreateOperationOptionalParams,
  GenerateCostDetailsReportGetOperationResultsOptionalParams,
} from "../../api/generateCostDetailsReport/options.js";
import {
  CostDetailsOperationResults,
  GenerateCostDetailsReportRequestDefinition,
} from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateCostDetailsReport operations. */
export interface GenerateCostDetailsReportOperations {
  /** This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields */
  createOperation: (
    scope: string,
    parameters: GenerateCostDetailsReportRequestDefinition,
    options?: GenerateCostDetailsReportCreateOperationOptionalParams,
  ) => PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults>;
  /** Get the result of the specified operation. This link is provided in the CostDetails creation request response Location header. */
  getOperationResults: (
    scope: string,
    operationId: string,
    options?: GenerateCostDetailsReportGetOperationResultsOptionalParams,
  ) => PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults>;
}

function _getGenerateCostDetailsReport(context: CostManagementContext) {
  return {
    createOperation: (
      scope: string,
      parameters: GenerateCostDetailsReportRequestDefinition,
      options?: GenerateCostDetailsReportCreateOperationOptionalParams,
    ) => createOperation(context, scope, parameters, options),
    getOperationResults: (
      scope: string,
      operationId: string,
      options?: GenerateCostDetailsReportGetOperationResultsOptionalParams,
    ) => getOperationResults(context, scope, operationId, options),
  };
}

export function _getGenerateCostDetailsReportOperations(
  context: CostManagementContext,
): GenerateCostDetailsReportOperations {
  return {
    ..._getGenerateCostDetailsReport(context),
  };
}
