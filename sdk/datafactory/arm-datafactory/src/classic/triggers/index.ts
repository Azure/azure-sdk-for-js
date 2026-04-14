// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
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
import type {
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
import type {
  TriggerFilterParameters,
  TriggerQueryResponse,
  TriggerResource,
  TriggerSubscriptionOperationStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Triggers operations. */
export interface TriggersOperations {
  /** Stops a trigger. */
  stop: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts a trigger. */
  start: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    options?: TriggersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
  /** Lists triggers. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: TriggersListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<TriggerResource>;
  /** Deletes a trigger. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
    start: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersStartOptionalParams,
    ) => start(context, resourceGroupName, factoryName, triggerName, options),
    unsubscribeFromEvents: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      options?: TriggersUnsubscribeFromEventsOptionalParams,
    ) => unsubscribeFromEvents(context, resourceGroupName, factoryName, triggerName, options),
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
