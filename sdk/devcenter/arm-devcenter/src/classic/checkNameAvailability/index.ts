// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { execute } from "../../api/checkNameAvailability/operations.js";
import type { CheckNameAvailabilityExecuteOptionalParams } from "../../api/checkNameAvailability/options.js";
import type {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";

/** Interface representing a CheckNameAvailability operations. */
export interface CheckNameAvailabilityOperations {
  /** Check the availability of name for resource. */
  execute: (
    nameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: CheckNameAvailabilityExecuteOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

function _getCheckNameAvailability(context: DevCenterContext) {
  return {
    execute: (
      nameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: CheckNameAvailabilityExecuteOptionalParams,
    ) => execute(context, nameAvailabilityRequest, options),
  };
}

export function _getCheckNameAvailabilityOperations(
  context: DevCenterContext,
): CheckNameAvailabilityOperations {
  return {
    ..._getCheckNameAvailability(context),
  };
}
