// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationListResult } from "../../models/models.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available Microsoft.Education API operations. */
  list: (options?: OperationsListOptionalParams) => Promise<OperationListResult>;
}

function _getOperations(context: EducationManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: EducationManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
