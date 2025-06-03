// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { OperationStatus } from "../../models/models.js";
import { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import { get } from "../../api/operationResults/operations.js";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Gets the operations. */
  get: (
    resourceGroupName: string,
    operationId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationResults(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      operationId: string,
      options?: OperationResultsGetOptionalParams,
    ) => get(context, resourceGroupName, operationId, options),
  };
}

export function _getOperationResultsOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
