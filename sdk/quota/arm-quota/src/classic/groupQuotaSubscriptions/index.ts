// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/groupQuotaSubscriptions/operations.js";
import type {
  GroupQuotaSubscriptionsListOptionalParams,
  GroupQuotaSubscriptionsDeleteOptionalParams,
  GroupQuotaSubscriptionsUpdateOptionalParams,
  GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
  GroupQuotaSubscriptionsGetOptionalParams,
} from "../../api/groupQuotaSubscriptions/options.js";
import type { GroupQuotaSubscriptionId } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GroupQuotaSubscriptions operations. */
export interface GroupQuotaSubscriptionsOperations {
  /** Returns a list of the subscriptionIds associated with the GroupQuotas. */
  list: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<GroupQuotaSubscriptionId>;
  /** Removes the subscription from GroupQuotas. The request's TenantId is validated against the subscription's TenantId. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId. */
  update: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<GroupQuotaSubscriptionId>, GroupQuotaSubscriptionId>;
  /** Adds a subscription to GroupQuotas. The subscriptions will be validated based on the additionalAttributes defined in the GroupQuota. The additionalAttributes works as filter for the subscriptions, which can be included in the GroupQuotas. The request's TenantId is validated against the subscription's TenantId. */
  createOrUpdate: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GroupQuotaSubscriptionId>, GroupQuotaSubscriptionId>;
  /** Returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200. */
  get: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotaSubscriptionsGetOptionalParams,
  ) => Promise<GroupQuotaSubscriptionId>;
}

function _getGroupQuotaSubscriptions(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionsListOptionalParams,
    ) => list(context, managementGroupId, groupQuotaName, options),
    delete: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionsDeleteOptionalParams,
    ) => $delete(context, managementGroupId, groupQuotaName, options),
    update: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionsUpdateOptionalParams,
    ) => update(context, managementGroupId, groupQuotaName, options),
    createOrUpdate: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, managementGroupId, groupQuotaName, options),
    get: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotaSubscriptionsGetOptionalParams,
    ) => get(context, managementGroupId, groupQuotaName, options),
  };
}

export function _getGroupQuotaSubscriptionsOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotaSubscriptionsOperations {
  return {
    ..._getGroupQuotaSubscriptions(context),
  };
}
