// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext } from "../../api/iotHubContext.js";
import { getSubscriptionQuota } from "../../api/resourceProviderCommon/operations.js";
import type { ResourceProviderCommonGetSubscriptionQuotaOptionalParams } from "../../api/resourceProviderCommon/options.js";
import type { UserSubscriptionQuotaListResult } from "../../models/models.js";

/** Interface representing a ResourceProviderCommon operations. */
export interface ResourceProviderCommonOperations {
  /** Get the number of free and paid iot hubs in the subscription */
  getSubscriptionQuota: (
    options?: ResourceProviderCommonGetSubscriptionQuotaOptionalParams,
  ) => Promise<UserSubscriptionQuotaListResult>;
}

function _getResourceProviderCommon(context: IotHubContext) {
  return {
    getSubscriptionQuota: (options?: ResourceProviderCommonGetSubscriptionQuotaOptionalParams) =>
      getSubscriptionQuota(context, options),
  };
}

export function _getResourceProviderCommonOperations(
  context: IotHubContext,
): ResourceProviderCommonOperations {
  return {
    ..._getResourceProviderCommon(context),
  };
}
