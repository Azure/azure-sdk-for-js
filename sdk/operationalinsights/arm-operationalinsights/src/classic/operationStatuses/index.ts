// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { get } from "../../api/operationStatuses/operations.js";
import { OperationStatusesGetOptionalParams } from "../../api/operationStatuses/options.js";
import { OperationStatus } from "../../models/models.js";

/** Interface representing a OperationStatuses operations. */
export interface OperationStatusesOperations {
  /** Get the status of a long running azure asynchronous operation. */
  get: (
    location: string,
    asyncOperationId: string,
    options?: OperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getOperationStatuses(context: OperationalInsightsManagementContext) {
  return {
    get: (
      location: string,
      asyncOperationId: string,
      options?: OperationStatusesGetOptionalParams,
    ) => get(context, location, asyncOperationId, options),
  };
}

export function _getOperationStatusesOperations(
  context: OperationalInsightsManagementContext,
): OperationStatusesOperations {
  return {
    ..._getOperationStatuses(context),
  };
}
