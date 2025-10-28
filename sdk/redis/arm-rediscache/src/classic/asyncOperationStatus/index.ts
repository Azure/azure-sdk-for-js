// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { get } from "../../api/asyncOperationStatus/operations.js";
import type { AsyncOperationStatusGetOptionalParams } from "../../api/asyncOperationStatus/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a AsyncOperationStatus operations. */
export interface AsyncOperationStatusOperations {
  /** For checking the ongoing status of an operation */
  get: (
    location: string,
    operationId: string,
    options?: AsyncOperationStatusGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getAsyncOperationStatus(context: RedisManagementContext) {
  return {
    get: (location: string, operationId: string, options?: AsyncOperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getAsyncOperationStatusOperations(
  context: RedisManagementContext,
): AsyncOperationStatusOperations {
  return {
    ..._getAsyncOperationStatus(context),
  };
}
