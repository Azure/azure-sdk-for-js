// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { get } from "../../api/billingMeters/operations.js";
import { BillingMetersGetOptionalParams } from "../../api/billingMeters/options.js";
import { BillingMeterCollection } from "../../models/models.js";

/** Interface representing a BillingMeters operations. */
export interface BillingMetersOperations {
  /** Get all billingMeters for a location. */
  get: (
    location: string,
    options?: BillingMetersGetOptionalParams,
  ) => Promise<BillingMeterCollection>;
}

function _getBillingMeters(context: ContainerAppsAPIContext) {
  return {
    get: (location: string, options?: BillingMetersGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getBillingMetersOperations(
  context: ContainerAppsAPIContext,
): BillingMetersOperations {
  return {
    ..._getBillingMeters(context),
  };
}
