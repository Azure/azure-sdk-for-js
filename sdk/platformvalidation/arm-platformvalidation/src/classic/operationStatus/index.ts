// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { get } from "../../api/operationStatus/operations.js";
import { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Returns the current status of an async operation. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatus(context: PlatformValidationContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: PlatformValidationContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
