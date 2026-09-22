// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { get } from "../../api/operationsStatus/operations.js";
import type { OperationsStatusGetOptionalParams } from "../../api/operationsStatus/options.js";
import type { Job } from "../../models/models.js";

/** Interface representing a OperationsStatus operations. */
export interface OperationsStatusOperations {
  /** Gets the details of a specified job on a Data Box Edge/Data Box Gateway device. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: OperationsStatusGetOptionalParams,
  ) => Promise<Job>;
}

function _getOperationsStatus(context: DataBoxEdgeManagementContext) {
  return {
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: OperationsStatusGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getOperationsStatusOperations(
  context: DataBoxEdgeManagementContext,
): OperationsStatusOperations {
  return {
    ..._getOperationsStatus(context),
  };
}
