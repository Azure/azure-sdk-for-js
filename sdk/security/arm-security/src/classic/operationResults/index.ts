// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { get } from "../../api/operationResults/operations.js";
import type { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Returns operation results for long running operations. */
  get: (
    location: string,
    operationId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getOperationResults(context: SecurityCenterContext) {
  return {
    get: (location: string, operationId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationResultsOperations(
  context: SecurityCenterContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
