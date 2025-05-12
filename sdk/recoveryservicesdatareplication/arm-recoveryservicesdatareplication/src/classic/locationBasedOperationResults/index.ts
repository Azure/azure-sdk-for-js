// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { OperationStatus } from "../../models/models.js";
import { LocationBasedOperationResultsGetOptionalParams } from "../../api/locationBasedOperationResults/options.js";
import { get } from "../../api/locationBasedOperationResults/operations.js";

/** Interface representing a LocationBasedOperationResults operations. */
export interface LocationBasedOperationResultsOperations {
  /** Gets the location based operation result. */
  get: (
    resourceGroupName: string,
    location: string,
    operationId: string,
    options?: LocationBasedOperationResultsGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getLocationBasedOperationResults(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      location: string,
      operationId: string,
      options?: LocationBasedOperationResultsGetOptionalParams,
    ) => get(context, resourceGroupName, location, operationId, options),
  };
}

export function _getLocationBasedOperationResultsOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): LocationBasedOperationResultsOperations {
  return {
    ..._getLocationBasedOperationResults(context),
  };
}
