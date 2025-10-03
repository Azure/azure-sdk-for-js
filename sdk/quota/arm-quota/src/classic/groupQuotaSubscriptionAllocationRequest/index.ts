// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, get, update } from "../../api/groupQuotaSubscriptionAllocationRequest/operations.js";
import type {
  GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
} from "../../api/groupQuotaSubscriptionAllocationRequest/options.js";
import type {
  SubscriptionQuotaAllocationsList,
  QuotaAllocationRequestStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GroupQuotaSubscriptionAllocationRequest operations. */
export interface GroupQuotaSubscriptionAllocationRequestOperations {
  /** Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required. */
  list: (
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaAllocationRequestStatus>;
  /** Get the quota allocation request status for the subscriptionId by allocationId. */
  get: (
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    allocationId: string,
    options?: GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  ) => Promise<QuotaAllocationRequestStatus>;
  /** Request to assign quota from group quota to a specific Subscription. The assign GroupQuota to subscriptions or reduce the quota allocated to subscription to give back the unused quota ( quota >= usages) to the groupQuota. So, this API can be used to assign Quota to subscriptions and assign back unused quota to group quota, which can be assigned to another subscriptions in the GroupQuota. User can collect unused quotas from multiple subscriptions within the groupQuota and assign the groupQuota to the subscription, where it's needed. */
  update: (
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    allocateQuotaRequest: SubscriptionQuotaAllocationsList,
    options?: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SubscriptionQuotaAllocationsList>,
    SubscriptionQuotaAllocationsList
  >;
}

function _getGroupQuotaSubscriptionAllocationRequest(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (
      managementGroupId: string,
      groupQuotaName: string,
      resourceProviderName: string,
      filter: string,
      options?: GroupQuotaSubscriptionAllocationRequestListOptionalParams,
    ) => list(context, managementGroupId, groupQuotaName, resourceProviderName, filter, options),
    get: (
      managementGroupId: string,
      groupQuotaName: string,
      resourceProviderName: string,
      allocationId: string,
      options?: GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
    ) =>
      get(context, managementGroupId, groupQuotaName, resourceProviderName, allocationId, options),
    update: (
      managementGroupId: string,
      groupQuotaName: string,
      resourceProviderName: string,
      location: string,
      allocateQuotaRequest: SubscriptionQuotaAllocationsList,
      options?: GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
    ) =>
      update(
        context,
        managementGroupId,
        groupQuotaName,
        resourceProviderName,
        location,
        allocateQuotaRequest,
        options,
      ),
  };
}

export function _getGroupQuotaSubscriptionAllocationRequestOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotaSubscriptionAllocationRequestOperations {
  return {
    ..._getGroupQuotaSubscriptionAllocationRequest(context),
  };
}
