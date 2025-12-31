// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/operationResult/operations.js";
import type { OperationResultGetOptionalParams } from "../../api/operationResult/options.js";
import type { OperationJobExtendedInfo } from "../../models/models.js";

/** Interface representing a OperationResult operations. */
export interface OperationResultOperations {
  /** Gets the operation result for a resource */
  get: (
    operationId: string,
    location: string,
    options?: OperationResultGetOptionalParams,
  ) => Promise<OperationJobExtendedInfo | null>;
}

function _getOperationResult(context: DataProtectionContext) {
  return {
    get: (operationId: string, location: string, options?: OperationResultGetOptionalParams) =>
      get(context, operationId, location, options),
  };
}

export function _getOperationResultOperations(
  context: DataProtectionContext,
): OperationResultOperations {
  return {
    ..._getOperationResult(context),
  };
}
