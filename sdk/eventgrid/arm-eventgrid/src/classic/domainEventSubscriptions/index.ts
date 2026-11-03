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
} from "../../api/domainEventSubscriptions/operations.js";
import type {
  DomainEventSubscriptionsGetFullUrlOptionalParams,
  DomainEventSubscriptionsGetDeliveryAttributesOptionalParams,
  DomainEventSubscriptionsListOptionalParams,
  DomainEventSubscriptionsDeleteOptionalParams,
  DomainEventSubscriptionsUpdateOptionalParams,
  DomainEventSubscriptionsCreateOrUpdateOptionalParams,
  DomainEventSubscriptionsGetOptionalParams,
} from "../../api/domainEventSubscriptions/options.js";
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

/** Interface representing a DomainEventSubscriptions operations. */
export interface DomainEventSubscriptionsOperations {
  /** Get the full endpoint URL for an event subscription for domain. */
  getFullUrl: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** Get all delivery attributes for an event subscription for domain. */
  getDeliveryAttributes: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsGetDeliveryAttributesOptionalParams,
  ) => Promise<DeliveryAttributeListResult>;
  /** List all event subscriptions that have been created for a specific topic. */
  list: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainEventSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<EventSubscription>;
  /** Delete an existing event subscription for a domain. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing event subscription for a topic. */
  update: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainEventSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainEventSubscriptionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
    options?: DomainEventSubscriptionsUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Asynchronously creates a new event subscription or updates an existing event subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EventSubscription>, EventSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EventSubscription>, EventSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    eventSubscriptionInfo: EventSubscription,
    options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<EventSubscription>;
  /** Get properties of an event subscription of a domain. */
  get: (
    resourceGroupName: string,
    domainName: string,
    eventSubscriptionName: string,
    options?: DomainEventSubscriptionsGetOptionalParams,
  ) => Promise<EventSubscription>;
}

function _getDomainEventSubscriptions(context: EventGridManagementContext) {
  return {
    getFullUrl: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsGetFullUrlOptionalParams,
    ) => getFullUrl(context, resourceGroupName, domainName, eventSubscriptionName, options),
    getDeliveryAttributes: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsGetDeliveryAttributesOptionalParams,
    ) =>
      getDeliveryAttributes(context, resourceGroupName, domainName, eventSubscriptionName, options),
    list: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainEventSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, domainName, options),
    delete: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainName, eventSubscriptionName, options),
    beginDelete: async (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        domainName,
        eventSubscriptionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, domainName, eventSubscriptionName, options);
    },
    update: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainEventSubscriptionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        domainName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainEventSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        domainName,
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
      eventSubscriptionName: string,
      eventSubscriptionUpdateParameters: EventSubscriptionUpdateParameters,
      options?: DomainEventSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        domainName,
        eventSubscriptionName,
        eventSubscriptionUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        domainName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        domainName,
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
      eventSubscriptionName: string,
      eventSubscriptionInfo: EventSubscription,
      options?: DomainEventSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        domainName,
        eventSubscriptionName,
        eventSubscriptionInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      domainName: string,
      eventSubscriptionName: string,
      options?: DomainEventSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, domainName, eventSubscriptionName, options),
  };
}

export function _getDomainEventSubscriptionsOperations(
  context: EventGridManagementContext,
): DomainEventSubscriptionsOperations {
  return {
    ..._getDomainEventSubscriptions(context),
  };
}
