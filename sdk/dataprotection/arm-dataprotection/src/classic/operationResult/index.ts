// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/operationResult/operations.js";
import { OperationResultGetOptionalParams } from "../../api/operationResult/options.js";
import { OperationJobExtendedInfo } from "../../models/models.js";

/** Interface representing a OperationResult operations. */
export interface OperationResultOperations {
  /** Gets the operation result for a resource */
  get: (
    operationId: string,
    location: string,
    options?: OperationResultGetOptionalParams,
  ) => Promise<OperationJobExtendedInfo | undefined>;
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
