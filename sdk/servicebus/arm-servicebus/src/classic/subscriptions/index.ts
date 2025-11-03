// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import { listByTopic, $delete, createOrUpdate, get } from "../../api/subscriptions/operations.js";
import type {
  SubscriptionsListByTopicOptionalParams,
  SubscriptionsDeleteOptionalParams,
  SubscriptionsCreateOrUpdateOptionalParams,
  SubscriptionsGetOptionalParams,
} from "../../api/subscriptions/options.js";
import type { SBSubscription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Subscriptions operations. */
export interface SubscriptionsOperations {
  /** List all the subscriptions under a specified topic. */
  listByTopic: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: SubscriptionsListByTopicOptionalParams,
  ) => PagedAsyncIterableIterator<SBSubscription>;
  /** Deletes a subscription from the specified topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    options?: SubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a topic subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    parameters: SBSubscription,
    options?: SubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SBSubscription>;
  /** Returns a subscription description for the specified topic. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    subscriptionName: string,
    options?: SubscriptionsGetOptionalParams,
  ) => Promise<SBSubscription>;
}

function _getSubscriptions(context: ServiceBusManagementContext) {
  return {
    listByTopic: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: SubscriptionsListByTopicOptionalParams,
    ) => listByTopic(context, resourceGroupName, namespaceName, topicName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      options?: SubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, topicName, subscriptionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      parameters: SBSubscription,
      options?: SubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        subscriptionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      subscriptionName: string,
      options?: SubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, topicName, subscriptionName, options),
  };
}

export function _getSubscriptionsOperations(
  context: ServiceBusManagementContext,
): SubscriptionsOperations {
  return {
    ..._getSubscriptions(context),
  };
}
