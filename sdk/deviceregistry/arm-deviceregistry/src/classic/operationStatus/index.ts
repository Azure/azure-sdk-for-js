// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import { operationStatusGet } from "../../api/operationStatus/index.js";
import { OperationStatusGetOptionalParams } from "../../api/options.js";
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

function _getOperationStatus(context: DeviceRegistryManagementContext) {
  return {
    get: (location: string, operationId: string, options?: OperationStatusGetOptionalParams) =>
      operationStatusGet(context, location, operationId, options),
  };
}

export function _getOperationStatusOperations(
  context: DeviceRegistryManagementContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
