// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { get } from "../../api/operationProgress/operations.js";
import { OperationProgressGetOptionalParams } from "../../api/operationProgress/options.js";
import { OperationProgressResult } from "../../models/models.js";

/** Interface representing a OperationProgress operations. */
export interface OperationProgressOperations {
  /** Get the operation result for a long running operation. */
  get: (
    locationName: string,
    operationId: string,
    options?: OperationProgressGetOptionalParams,
  ) => Promise<OperationProgressResult>;
}

function _getOperationProgress(context: MySQLManagementFlexibleServerContext) {
  return {
    get: (
      locationName: string,
      operationId: string,
      options?: OperationProgressGetOptionalParams,
    ) => get(context, locationName, operationId, options),
  };
}

export function _getOperationProgressOperations(
  context: MySQLManagementFlexibleServerContext,
): OperationProgressOperations {
  return {
    ..._getOperationProgress(context),
  };
}
