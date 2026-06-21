// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { get } from "../../api/operationStatus/operations.js";
import { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Returns the current status of an async operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatus(context: AzureResilienceManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: AzureResilienceManagementContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
