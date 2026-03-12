// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { OperationStatusResult } from "../../models/models.js";
import { OperationStatusesGetOptionalParams } from "../../api/operationStatuses/options.js";
import { get } from "../../api/operationStatuses/operations.js";

/** Interface representing a OperationStatuses operations. */
export interface OperationStatusesOperations {
  /** Returns the current status of an async operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusesGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatuses(context: ChaosManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusesGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusesOperations(
  context: ChaosManagementContext,
): OperationStatusesOperations {
  return {
    ..._getOperationStatuses(context),
  };
}
