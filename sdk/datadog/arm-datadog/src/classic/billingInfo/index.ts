// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { get } from "../../api/billingInfo/operations.js";
import type { BillingInfoGetOptionalParams } from "../../api/billingInfo/options.js";
import type { BillingInfoResponse } from "../../models/models.js";

/** Interface representing a BillingInfo operations. */
export interface BillingInfoOperations {
  /** Get marketplace and organization info mapped to the given monitor. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: BillingInfoGetOptionalParams,
  ) => Promise<BillingInfoResponse>;
}

function _getBillingInfo(context: MicrosoftDatadogContext) {
  return {
    get: (resourceGroupName: string, monitorName: string, options?: BillingInfoGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getBillingInfoOperations(context: MicrosoftDatadogContext): BillingInfoOperations {
  return {
    ..._getBillingInfo(context),
  };
}
