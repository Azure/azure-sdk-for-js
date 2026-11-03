// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { get } from "../../api/operationResults/operations.js";
import type { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import type { OperationResultsDescription } from "../../models/models.js";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get the operation result for a long running operation. */
  get: (
    locationName: string,
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<OperationResultsDescription>;
}

function _getOperationResults(context: HealthcareApisManagementContext) {
  return {
    get: (
      locationName: string,
      operationResultId: string,
      options?: OperationResultsGetOptionalParams,
    ) => get(context, locationName, operationResultId, options),
  };
}

export function _getOperationResultsOperations(
  context: HealthcareApisManagementContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
