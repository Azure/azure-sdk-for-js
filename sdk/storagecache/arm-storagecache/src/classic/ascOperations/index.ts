// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { get } from "../../api/ascOperations/operations.js";
import { AscOperationsGetOptionalParams } from "../../api/ascOperations/options.js";
import { AscOperation } from "../../models/models.js";

/** Interface representing a AscOperations operations. */
export interface AscOperationsOperations {
  /** Gets the status of an asynchronous operation for the Azure HPC Cache */
  get: (
    location: string,
    operationId: string,
    options?: AscOperationsGetOptionalParams,
  ) => Promise<AscOperation>;
}

function _getAscOperations(context: StorageCacheManagementContext) {
  return {
    get: (location: string, operationId: string, options?: AscOperationsGetOptionalParams) =>
      get(context, location, operationId, options),
  };
}

export function _getAscOperationsOperations(
  context: StorageCacheManagementContext,
): AscOperationsOperations {
  return {
    ..._getAscOperations(context),
  };
}
