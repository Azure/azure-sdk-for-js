// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import { checkZonePeers, list, get, listLocations } from "../../api/subscriptions/operations.js";
import type {
  SubscriptionsCheckZonePeersOptionalParams,
  SubscriptionsListOptionalParams,
  SubscriptionsGetOptionalParams,
  SubscriptionsListLocationsOptionalParams,
} from "../../api/subscriptions/options.js";
import type {
  Location,
  Subscription,
  CheckZonePeersRequest,
  CheckZonePeersResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Subscriptions operations. */
export interface SubscriptionsOperations {
  /** Compares a subscriptions logical zone mapping */
  checkZonePeers: (
    subscriptionId: string,
    parameters: CheckZonePeersRequest,
    options?: SubscriptionsCheckZonePeersOptionalParams,
  ) => Promise<CheckZonePeersResult>;
  /** Gets all subscriptions for a tenant. */
  list: (options?: SubscriptionsListOptionalParams) => PagedAsyncIterableIterator<Subscription>;
  /** Gets details about a specified subscription. */
  get: (subscriptionId: string, options?: SubscriptionsGetOptionalParams) => Promise<Subscription>;
  /** This operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list. */
  listLocations: (
    subscriptionId: string,
    options?: SubscriptionsListLocationsOptionalParams,
  ) => PagedAsyncIterableIterator<Location>;
}

function _getSubscriptions(context: SubscriptionContext) {
  return {
    checkZonePeers: (
      subscriptionId: string,
      parameters: CheckZonePeersRequest,
      options?: SubscriptionsCheckZonePeersOptionalParams,
    ) => checkZonePeers(context, subscriptionId, parameters, options),
    list: (options?: SubscriptionsListOptionalParams) => list(context, options),
    get: (subscriptionId: string, options?: SubscriptionsGetOptionalParams) =>
      get(context, subscriptionId, options),
    listLocations: (subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams) =>
      listLocations(context, subscriptionId, options),
  };
}

export function _getSubscriptionsOperations(context: SubscriptionContext): SubscriptionsOperations {
  return {
    ..._getSubscriptions(context),
  };
}
