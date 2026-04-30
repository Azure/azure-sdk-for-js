// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import { get } from "../../api/operationResult/operations.js";
import type { OperationResultGetOptionalParams } from "../../api/operationResult/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OperationResult operations. */
export interface OperationResultOperations {
  /** Get the result of a long running azure asynchronous operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationResultGetOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use get instead */
  beginGet: (
    location: string,
    operationId: string,
    options?: OperationResultGetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use get instead */
  beginGetAndWait: (
    location: string,
    operationId: string,
    options?: OperationResultGetOptionalParams,
  ) => Promise<void>;
}

function _getOperationResult(context: AzureMapsManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationResultGetOptionalParams) =>
      get(context, location, operationId, options),
    beginGet: async (
      location: string,
      operationId: string,
      options?: OperationResultGetOptionalParams,
    ) => {
      const poller = get(context, location, operationId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetAndWait: async (
      location: string,
      operationId: string,
      options?: OperationResultGetOptionalParams,
    ) => {
      return await get(context, location, operationId, options);
    },
  };
}

export function _getOperationResultOperations(
  context: AzureMapsManagementContext,
): OperationResultOperations {
  return {
    ..._getOperationResult(context),
  };
}
