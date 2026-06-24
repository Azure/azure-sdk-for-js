// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { get } from "../../api/operationResults/operations.js";
import { OperationResultsGetOptionalParams } from "../../api/operationResults/options.js";
import { OperationResultsDescription } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OperationResults operations. */
export interface OperationResultsOperations {
  /** Get the operation result for a long running operation. */
  get: (
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => PollerLike<OperationState<OperationResultsDescription>, OperationResultsDescription>;
  /** @deprecated use get instead */
  beginGet: (
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<OperationResultsDescription>, OperationResultsDescription>
  >;
  /** @deprecated use get instead */
  beginGetAndWait: (
    operationResultId: string,
    options?: OperationResultsGetOptionalParams,
  ) => Promise<OperationResultsDescription>;
}

function _getOperationResults(context: AzureBotServiceContext) {
  return {
    get: (operationResultId: string, options?: OperationResultsGetOptionalParams) =>
      get(context, operationResultId, options),
    beginGet: async (operationResultId: string, options?: OperationResultsGetOptionalParams) => {
      const poller = get(context, operationResultId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetAndWait: async (
      operationResultId: string,
      options?: OperationResultsGetOptionalParams,
    ) => {
      return await get(context, operationResultId, options);
    },
  };
}

export function _getOperationResultsOperations(
  context: AzureBotServiceContext,
): OperationResultsOperations {
  return {
    ..._getOperationResults(context),
  };
}
