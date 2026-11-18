// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { get } from "../../api/operationStatuses/operations.js";
import type { OperationStatusesGetOptionalParams } from "../../api/operationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatuses operations. */
export interface OperationStatusesOperations {
  /** Get the status of a long running azure asynchronous operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusesGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatuses(context: SecurityCenterContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusesGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusesOperations(
  context: SecurityCenterContext,
): OperationStatusesOperations {
  return {
    ..._getOperationStatuses(context),
  };
}
