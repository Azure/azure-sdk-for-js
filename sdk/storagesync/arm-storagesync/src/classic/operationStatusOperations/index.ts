// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import { get } from "../../api/operationStatusOperations/operations.js";
import type { OperationStatusOperationsGetOptionalParams } from "../../api/operationStatusOperations/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a OperationStatusOperations operations. */
export interface OperationStatusOperationsOperations {
  /** Get Operation status */
  get: (
    resourceGroupName: string,
    locationName: string,
    workflowId: string,
    operationId: string,
    options?: OperationStatusOperationsGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationStatusOperations(context: MicrosoftStorageSyncContext) {
  return {
    get: (
      resourceGroupName: string,
      locationName: string,
      workflowId: string,
      operationId: string,
      options?: OperationStatusOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, locationName, workflowId, operationId, options),
  };
}

export function _getOperationStatusOperationsOperations(
  context: MicrosoftStorageSyncContext,
): OperationStatusOperationsOperations {
  return {
    ..._getOperationStatusOperations(context),
  };
}
