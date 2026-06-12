// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPIContext } from "../../api/managementGroupsAPIContext.js";
import {
  listSubscriptionsUnderManagementGroup,
  $delete,
  create,
  getSubscription,
} from "../../api/managementGroupSubscriptions/operations.js";
import {
  ManagementGroupSubscriptionsListSubscriptionsUnderManagementGroupOptionalParams,
  ManagementGroupSubscriptionsDeleteOptionalParams,
  ManagementGroupSubscriptionsCreateOptionalParams,
  ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
} from "../../api/managementGroupSubscriptions/options.js";
import { SubscriptionUnderManagementGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagementGroupSubscriptions operations. */
export interface ManagementGroupSubscriptionsOperations {
  /** Retrieves details about all subscriptions which are associated with the management group. */
  listSubscriptionsUnderManagementGroup: (
    groupId: string,
    options?: ManagementGroupSubscriptionsListSubscriptionsUnderManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionUnderManagementGroup>;
  /** De-associates subscription from the management group. */
  delete: (
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Associates existing subscription with the management group. */
  create: (
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsCreateOptionalParams,
  ) => Promise<SubscriptionUnderManagementGroup>;
  /** Retrieves details about given subscription which is associated with the management group. */
  getSubscription: (
    groupId: string,
    subscriptionId: string,
    options?: ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
  ) => Promise<SubscriptionUnderManagementGroup>;
}

function _getManagementGroupSubscriptions(context: ManagementGroupsAPIContext) {
  return {
    listSubscriptionsUnderManagementGroup: (
      groupId: string,
      options?: ManagementGroupSubscriptionsListSubscriptionsUnderManagementGroupOptionalParams,
    ) => listSubscriptionsUnderManagementGroup(context, groupId, options),
    delete: (
      groupId: string,
      subscriptionId: string,
      options?: ManagementGroupSubscriptionsDeleteOptionalParams,
    ) => $delete(context, groupId, subscriptionId, options),
    create: (
      groupId: string,
      subscriptionId: string,
      options?: ManagementGroupSubscriptionsCreateOptionalParams,
    ) => create(context, groupId, subscriptionId, options),
    getSubscription: (
      groupId: string,
      subscriptionId: string,
      options?: ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
    ) => getSubscription(context, groupId, subscriptionId, options),
  };
}

export function _getManagementGroupSubscriptionsOperations(
  context: ManagementGroupsAPIContext,
): ManagementGroupSubscriptionsOperations {
  return {
    ..._getManagementGroupSubscriptions(context),
  };
}
