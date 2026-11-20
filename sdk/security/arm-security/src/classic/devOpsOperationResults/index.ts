// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { get } from "../../api/devOpsOperationResults/operations.js";
import type { DevOpsOperationResultsGetOptionalParams } from "../../api/devOpsOperationResults/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a DevOpsOperationResults operations. */
export interface DevOpsOperationResultsOperations {
  /** Get devops long running operation result. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    operationResultId: string,
    options?: DevOpsOperationResultsGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getDevOpsOperationResults(context: SecurityCenterContext) {
  return {
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      operationResultId: string,
      options?: DevOpsOperationResultsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, operationResultId, options),
  };
}

export function _getDevOpsOperationResultsOperations(
  context: SecurityCenterContext,
): DevOpsOperationResultsOperations {
  return {
    ..._getDevOpsOperationResults(context),
  };
}
