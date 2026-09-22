// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import { get } from "../../api/operationStatus/operations.js";
import type { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Get the status of a long running azure asynchronous operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatus(context: AzureMapsManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: AzureMapsManagementContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
