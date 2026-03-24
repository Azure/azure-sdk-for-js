// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list, get } from "../../api/userSubscription/operations.js";
import type {
  UserSubscriptionListOptionalParams,
  UserSubscriptionGetOptionalParams,
} from "../../api/userSubscription/options.js";
import type { SubscriptionContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UserSubscription operations. */
export interface UserSubscriptionOperations {
  /** Lists the collection of subscriptions of the specified user. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionContract>;
  /** Gets the specified Subscription entity associated with a particular user. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    sid: string,
    options?: UserSubscriptionGetOptionalParams,
  ) => Promise<SubscriptionContract>;
}

function _getUserSubscription(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserSubscriptionListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, userId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      sid: string,
      options?: UserSubscriptionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, userId, sid, options),
  };
}

export function _getUserSubscriptionOperations(
  context: ApiManagementContext,
): UserSubscriptionOperations {
  return {
    ..._getUserSubscription(context),
  };
}
