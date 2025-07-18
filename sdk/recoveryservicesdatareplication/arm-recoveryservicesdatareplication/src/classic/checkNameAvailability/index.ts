// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { CheckNameAvailabilityResponseModel } from "../../models/models.js";
import { CheckNameAvailabilityPostOptionalParams } from "../../api/checkNameAvailability/options.js";
import { post } from "../../api/checkNameAvailability/operations.js";

/** Interface representing a CheckNameAvailability operations. */
export interface CheckNameAvailabilityOperations {
  /** Checks the resource name availability. */
  post: (
    location: string,
    options?: CheckNameAvailabilityPostOptionalParams,
  ) => Promise<CheckNameAvailabilityResponseModel>;
}

function _getCheckNameAvailability(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    post: (location: string, options?: CheckNameAvailabilityPostOptionalParams) =>
      post(context, location, options),
  };
}

export function _getCheckNameAvailabilityOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): CheckNameAvailabilityOperations {
  return {
    ..._getCheckNameAvailability(context),
  };
}
