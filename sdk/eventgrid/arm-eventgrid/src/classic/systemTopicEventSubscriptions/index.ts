// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  getFullUrl,
  getDeliveryAttributes,
  listBySystemTopic,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/systemTopicEventSubscriptions/operations.js";
import type {
  SystemTopicEventSubscriptionsGetFullUrlOptionalParams,
  SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  SystemTopicEventSubscriptionsListBySystemTopicOptionalParams,
  SystemTopicEventSubscriptionsDeleteOptionalParams,
  SystemTopicEventSubscriptionsUpdateOptionalParams,
  SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  SystemTopicEventSubscriptionsGetOptionalParams,
} from "../../api/systemTopicEventSubscriptions/options.js";
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

/** Interface representing a SystemTopicEventSubscriptions operations. */
export interface SystemTopicEventSubscriptionsOperations {
  /** Get the full endpoint URL for an event subscription of a system topic. */
  getFullUrl: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** Get all delivery attributes for an event subscription. */
  getDeliveryAttributes: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  ) => Promise<DeliveryAttributeListResult>;
  /** List event subscriptions that belong to a specific system topic. */
  listBySystemTopic: (
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicEventSubscriptionsListBySystemTopicOptionalParams,
  ) => PagedAsyncIterableIterator<EventSubscription>;
  /** Delete an existing event subscription of a system topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing event subscription of a system topic. */
  update: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Asynchronously creates or updates an event subscription with the specified parameters. Existing event subscriptions will be updated with this API. */
  createOrUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Get an event subscription. */
  get: (
    resourceGroupName: string,
    systemTopicName: string,
    eventSubscriptionName: string,
    options?: SystemTopicEventSubscriptionsGetOptionalParams,
  ) => Promise<EventSubscription>;
}

function _getSystemTopicEventSubscriptions(context: EventGridManagementContext) {
  return {
    getFullUrl: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsGetFullUrlOptionalParams,
    ) => getFullUrl(context, resourceGroupName, systemTopicName, eventSubscriptionName, options),
    getDeliveryAttributes: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
    ) =>
      getDeliveryAttributes(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        options,
      ),
    listBySystemTopic: (
      resourceGroupName: string,
      systemTopicName: string,
      options?: SystemTopicEventSubscriptionsListBySystemTopicOptionalParams,
    ) => listBySystemTopic(context, resourceGroupName, systemTopicName, options),
    delete: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, systemTopicName, eventSubscriptionName, options),
    beginDelete: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: SystemTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: SystemTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        systemTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      systemTopicName: string,
      eventSubscriptionName: string,
      options?: SystemTopicEventSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, systemTopicName, eventSubscriptionName, options),
  };
}

export function _getSystemTopicEventSubscriptionsOperations(
  context: EventGridManagementContext,
): SystemTopicEventSubscriptionsOperations {
  return {
    ..._getSystemTopicEventSubscriptions(context),
  };
}
