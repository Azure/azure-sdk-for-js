// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  getDeliveryAttributes,
  getFullUrl,
  listByPartnerTopic,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerTopicEventSubscriptions/operations.js";
import type {
  PartnerTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  PartnerTopicEventSubscriptionsGetFullUrlOptionalParams,
  PartnerTopicEventSubscriptionsListByPartnerTopicOptionalParams,
  PartnerTopicEventSubscriptionsDeleteOptionalParams,
  PartnerTopicEventSubscriptionsUpdateOptionalParams,
  PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  PartnerTopicEventSubscriptionsGetOptionalParams,
} from "../../api/partnerTopicEventSubscriptions/options.js";
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

/** Interface representing a PartnerTopicEventSubscriptions operations. */
export interface PartnerTopicEventSubscriptionsOperations {
  /** Get all delivery attributes for an event subscription of a partner topic. */
  getDeliveryAttributes: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
  ) => Promise<DeliveryAttributeListResult>;
  /** Get the full endpoint URL for an event subscription of a partner topic. */
  getFullUrl: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** List event subscriptions that belong to a specific partner topic. */
  listByPartnerTopic: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicEventSubscriptionsListByPartnerTopicOptionalParams,
  ) => PagedAsyncIterableIterator<EventSubscription>;
  /** Delete an existing event subscription of a partner topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing event subscription of a partner topic. */
  update: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Get properties of an event subscription of a partner topic. */
  get: (
    resourceGroupName: string,
    partnerTopicName: string,
    eventSubscriptionName: string,
    options?: PartnerTopicEventSubscriptionsGetOptionalParams,
  ) => Promise<EventSubscription>;
}

function _getPartnerTopicEventSubscriptions(context: EventGridManagementContext) {
  return {
    getDeliveryAttributes: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsGetDeliveryAttributesOptionalParams,
    ) =>
      getDeliveryAttributes(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        options,
      ),
    getFullUrl: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsGetFullUrlOptionalParams,
    ) => getFullUrl(context, resourceGroupName, partnerTopicName, eventSubscriptionName, options),
    listByPartnerTopic: (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicEventSubscriptionsListByPartnerTopicOptionalParams,
    ) => listByPartnerTopic(context, resourceGroupName, partnerTopicName, options),
    delete: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerTopicName, eventSubscriptionName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: PartnerTopicEventSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: PartnerTopicEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        partnerTopicName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      partnerTopicName: string,
      eventSubscriptionName: string,
      options?: PartnerTopicEventSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, partnerTopicName, eventSubscriptionName, options),
  };
}

export function _getPartnerTopicEventSubscriptionsOperations(
  context: EventGridManagementContext,
): PartnerTopicEventSubscriptionsOperations {
  return {
    ..._getPartnerTopicEventSubscriptions(context),
  };
}
