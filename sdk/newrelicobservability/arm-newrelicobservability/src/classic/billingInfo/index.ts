// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { get } from "../../api/billingInfo/operations.js";
import type { BillingInfoGetOptionalParams } from "../../api/billingInfo/options.js";
import type { BillingInfoResponse } from "../../models/models.js";

/** Interface representing a BillingInfo operations. */
export interface BillingInfoOperations {
  /** A synchronous resource action. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: BillingInfoGetOptionalParams,
  ) => Promise<BillingInfoResponse>;
}

function _getBillingInfo(context: NewRelicObservabilityContext) {
  return {
    get: (resourceGroupName: string, monitorName: string, options?: BillingInfoGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getBillingInfoOperations(
  context: NewRelicObservabilityContext,
): BillingInfoOperations {
  return {
    ..._getBillingInfo(context),
  };
}
