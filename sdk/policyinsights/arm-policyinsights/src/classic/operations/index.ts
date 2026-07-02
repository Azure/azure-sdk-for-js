// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationsListResults } from "../../models/policyInsightsApi/models.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists available operations. */
  list: (options?: OperationsListOptionalParams) => Promise<OperationsListResults>;
}

function _getOperations(context: PolicyInsightsContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: PolicyInsightsContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
