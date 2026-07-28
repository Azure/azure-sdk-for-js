// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext } from "../../api/computeLimitContext.js";
import {
  listBySubscriptionLocationResource,
  $delete,
  get,
  create,
} from "../../api/trustedHostSubscriptions/operations.js";
import type {
  TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  TrustedHostSubscriptionsDeleteOptionalParams,
  TrustedHostSubscriptionsGetOptionalParams,
  TrustedHostSubscriptionsCreateOptionalParams,
} from "../../api/trustedHostSubscriptions/options.js";
import type { TrustedHostSubscription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TrustedHostSubscriptions operations. */
export interface TrustedHostSubscriptionsOperations {
  /** Lists all host subscriptions that the guest subscription trusts in a location. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<TrustedHostSubscription>;
  /** Removes a host subscription from the guest subscription's list of trusted hosts. */
  delete: (
    location: string,
    hostSubscriptionId: string,
    options?: TrustedHostSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a host subscription that the guest subscription trusts. */
  get: (
    location: string,
    hostSubscriptionId: string,
    options?: TrustedHostSubscriptionsGetOptionalParams,
  ) => Promise<TrustedHostSubscription>;
  /**
   * Adds a host subscription to the guest subscription's list of trusted hosts. A guest
   * subscription can trust multiple host subscriptions; this only establishes trust and
   * does not check the guest in to the host. Guest-to-host association is determined at
   * check-in time, where a subscription can be a guest of at most one host per region.
   */
  create: (
    location: string,
    hostSubscriptionId: string,
    resource: TrustedHostSubscription,
    options?: TrustedHostSubscriptionsCreateOptionalParams,
  ) => Promise<TrustedHostSubscription>;
}
function _getTrustedHostSubscriptions(context: ComputeLimitContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    delete: (
      location: string,
      hostSubscriptionId: string,
      options?: TrustedHostSubscriptionsDeleteOptionalParams,
    ) => $delete(context, location, hostSubscriptionId, options),
    get: (
      location: string,
      hostSubscriptionId: string,
      options?: TrustedHostSubscriptionsGetOptionalParams,
    ) => get(context, location, hostSubscriptionId, options),
    create: (
      location: string,
      hostSubscriptionId: string,
      resource: TrustedHostSubscription,
      options?: TrustedHostSubscriptionsCreateOptionalParams,
    ) => create(context, location, hostSubscriptionId, resource, options),
  };
}
export function _getTrustedHostSubscriptionsOperations(
  context: ComputeLimitContext,
): TrustedHostSubscriptionsOperations {
  return {
    ..._getTrustedHostSubscriptions(context),
  };
}
