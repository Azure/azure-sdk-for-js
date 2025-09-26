// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/operationStatus/operations.js";
import type { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import type { OperationResource } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Gets the operation status for a resource. */
  get: (
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationResource>;
}

function _getOperationStatus(context: DataProtectionContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: DataProtectionContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
