// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { execute } from "../../api/checkScopedNameAvailability/operations.js";
import type { CheckScopedNameAvailabilityExecuteOptionalParams } from "../../api/checkScopedNameAvailability/options.js";
import type {
  CheckNameAvailabilityResponse,
  CheckScopedNameAvailabilityRequest,
} from "../../models/models.js";

/** Interface representing a CheckScopedNameAvailability operations. */
export interface CheckScopedNameAvailabilityOperations {
  /** Check the availability of name for resource. */
  execute: (
    nameAvailabilityRequest: CheckScopedNameAvailabilityRequest,
    options?: CheckScopedNameAvailabilityExecuteOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

function _getCheckScopedNameAvailability(context: DevCenterContext) {
  return {
    execute: (
      nameAvailabilityRequest: CheckScopedNameAvailabilityRequest,
      options?: CheckScopedNameAvailabilityExecuteOptionalParams,
    ) => execute(context, nameAvailabilityRequest, options),
  };
}

export function _getCheckScopedNameAvailabilityOperations(
  context: DevCenterContext,
): CheckScopedNameAvailabilityOperations {
  return {
    ..._getCheckScopedNameAvailability(context),
  };
}
