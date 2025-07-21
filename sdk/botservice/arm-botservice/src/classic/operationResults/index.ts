// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { OperationResultsDescription } from "../../models/models.js";
import { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import { get } from "../../api/operationResults/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get the operation result for a long running operation. */
  get: (
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => PollerLike<OperationState<OperationResultsDescription>, OperationResultsDescription>;
}

function _getOperationResults(context: BotServiceContext) {
  return {
    get: (operationResultId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, operationResultId, options),
  };
}

export function _getOperationResultsOperations(
  context: BotServiceContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
