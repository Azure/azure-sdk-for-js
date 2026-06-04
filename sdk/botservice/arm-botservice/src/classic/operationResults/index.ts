// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { get } from "../../api/operationResults/operations.js";
import type { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import type { OperationResultsDescription } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get the operation result for a long running operation. */
  get: (
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => PollerLike<OperationState<OperationResultsDescription>, OperationResultsDescription>;
}

function _getOperationResults(context: AzureBotServiceContext) {
  return {
    get: (operationResultId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, operationResultId, options),
  };
}

export function _getOperationResultsOperations(
  context: AzureBotServiceContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
