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
} from "../../api/domainTopicEventSubscriptions/operations.js";
import type {
  DomainTopicEventSubscriptionsGetFullUrlOptionalParams,
  DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  DomainTopicEventSubscriptionsListOptionalParams,
  DomainTopicEventSubscriptionsDeleteOptionalParams,
  DomainTopicEventSubscriptionsUpdateOptionalParams,
  DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  DomainTopicEventSubscriptionsGetOptionalParams,
} from "../../api/domainTopicEventSubscriptions/options.js";
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

/** Interface representing a DomainTopicEventSubscriptions operations. */
export interface DomainTopicEventSubscriptionsOperations {
  /** Get the full endpoint URL for a nested event subscription for domain topic. */
  getFullUrl: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** Get all delivery attributes for an event subscription for domain topic. */
  getDeliveryAttributes: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  ) => Promise<DeliveryAttributeListResult>;
  /** List all event subscriptions that have been created for a specific domain topic. */
  list: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    options?: DomainTopicEventSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<EventSubscription>;
  /** Delete a nested existing event subscription for a domain topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing event subscription for a domain topic. */
  update: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Asynchronously creates a new event subscription or updates an existing event subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Get properties of a nested event subscription for a domain topic. */
  get: (
    resourceGroupName: string,
    domainName: string,
    topicName: string,
    eventSubscriptionName: string,
    options?: DomainTopicEventSubscriptionsGetOptionalParams,
  ) => Promise<EventSubscription>;
}

function _getDomainTopicEventSubscriptions(context: EventGridManagementContext) {
  return {
    getFullUrl: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsGetFullUrlOptionalParams,
    ) =>
      getFullUrl(context, resourceGroupName, domainName, topicName, eventSubscriptionName, options),
    getDeliveryAttributes: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
    ) =>
      getDeliveryAttributes(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        options,
      ),
    list: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      options?: DomainTopicEventSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, domainName, topicName, options),
    delete: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainName, topicName, eventSubscriptionName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        domainName,
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
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        domainName,
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
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        domainName,
        topicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      domainName: string,
      topicName: string,
      eventSubscriptionName: string,
      options?: DomainTopicEventSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, domainName, topicName, eventSubscriptionName, options),
  };
}

export function _getDomainTopicEventSubscriptionsOperations(
  context: EventGridManagementContext,
): DomainTopicEventSubscriptionsOperations {
  return {
    ..._getDomainTopicEventSubscriptions(context),
  };
}
