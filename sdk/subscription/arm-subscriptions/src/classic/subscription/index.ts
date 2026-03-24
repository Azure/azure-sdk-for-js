// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import {
  acceptOwnershipStatus,
  acceptOwnership,
  enable,
  rename,
  cancel,
} from "../../api/subscription/operations.js";
import type {
  SubscriptionAcceptOwnershipStatusOptionalParams,
  SubscriptionAcceptOwnershipOptionalParams,
  SubscriptionEnableOptionalParams,
  SubscriptionRenameOptionalParams,
  SubscriptionCancelOptionalParams,
} from "../../api/subscription/options.js";
import type {
  CanceledSubscriptionId,
  SubscriptionName,
  RenamedSubscriptionId,
  EnabledSubscriptionId,
  AcceptOwnershipRequest,
  AcceptOwnershipStatusResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Subscription operations. */
export interface SubscriptionOperations {
  /** Accept subscription ownership status. */
  acceptOwnershipStatus: (
    subscriptionId: string,
    options?: SubscriptionAcceptOwnershipStatusOptionalParams,
  ) => Promise<AcceptOwnershipStatusResponse>;
  /** Accept subscription ownership. */
  acceptOwnership: (
    subscriptionId: string,
    body: AcceptOwnershipRequest,
    options?: SubscriptionAcceptOwnershipOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use acceptOwnership instead */
  beginAcceptOwnership: (
    subscriptionId: string,
    body: AcceptOwnershipRequest,
    options?: SubscriptionAcceptOwnershipOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use acceptOwnership instead */
  beginAcceptOwnershipAndWait: (
    subscriptionId: string,
    body: AcceptOwnershipRequest,
    options?: SubscriptionAcceptOwnershipOptionalParams,
  ) => Promise<void>;
  /** The operation to enable a subscription */
  enable: (
    subscriptionId: string,
    options?: SubscriptionEnableOptionalParams,
  ) => Promise<EnabledSubscriptionId>;
  /** The operation to rename a subscription */
  rename: (
    subscriptionId: string,
    body: SubscriptionName,
    options?: SubscriptionRenameOptionalParams,
  ) => Promise<RenamedSubscriptionId>;
  /** The operation to cancel a subscription */
  cancel: (
    subscriptionId: string,
    options?: SubscriptionCancelOptionalParams,
  ) => Promise<CanceledSubscriptionId>;
}

function _getSubscription(context: SubscriptionContext) {
  return {
    acceptOwnershipStatus: (
      subscriptionId: string,
      options?: SubscriptionAcceptOwnershipStatusOptionalParams,
    ) => acceptOwnershipStatus(context, subscriptionId, options),
    acceptOwnership: (
      subscriptionId: string,
      body: AcceptOwnershipRequest,
      options?: SubscriptionAcceptOwnershipOptionalParams,
    ) => acceptOwnership(context, subscriptionId, body, options),
    beginAcceptOwnership: async (
      subscriptionId: string,
      body: AcceptOwnershipRequest,
      options?: SubscriptionAcceptOwnershipOptionalParams,
    ) => {
      const poller = acceptOwnership(context, subscriptionId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAcceptOwnershipAndWait: async (
      subscriptionId: string,
      body: AcceptOwnershipRequest,
      options?: SubscriptionAcceptOwnershipOptionalParams,
    ) => {
      return await acceptOwnership(context, subscriptionId, body, options);
    },
    enable: (subscriptionId: string, options?: SubscriptionEnableOptionalParams) =>
      enable(context, subscriptionId, options),
    rename: (
      subscriptionId: string,
      body: SubscriptionName,
      options?: SubscriptionRenameOptionalParams,
    ) => rename(context, subscriptionId, body, options),
    cancel: (subscriptionId: string, options?: SubscriptionCancelOptionalParams) =>
      cancel(context, subscriptionId, options),
  };
}

export function _getSubscriptionOperations(context: SubscriptionContext): SubscriptionOperations {
  return {
    ..._getSubscription(context),
  };
}
