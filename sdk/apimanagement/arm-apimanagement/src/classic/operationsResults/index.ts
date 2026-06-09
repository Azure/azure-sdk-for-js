// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { get } from "../../api/operationsResults/operations.js";
import type { OperationsResultsGetOptionalParams } from "../../api/operationsResults/options.js";

/** Interface representing a OperationsResults operations. */
export interface OperationsResultsOperations {
  /** Returns operation results for long running operations executing DELETE or PATCH on the resource. */
  get: (
    location: string,
    operationId: string,
    options?: OperationsResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getOperationsResults(context: ApiManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationsResultsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationsResultsOperations(
  context: ApiManagementContext,
): OperationsResultsOperations {
  return {
    ..._getOperationsResults(context),
  };
}
