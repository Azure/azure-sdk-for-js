// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import { createOperation } from "../../api/generateDetailedCostReport/operations.js";
import type { GenerateDetailedCostReportCreateOperationOptionalParams } from "../../api/generateDetailedCostReport/options.js";
import type {
  GenerateDetailedCostReportOperationResult,
  GenerateDetailedCostReportDefinition,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GenerateDetailedCostReport operations. */
export interface GenerateDetailedCostReportOperations {
  /** Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored. */
  createOperation: (
    scope: string,
    parameters: GenerateDetailedCostReportDefinition,
    options?: GenerateDetailedCostReportCreateOperationOptionalParams,
  ) => PollerLike<
    OperationState<GenerateDetailedCostReportOperationResult>,
    GenerateDetailedCostReportOperationResult
  >;
  /** @deprecated use createOperation instead */
  beginCreateOperation: (
    scope: string,
    parameters: GenerateDetailedCostReportDefinition,
    options?: GenerateDetailedCostReportCreateOperationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<GenerateDetailedCostReportOperationResult>,
      GenerateDetailedCostReportOperationResult
    >
  >;
  /** @deprecated use createOperation instead */
  beginCreateOperationAndWait: (
    scope: string,
    parameters: GenerateDetailedCostReportDefinition,
    options?: GenerateDetailedCostReportCreateOperationOptionalParams,
  ) => Promise<GenerateDetailedCostReportOperationResult>;
}

function _getGenerateDetailedCostReport(context: CostManagementContext) {
  return {
    createOperation: (
      scope: string,
      parameters: GenerateDetailedCostReportDefinition,
      options?: GenerateDetailedCostReportCreateOperationOptionalParams,
    ) => createOperation(context, scope, parameters, options),
    beginCreateOperation: async (
      scope: string,
      parameters: GenerateDetailedCostReportDefinition,
      options?: GenerateDetailedCostReportCreateOperationOptionalParams,
    ) => {
      const poller = createOperation(context, scope, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOperationAndWait: async (
      scope: string,
      parameters: GenerateDetailedCostReportDefinition,
      options?: GenerateDetailedCostReportCreateOperationOptionalParams,
    ) => {
      return await createOperation(context, scope, parameters, options);
    },
  };
}

export function _getGenerateDetailedCostReportOperations(
  context: CostManagementContext,
): GenerateDetailedCostReportOperations {
  return {
    ..._getGenerateDetailedCostReport(context),
  };
}
