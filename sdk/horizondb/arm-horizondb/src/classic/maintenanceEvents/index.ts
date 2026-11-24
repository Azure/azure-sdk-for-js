// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { applyNow, reschedule, list, get } from "../../api/maintenanceEvents/operations.js";
import type {
  MaintenanceEventsApplyNowOptionalParams,
  MaintenanceEventsRescheduleOptionalParams,
  MaintenanceEventsListOptionalParams,
  MaintenanceEventsGetOptionalParams,
} from "../../api/maintenanceEvents/options.js";
import type {
  MaintenanceEvent,
  MaintenanceEventRescheduleRequest,
  MaintenanceEventActionResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MaintenanceEvents operations. */
export interface MaintenanceEventsOperations {
  /** Applies the maintenance event immediately. */
  applyNow: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
  /** @deprecated use applyNow instead */
  beginApplyNow: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>
  >;
  /** @deprecated use applyNow instead */
  beginApplyNowAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => Promise<MaintenanceEventActionResponse>;
  /** Reschedules a maintenance event to a new date and time. */
  reschedule: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
  /** @deprecated use reschedule instead */
  beginReschedule: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>
  >;
  /** @deprecated use reschedule instead */
  beginRescheduleAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => Promise<MaintenanceEventActionResponse>;
  /** Lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: MaintenanceEventsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceEvent>;
  /** Gets information about a maintenance event for a HorizonDB pool. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsGetOptionalParams,
  ) => Promise<MaintenanceEvent>;
}

function _getMaintenanceEvents(context: HorizonDbContext) {
  return {
    applyNow: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => applyNow(context, resourceGroupName, clusterName, poolName, maintenanceEventId, options),
    beginApplyNow: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => {
      const poller = applyNow(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyNowAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => {
      return await applyNow(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        options,
      );
    },
    reschedule: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) =>
      reschedule(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        body,
        options,
      ),
    beginReschedule: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) => {
      const poller = reschedule(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRescheduleAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) => {
      return await reschedule(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        maintenanceEventId,
        body,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: MaintenanceEventsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, poolName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, maintenanceEventId, options),
  };
}

export function _getMaintenanceEventsOperations(
  context: HorizonDbContext,
): MaintenanceEventsOperations {
  return {
    ..._getMaintenanceEvents(context),
  };
}
