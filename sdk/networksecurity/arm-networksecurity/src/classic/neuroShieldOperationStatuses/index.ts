// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import { get } from "../../api/neuroShieldOperationStatuses/operations.js";
import type { NeuroShieldOperationStatusesGetOptionalParams } from "../../api/neuroShieldOperationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a NeuroShieldOperationStatuses operations. */
export interface NeuroShieldOperationStatusesOperations {
  /** Gets the status of an asynchronous NeuroShield operation. */
  get: (
    location: string,
    operationId: string,
    options?: NeuroShieldOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getNeuroShieldOperationStatuses(context: NetworkSecurityManagementContext) {
  return {
    get: (
      location: string,
      operationId: string,
      options?: NeuroShieldOperationStatusesGetOptionalParams,
    ) => get(context, location, operationId, options),
  };
}

export function _getNeuroShieldOperationStatusesOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldOperationStatusesOperations {
  return {
    ..._getNeuroShieldOperationStatuses(context),
  };
}
