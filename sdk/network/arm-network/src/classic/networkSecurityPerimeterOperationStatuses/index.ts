// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { get } from "../../api/networkSecurityPerimeterOperationStatuses/operations.js";
import type { NetworkSecurityPerimeterOperationStatusesGetOptionalParams } from "../../api/networkSecurityPerimeterOperationStatuses/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a NetworkSecurityPerimeterOperationStatuses operations. */
export interface NetworkSecurityPerimeterOperationStatusesOperations {
  /** Gets the operation status for the given operation id. */
  get: (
    location: string,
    operationId: string,
    options?: NetworkSecurityPerimeterOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getNetworkSecurityPerimeterOperationStatuses(context: NetworkManagementContext) {
  return {
    get: (
      location: string,
      operationId: string,
      options?: NetworkSecurityPerimeterOperationStatusesGetOptionalParams,
    ) => get(context, location, operationId, options),
  };
}

export function _getNetworkSecurityPerimeterOperationStatusesOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterOperationStatusesOperations {
  return {
    ..._getNetworkSecurityPerimeterOperationStatuses(context),
  };
}
