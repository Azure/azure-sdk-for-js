// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationListResult } from "../../models/models.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Returns list of operations. */
  list: (options?: OperationsListOptionalParams) => Promise<OperationListResult>;
}

function _getOperations(context: DeveloperHubServiceContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: DeveloperHubServiceContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
