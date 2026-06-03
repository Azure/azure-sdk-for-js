// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import { get } from "../../api/operationStatus/operations.js";
import type { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Get Operation status */
  get: (
    resourceGroupName: string,
    locationName: string,
    workflowId: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationStatus(context: MicrosoftStorageSyncContext) {
  return {
    get: (
      resourceGroupName: string,
      locationName: string,
      workflowId: string,
      operationId: string,
      options?: OperationStatusGetOptionalParams,
    ) => get(context, resourceGroupName, locationName, workflowId, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: MicrosoftStorageSyncContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
