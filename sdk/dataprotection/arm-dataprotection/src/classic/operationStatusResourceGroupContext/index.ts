// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/operationStatusResourceGroupContext/operations.js";
import type { OperationStatusResourceGroupContextGetOptionalParams } from "../../api/operationStatusResourceGroupContext/options.js";
import type { OperationResource } from "../../models/models.js";

/** Interface representing a OperationStatusResourceGroupContext operations. */
export interface OperationStatusResourceGroupContextOperations {
  /** Gets the operation status for an operation over a ResourceGroup's context. */
  get: (
    resourceGroupName: string,
    operationId: string,
    options?: OperationStatusResourceGroupContextGetOptionalParams,
  ) => Promise<OperationResource>;
}

function _getOperationStatusResourceGroupContext(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      operationId: string,
      options?: OperationStatusResourceGroupContextGetOptionalParams,
    ) => get(context, resourceGroupName, operationId, options),
  };
}

export function _getOperationStatusResourceGroupContextOperations(
  context: DataProtectionContext,
): OperationStatusResourceGroupContextOperations {
  return {
    ..._getOperationStatusResourceGroupContext(context),
  };
}
