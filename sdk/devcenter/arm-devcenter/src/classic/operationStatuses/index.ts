// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { get } from "../../api/operationStatuses/operations.js";
import type { OperationStatusesGetOptionalParams } from "../../api/operationStatuses/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a OperationStatuses operations. */
export interface OperationStatusesOperations {
  /** Gets the current status of an async operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationStatuses(context: DevCenterContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusesGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusesOperations(
  context: DevCenterContext,
): OperationStatusesOperations {
  return {
    ..._getOperationStatuses(context),
  };
}
