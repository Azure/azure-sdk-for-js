// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeOperatorContext } from "../../api/edgeOperatorContext.js";
import { get } from "../../api/systemReadinessOperations/operations.js";
import type { SystemReadinessOperationsGetOptionalParams } from "../../api/systemReadinessOperations/options.js";
import type { SystemReadiness } from "../../models/models.js";

/** Interface representing a SystemReadinessOperations operations. */
export interface SystemReadinessOperationsOperations {
  /** Gets the Azure Local Disconnected Operations (ALDO) system readiness status. */
  get: (options?: SystemReadinessOperationsGetOptionalParams) => Promise<SystemReadiness>;
}

function _getSystemReadinessOperations(context: EdgeOperatorContext) {
  return {
    get: (options?: SystemReadinessOperationsGetOptionalParams) => get(context, options),
  };
}

export function _getSystemReadinessOperationsOperations(
  context: EdgeOperatorContext,
): SystemReadinessOperationsOperations {
  return {
    ..._getSystemReadinessOperations(context),
  };
}
