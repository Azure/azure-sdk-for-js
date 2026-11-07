// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { get } from "../../api/operationsStatus/operations.js";
import type { OperationsStatusGetOptionalParams } from "../../api/operationsStatus/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a OperationsStatus operations. */
export interface OperationsStatusOperations {
  /** Gets the status of operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationsStatusGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationsStatus(context: RedisEnterpriseManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationsStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationsStatusOperations(
  context: RedisEnterpriseManagementContext,
): OperationsStatusOperations {
  return {
    ..._getOperationsStatus(context),
  };
}
