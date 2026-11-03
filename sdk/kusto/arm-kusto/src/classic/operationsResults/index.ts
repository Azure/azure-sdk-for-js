// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import { get } from "../../api/operationsResults/operations.js";
import type { OperationsResultsGetOptionalParams } from "../../api/operationsResults/options.js";
import type { OperationResult } from "../../models/models.js";

/** Interface representing a OperationsResults operations. */
export interface OperationsResultsOperations {
  /** Returns operation results. */
  get: (
    location: string,
    operationId: string,
    options?: OperationsResultsGetOptionalParams,
  ) => Promise<OperationResult>;
}

function _getOperationsResults(context: KustoManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationsResultsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationsResultsOperations(
  context: KustoManagementContext,
): OperationsResultsOperations {
  return {
    ..._getOperationsResults(context),
  };
}
