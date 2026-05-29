// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { get } from "../../api/operationResults/operations.js";
import type { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import type { OperationStatusExtendedResult } from "../../models/models.js";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get the operation result for a long running operation. */
  get: (
    locationName: string,
    operationId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<OperationStatusExtendedResult>;
}

function _getOperationResults(context: MySQLManagementFlexibleServerContext) {
  return {
    get: (locationName: string, operationId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, locationName, operationId, options),
  };
}

export function _getOperationResultsOperations(
  context: MySQLManagementFlexibleServerContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
