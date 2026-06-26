// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import { get } from "../../api/operationsResultsLocation/operations.js";
import type { OperationsResultsLocationGetOptionalParams } from "../../api/operationsResultsLocation/options.js";

/** Interface representing a OperationsResultsLocation operations. */
export interface OperationsResultsLocationOperations {
  /** Returns operation results. */
  get: (
    location: string,
    operationId: string,
    options?: OperationsResultsLocationGetOptionalParams,
  ) => Promise<void>;
}

function _getOperationsResultsLocation(context: KustoManagementContext) {
  return {
    get: (
      location: string,
      operationId: string,
      options?: OperationsResultsLocationGetOptionalParams,
    ) => get(context, location, operationId, options),
  };
}

export function _getOperationsResultsLocationOperations(
  context: KustoManagementContext,
): OperationsResultsLocationOperations {
  return {
    ..._getOperationsResultsLocation(context),
  };
}
