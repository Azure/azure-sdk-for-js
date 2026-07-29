// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { check } from "../../api/frontDoorNameAvailabilityWithSubscription/operations.js";
import type { FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams } from "../../api/frontDoorNameAvailabilityWithSubscription/options.js";
import type {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
} from "../../models/models.js";

/** Interface representing a FrontDoorNameAvailabilityWithSubscription operations. */
export interface FrontDoorNameAvailabilityWithSubscriptionOperations {
  /** Check the availability of a Front Door subdomain. */
  check: (
    checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
}

function _getFrontDoorNameAvailabilityWithSubscription(context: FrontDoorManagementContext) {
  return {
    check: (
      checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams,
    ) => check(context, checkFrontDoorNameAvailabilityInput, options),
  };
}

export function _getFrontDoorNameAvailabilityWithSubscriptionOperations(
  context: FrontDoorManagementContext,
): FrontDoorNameAvailabilityWithSubscriptionOperations {
  return {
    ..._getFrontDoorNameAvailabilityWithSubscription(context),
  };
}
