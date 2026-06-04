// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { checkAvailability } from "../../api/checkNameAvailability/operations.js";
import { CheckNameAvailabilityCheckAvailabilityOptionalParams } from "../../api/checkNameAvailability/options.js";
import { CheckNameAvailabilityResponse } from "../../models/models.js";

/** Interface representing a CheckNameAvailability operations. */
export interface CheckNameAvailabilityOperations {
  /** This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions */
  checkAvailability: (
    scope: string,
    options?: CheckNameAvailabilityCheckAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

function _getCheckNameAvailability(context: HelpRPContext) {
  return {
    checkAvailability: (
      scope: string,
      options?: CheckNameAvailabilityCheckAvailabilityOptionalParams,
    ) => checkAvailability(context, scope, options),
  };
}

export function _getCheckNameAvailabilityOperations(
  context: HelpRPContext,
): CheckNameAvailabilityOperations {
  return {
    ..._getCheckNameAvailability(context),
  };
}
