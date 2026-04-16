// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext } from "../../api/computeLimitContext.js";
import {
  listBySubscriptionLocationResource,
  $delete,
  create,
  get,
} from "../../api/guestSubscriptions/operations.js";
import type {
  GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  GuestSubscriptionsDeleteOptionalParams,
  GuestSubscriptionsCreateOptionalParams,
  GuestSubscriptionsGetOptionalParams,
} from "../../api/guestSubscriptions/options.js";
import type { GuestSubscription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestSubscriptions operations. */
export interface GuestSubscriptionsOperations {
  /** Lists all guest subscriptions in a location. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<GuestSubscription>;
  /** Deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    location: string,
    guestSubscriptionId: string,
    options?: GuestSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds a subscription as a guest to consume the compute limits shared by the host subscription. */
  create: (
    location: string,
    guestSubscriptionId: string,
    resource: GuestSubscription,
    options?: GuestSubscriptionsCreateOptionalParams,
  ) => Promise<GuestSubscription>;
  /** Gets the properties of a guest subscription. */
  get: (
    location: string,
    guestSubscriptionId: string,
    options?: GuestSubscriptionsGetOptionalParams,
  ) => Promise<GuestSubscription>;
}

function _getGuestSubscriptions(context: ComputeLimitContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    delete: (
      location: string,
      guestSubscriptionId: string,
      options?: GuestSubscriptionsDeleteOptionalParams,
    ) => $delete(context, location, guestSubscriptionId, options),
    create: (
      location: string,
      guestSubscriptionId: string,
      resource: GuestSubscription,
      options?: GuestSubscriptionsCreateOptionalParams,
    ) => create(context, location, guestSubscriptionId, resource, options),
    get: (
      location: string,
      guestSubscriptionId: string,
      options?: GuestSubscriptionsGetOptionalParams,
    ) => get(context, location, guestSubscriptionId, options),
  };
}

export function _getGuestSubscriptionsOperations(
  context: ComputeLimitContext,
): GuestSubscriptionsOperations {
  return {
    ..._getGuestSubscriptions(context),
  };
}
