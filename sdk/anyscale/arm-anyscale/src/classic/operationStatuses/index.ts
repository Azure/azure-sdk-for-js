// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import { get } from "../../api/operationStatuses/operations.js";
import type { OperationStatusesGetOptionalParams } from "../../api/operationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatuses operations. */
export interface OperationStatusesOperations {
  /** Returns the current status of an asynchronous operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusesGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatuses(context: PlatformContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusesGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusesOperations(
  context: PlatformContext,
): OperationStatusesOperations {
  return {
    ..._getOperationStatuses(context),
  };
}
