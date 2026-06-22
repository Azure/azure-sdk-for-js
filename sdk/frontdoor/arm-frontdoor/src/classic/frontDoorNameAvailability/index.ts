// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { check } from "../../api/frontDoorNameAvailability/operations.js";
import type { FrontDoorNameAvailabilityCheckOptionalParams } from "../../api/frontDoorNameAvailability/options.js";
import type {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
} from "../../models/models.js";

/** Interface representing a FrontDoorNameAvailability operations. */
export interface FrontDoorNameAvailabilityOperations {
  /** Check the availability of a Front Door resource name. */
  check: (
    checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: FrontDoorNameAvailabilityCheckOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
}

function _getFrontDoorNameAvailability(context: FrontDoorManagementContext) {
  return {
    check: (
      checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: FrontDoorNameAvailabilityCheckOptionalParams,
    ) => check(context, checkFrontDoorNameAvailabilityInput, options),
  };
}

export function _getFrontDoorNameAvailabilityOperations(
  context: FrontDoorManagementContext,
): FrontDoorNameAvailabilityOperations {
  return {
    ..._getFrontDoorNameAvailability(context),
  };
}
