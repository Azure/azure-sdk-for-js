// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import {
  targetDirectoryStatus,
  acceptTargetDirectory,
  listTargetDirectory,
  deleteTargetDirectory,
  putTargetDirectory,
  getTargetDirectory,
} from "../../api/subscriptions/operations.js";
import type {
  SubscriptionsTargetDirectoryStatusOptionalParams,
  SubscriptionsAcceptTargetDirectoryOptionalParams,
  SubscriptionsListTargetDirectoryOptionalParams,
  SubscriptionsDeleteTargetDirectoryOptionalParams,
  SubscriptionsPutTargetDirectoryOptionalParams,
  SubscriptionsGetTargetDirectoryOptionalParams,
} from "../../api/subscriptions/options.js";
import type {
  TargetDirectoryResult,
  TargetDirectoryResultProperties,
  TargetDirectoryRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Subscriptions operations. */
export interface SubscriptionsOperations {
  /** The operation for Acceptor to view the accepted request */
  targetDirectoryStatus: (
    subscriptionId: string,
    options?: SubscriptionsTargetDirectoryStatusOptionalParams,
  ) => Promise<TargetDirectoryResultProperties>;
  /** The operation to accept Subscription Changed Request */
  acceptTargetDirectory: (
    subscriptionId: string,
    options?: SubscriptionsAcceptTargetDirectoryOptionalParams,
  ) => Promise<void>;
  /** The operation to list Initiator Subscription Changed Request */
  listTargetDirectory: (
    subscriptionId: string,
    options?: SubscriptionsListTargetDirectoryOptionalParams,
  ) => PagedAsyncIterableIterator<TargetDirectoryResult>;
  /** The operation to delete Initiator Subscription Changed Request */
  deleteTargetDirectory: (
    subscriptionId: string,
    options?: SubscriptionsDeleteTargetDirectoryOptionalParams,
  ) => Promise<void>;
  /** The operation to initiate Subscription Changed Request */
  putTargetDirectory: (
    subscriptionId: string,
    body: TargetDirectoryRequest,
    options?: SubscriptionsPutTargetDirectoryOptionalParams,
  ) => Promise<TargetDirectoryResult>;
  /** The operation to view Initiator Subscription Changed Request */
  getTargetDirectory: (
    subscriptionId: string,
    options?: SubscriptionsGetTargetDirectoryOptionalParams,
  ) => Promise<TargetDirectoryResult>;
}

function _getSubscriptions(context: SubscriptionContext) {
  return {
    targetDirectoryStatus: (
      subscriptionId: string,
      options?: SubscriptionsTargetDirectoryStatusOptionalParams,
    ) => targetDirectoryStatus(context, subscriptionId, options),
    acceptTargetDirectory: (
      subscriptionId: string,
      options?: SubscriptionsAcceptTargetDirectoryOptionalParams,
    ) => acceptTargetDirectory(context, subscriptionId, options),
    listTargetDirectory: (
      subscriptionId: string,
      options?: SubscriptionsListTargetDirectoryOptionalParams,
    ) => listTargetDirectory(context, subscriptionId, options),
    deleteTargetDirectory: (
      subscriptionId: string,
      options?: SubscriptionsDeleteTargetDirectoryOptionalParams,
    ) => deleteTargetDirectory(context, subscriptionId, options),
    putTargetDirectory: (
      subscriptionId: string,
      body: TargetDirectoryRequest,
      options?: SubscriptionsPutTargetDirectoryOptionalParams,
    ) => putTargetDirectory(context, subscriptionId, body, options),
    getTargetDirectory: (
      subscriptionId: string,
      options?: SubscriptionsGetTargetDirectoryOptionalParams,
    ) => getTargetDirectory(context, subscriptionId, options),
  };
}

export function _getSubscriptionsOperations(context: SubscriptionContext): SubscriptionsOperations {
  return {
    ..._getSubscriptions(context),
  };
}
