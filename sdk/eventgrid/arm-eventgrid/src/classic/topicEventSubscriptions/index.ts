// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  getFullUrl,
  getDeliveryAttributes,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/topicEventSubscriptions/operations.js";
import type {
  TopicEventSubscriptionsGetFullUrlOptionalParams,
  TopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  TopicEventSubscriptionsListOptionalParams,
  TopicEventSubscriptionsDeleteOptionalParams,
  TopicEventSubscriptionsUpdateOptionalParams,
  TopicEventSubscriptionsCreateOrUpdateOptionalParams,
  TopicEventSubscriptionsGetOptionalParams,
} from "../../api/topicEventSubscriptions/options.js";
import type {
  EventSubscriptionFullUrl,
  EventSubscription,
  EventSubscriptionUpdateParameters,
  DeliveryAttributeListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TopicEventSubscriptions operations. */
export interface TopicEventSubscriptionsOperations {
  /** Get the full endpoint URL for an event subscription for topic. */
  getFullUrl: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** Get all delivery attributes for an event subscription for topic. */
  getDeliveryAttributes: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  ) => Promise<DeliveryAttributeListResult>;
  /** List all event subscriptions that have been created for a specific topic. */
  list: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicEventSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<EventSubscription>;
  /** Delete an existing event subscription for a topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing event subscription for a topic. */
  update: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: TopicEventSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: TopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: TopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Asynchronously creates a new event subscription or updates an existing event subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Get properties of an event subscription of a topic. */
  get: (
    resourceGroupName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: TopicEventSubscriptionsGetOptionalParams,
  ) => Promise<EventSubscription>;
}

function _getTopicEventSubscriptions(context: EventGridManagementContext) {
  return {
    getFullUrl: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsGetFullUrlOptionalParams,
    ) => getFullUrl(context, resourceGroupName, topicName, eventSubscriptionName, options),
    getDeliveryAttributes: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
    ) =>
      getDeliveryAttributes(context, resourceGroupName, topicName, eventSubscriptionName, options),
    list: (
      resourceGroupName: string,
      topicName: string,
      options?: TopicEventSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, topicName, options),
    delete: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, topicName, eventSubscriptionName, options),
    beginDelete: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, topicName, eventSubscriptionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, topicName, eventSubscriptionName, options);
    },
    update: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: TopicEventSubscriptionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: TopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: TopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: TopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: TopicEventSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, topicName, eventSubscriptionName, options),
  };
}

export function _getTopicEventSubscriptionsOperations(
  context: EventGridManagementContext,
): TopicEventSubscriptionsOperations {
  return {
    ..._getTopicEventSubscriptions(context),
  };
}
