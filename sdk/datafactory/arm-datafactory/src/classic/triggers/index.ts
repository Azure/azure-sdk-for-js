// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  stop,
  start,
  unsubscribeFromEvents,
  getEventSubscriptionStatus,
  subscribeToEvents,
  listByFactory,
  $delete,
  createOrUpdate,
  get,
  queryByFactory,
} from "../../api/triggers/operations.js";
import {
  TriggersStopOptionalParams,
  TriggersStartOptionalParams,
  TriggersUnsubscribeFromEventsOptionalParams,
  TriggersGetEventSubscriptionStatusOptionalParams,
  TriggersSubscribeToEventsOptionalParams,
  TriggersListByFactoryOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
  TriggersQueryByFactoryOptionalParams,
} from "../../api/triggers/options.js";
import {
  TriggerFilterParameters,
  TriggerQueryResponse,
  TriggerResource,
  TriggerSubscriptionOperationStatus,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Triggers operations. */
export interface TriggersOperations {
  /** Stops a trigger. */
  stop: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStopOptionalParams,
  ) => Promise<void>;
  /** Starts a trigger. */
  start: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStartOptionalParams,
  ) => Promise<void>;
  /** Unsubscribe event trigger from events. */
  unsubscribeFromEvents: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersUnsubscribeFromEventsOptionalParams,
  ) => PollerLike<
    OperationState<TriggerSubscriptionOperationStatus>,
    TriggerSubscriptionOperationStatus
  >;
  /** @deprecated use unsubscribeFromEvents instead */
  beginUnsubscribeFromEvents: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersUnsubscribeFromEventsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<TriggerSubscriptionOperationStatus>,
      TriggerSubscriptionOperationStatus
    >
  >;
  /** @deprecated use unsubscribeFromEvents instead */
  beginUnsubscribeFromEventsAndWait: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersUnsubscribeFromEventsOptionalParams,
  ) => Promise<TriggerSubscriptionOperationStatus>;
  /** Get a trigger's event subscription status. */
  getEventSubscriptionStatus: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersGetEventSubscriptionStatusOptionalParams,
  ) => Promise<TriggerSubscriptionOperationStatus>;
  /** Subscribe event trigger to events. */
  subscribeToEvents: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersSubscribeToEventsOptionalParams,
  ) => PollerLike<
    OperationState<TriggerSubscriptionOperationStatus>,
    TriggerSubscriptionOperationStatus
  >;
  /** @deprecated use subscribeToEvents instead */
  beginSubscribeToEvents: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersSubscribeToEventsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<TriggerSubscriptionOperationStatus>,
      TriggerSubscriptionOperationStatus
    >
  >;
  /** @deprecated use subscribeToEvents instead */
  beginSubscribeToEventsAndWait: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersSubscribeToEventsOptionalParams,
  ) => Promise<TriggerSubscriptionOperationStatus>;
  /** Lists triggers. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: TriggersListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<TriggerResource>;
  /** Deletes a trigger. */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a trigger. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    trigger: TriggerResource,
    options?: TriggersCreateOrUpdateOptionalParams,
  ) => Promise<TriggerResource>;
  /** Gets a trigger. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersGetOptionalParams,
  ) => Promise<TriggerResource>;
  /** Query triggers. */
  queryByFactory: (
    resourceGroupName: string,
    factoryName: string,
    filterParameters: TriggerFilterParameters,
    options?: TriggersQueryByFactoryOptionalParams,
  ) => Promise<TriggerQueryResponse>;
}

function _getTriggers(context: DataFactoryManagementContext) {
  return {
    stop: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStopOptionalParams,
    ) => stop(context, resourceGroupName, factoryName, triggerName, options),
    beginStop: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, factoryName, triggerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, factoryName, triggerName, options);
    },
    start: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStartOptionalParams,
    ) => start(context, resourceGroupName, factoryName, triggerName, options),
    beginStart: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, factoryName, triggerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, factoryName, triggerName, options);
    },
    unsubscribeFromEvents: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersUnsubscribeFromEventsOptionalParams,
    ) => unsubscribeFromEvents(context, resourceGroupName, factoryName, triggerName, options),
    beginUnsubscribeFromEvents: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersUnsubscribeFromEventsOptionalParams,
    ) => {
      const poller = unsubscribeFromEvents(
        context,
        resourceGroupName,
        factoryName,
        triggerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnsubscribeFromEventsAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersUnsubscribeFromEventsOptionalParams,
    ) => {
      return await unsubscribeFromEvents(
        context,
        resourceGroupName,
        factoryName,
        triggerName,
        options,
      );
    },
    getEventSubscriptionStatus: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersGetEventSubscriptionStatusOptionalParams,
    ) => getEventSubscriptionStatus(context, resourceGroupName, factoryName, triggerName, options),
    subscribeToEvents: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersSubscribeToEventsOptionalParams,
    ) => subscribeToEvents(context, resourceGroupName, factoryName, triggerName, options),
    beginSubscribeToEvents: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersSubscribeToEventsOptionalParams,
    ) => {
      const poller = subscribeToEvents(
        context,
        resourceGroupName,
        factoryName,
        triggerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSubscribeToEventsAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersSubscribeToEventsOptionalParams,
    ) => {
      return await subscribeToEvents(context, resourceGroupName, factoryName, triggerName, options);
    },
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: TriggersListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, triggerName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      trigger: TriggerResource,
      options?: TriggersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, factoryName, triggerName, trigger, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, triggerName, options),
    queryByFactory: (
      resourceGroupName: string,
      factoryName: string,
      filterParameters: TriggerFilterParameters,
      options?: TriggersQueryByFactoryOptionalParams,
    ) => queryByFactory(context, resourceGroupName, factoryName, filterParameters, options),
  };
}

export function _getTriggersOperations(context: DataFactoryManagementContext): TriggersOperations {
  return {
    ..._getTriggers(context),
  };
}
