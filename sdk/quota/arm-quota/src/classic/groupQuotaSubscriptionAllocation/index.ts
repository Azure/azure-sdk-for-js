// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list } from "../../api/groupQuotaSubscriptionAllocation/operations.js";
import type { GroupQuotaSubscriptionAllocationListOptionalParams } from "../../api/groupQuotaSubscriptionAllocation/options.js";
import type { SubscriptionQuotaAllocationsList } from "../../models/models.js";

/** Interface representing a GroupQuotaSubscriptionAllocation operations. */
export interface GroupQuotaSubscriptionAllocationOperations {
  /** Gets all the quota allocated to a subscription for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}. This will include the GroupQuota and total quota allocated to the subscription. Only the Group quota allocated to the subscription can be allocated back to the MG Group Quota. */
  list: (
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    options?: GroupQuotaSubscriptionAllocationListOptionalParams,
  ) => Promise<SubscriptionQuotaAllocationsList>;
}

function _getGroupQuotaSubscriptionAllocation(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (
      managementGroupId: string,
      groupQuotaName: string,
      resourceProviderName: string,
      location: string,
      options?: GroupQuotaSubscriptionAllocationListOptionalParams,
    ) => list(context, managementGroupId, groupQuotaName, resourceProviderName, location, options),
  };
}

export function _getGroupQuotaSubscriptionAllocationOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotaSubscriptionAllocationOperations {
  return {
    ..._getGroupQuotaSubscriptionAllocation(context),
  };
}
