// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { get } from "../../api/billingInfo/operations.js";
import type { BillingInfoGetOptionalParams } from "../../api/billingInfo/options.js";
import type { BillingInfoResponse } from "../../models/models.js";

/** Interface representing a BillingInfo operations. */
export interface BillingInfoOperations {
  /** Retrieve marketplace and organization billing information mapped to the given Elastic monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: BillingInfoGetOptionalParams,
  ) => Promise<BillingInfoResponse>;
}

function _getBillingInfo(context: MicrosoftElasticContext) {
  return {
    get: (resourceGroupName: string, monitorName: string, options?: BillingInfoGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getBillingInfoOperations(context: MicrosoftElasticContext): BillingInfoOperations {
  return {
    ..._getBillingInfo(context),
  };
}
