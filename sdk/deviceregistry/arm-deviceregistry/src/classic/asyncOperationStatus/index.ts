// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import { get } from "../../api/asyncOperationStatus/operations.js";
import type { AsyncOperationStatusGetOptionalParams } from "../../api/asyncOperationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a AsyncOperationStatus operations. */
export interface AsyncOperationStatusOperations {
  /** Returns the current status of an async operation. */
  get: (
    location: string,
    operationId: string,
    options?: AsyncOperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getAsyncOperationStatus(context: DeviceRegistryManagementContext) {
  return {
    get: (location: string, operationId: string, options?: AsyncOperationStatusGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getAsyncOperationStatusOperations(
  context: DeviceRegistryManagementContext,
): AsyncOperationStatusOperations {
  return {
    ..._getAsyncOperationStatus(context),
  };
}
